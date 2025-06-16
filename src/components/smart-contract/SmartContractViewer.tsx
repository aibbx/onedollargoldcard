
import React, { useState } from 'react';
import { Copy, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTRACT_ADDRESSES } from '../../utils/walletUtils';

const SmartContractViewer: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const contractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title USD1GoldCard Lottery Contract
 * @dev Smart contract for managing USD1 token donations and lottery system
 * @notice This contract handles donations, winner selection, and prize distribution
 */
contract USD1GoldCardLottery is VRFConsumerBaseV2, Ownable, ReentrancyGuard {
    VRFCoordinatorV2Interface COORDINATOR;
    
    // BSC VRF Coordinator
    address vrfCoordinator = 0xc587d9053cd1118f25F645F9E08BB98c9712A4EE;
    
    // VRF subscription ID
    uint64 s_subscriptionId;
    
    // BSC gas lane key hash
    bytes32 keyHash = 0x114f3da0a805b6a67d6e9cd2ec746f7028f1b7376365af575cfea3550dd1aa04;
    
    uint32 callbackGasLimit = 100000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 1;
    
    // USD1 Token Contract Address
    IERC20 public immutable usd1Token;
    
    // Contract state variables
    uint256 public constant TARGET_AMOUNT = 10_000_000 * 10**18; // 10M USD1
    uint256 public constant WINNER_PRIZE = 5_000_000 * 10**18;   // 5M USD1
    uint256 public constant MIN_DONATION = 105 * 10**16;         // 1.05 USD1
    uint256 public constant SERVICE_FEE_RATE = 500;             // 5% in basis points
    
    uint256 public poolAmount;
    uint256 public totalFees;
    uint256 public currentRound = 1;
    uint256 public lastDonationTime;
    uint256 public constant INACTIVITY_PERIOD = 7 days;
    
    address public lastDonor;
    address public feeRecipient;
    
    mapping(address => uint256) public donations;
    mapping(address => uint256) public lotteryNumbers;
    mapping(uint256 => address) public numberToAddress;
    
    address[] public participants;
    uint256 public totalLotteryNumbers;
    
    // Events
    event DonationReceived(address indexed donor, uint256 amount, uint256 lotteryNumbers);
    event WinnerSelected(address indexed winner, uint256 prize, uint256 round);
    event BackupWinnerSelected(address indexed winner, uint256 prize, string reason);
    event NewRoundStarted(uint256 round, uint256 carryoverAmount);
    
    constructor(
        uint64 subscriptionId,
        address _usd1Token,
        address _feeRecipient
    ) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        usd1Token = IERC20(_usd1Token);
        feeRecipient = _feeRecipient;
        lastDonationTime = block.timestamp;
    }
    
    /**
     * @dev Process donation and assign lottery numbers
     * @param amount The amount of USD1 tokens to donate
     */
    function donate(uint256 amount) external nonReentrant {
        require(amount >= MIN_DONATION, "Donation below minimum");
        require(poolAmount < TARGET_AMOUNT, "Target already reached");
        
        // Calculate service fee (5%)
        uint256 serviceFee = (amount * SERVICE_FEE_RATE) / 10000;
        uint256 poolContribution = amount - serviceFee;
        
        // Transfer tokens
        require(usd1Token.transferFrom(msg.sender, address(this), poolContribution), "Pool transfer failed");
        require(usd1Token.transferFrom(msg.sender, feeRecipient, serviceFee), "Fee transfer failed");
        
        // Update state
        poolAmount += poolContribution;
        totalFees += serviceFee;
        lastDonationTime = block.timestamp;
        lastDonor = msg.sender;
        
        // Assign lottery numbers (1 number per 1 USD1 in pool contribution)
        uint256 numbersToAssign = poolContribution / 10**18;
        
        if (donations[msg.sender] == 0) {
            participants.push(msg.sender);
        }
        
        donations[msg.sender] += poolContribution;
        lotteryNumbers[msg.sender] += numbersToAssign;
        
        // Assign individual lottery numbers
        for (uint256 i = 0; i < numbersToAssign; i++) {
            totalLotteryNumbers++;
            numberToAddress[totalLotteryNumbers] = msg.sender;
        }
        
        emit DonationReceived(msg.sender, amount, numbersToAssign);
        
        // Check if target reached
        if (poolAmount >= TARGET_AMOUNT) {
            _requestRandomWinner();
        }
    }
    
    /**
     * @dev Request random number from Chainlink VRF
     */
    function _requestRandomWinner() internal {
        COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }
    
    /**
     * @dev Callback function used by VRF Coordinator
     */
    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        _selectWinner(randomWords[0]);
    }
    
    /**
     * @dev Select winner based on random number
     */
    function _selectWinner(uint256 randomNumber) internal {
        require(totalLotteryNumbers > 0, "No lottery numbers assigned");
        
        uint256 winningNumber = (randomNumber % totalLotteryNumbers) + 1;
        address winner = numberToAddress[winningNumber];
        
        require(winner != address(0), "Invalid winner");
        
        // Transfer prize to winner
        require(usd1Token.transfer(winner, WINNER_PRIZE), "Prize transfer failed");
        
        emit WinnerSelected(winner, WINNER_PRIZE, currentRound);
        
        // Start new round with remaining funds
        uint256 remainingAmount = poolAmount - WINNER_PRIZE;
        _startNewRound(remainingAmount);
    }
    
    /**
     * @dev Handle inactivity backup mechanism
     */
    function triggerInactivityBackup() external {
        require(block.timestamp >= lastDonationTime + INACTIVITY_PERIOD, "Inactivity period not reached");
        require(lastDonor != address(0), "No last donor");
        require(poolAmount > 0, "No funds to distribute");
        
        // Transfer entire pool to last donor
        uint256 prize = poolAmount;
        require(usd1Token.transfer(lastDonor, prize), "Backup prize transfer failed");
        
        emit BackupWinnerSelected(lastDonor, prize, "7-day inactivity");
        
        // Reset for new round
        _startNewRound(0);
    }
    
    /**
     * @dev Start a new lottery round
     */
    function _startNewRound(uint256 carryoverAmount) internal {
        // Reset lottery state
        for (uint256 i = 0; i < participants.length; i++) {
            address participant = participants[i];
            donations[participant] = 0;
            lotteryNumbers[participant] = 0;
        }
        
        // Clear mappings
        for (uint256 i = 1; i <= totalLotteryNumbers; i++) {
            delete numberToAddress[i];
        }
        
        delete participants;
        totalLotteryNumbers = 0;
        poolAmount = carryoverAmount;
        currentRound++;
        lastDonationTime = block.timestamp;
        
        emit NewRoundStarted(currentRound, carryoverAmount);
    }
    
    /**
     * @dev Emergency withdrawal function (owner only)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = usd1Token.balanceOf(address(this));
        require(usd1Token.transfer(owner(), balance), "Emergency withdrawal failed");
    }
    
    /**
     * @dev Update fee recipient address
     */
    function updateFeeRecipient(address _feeRecipient) external onlyOwner {
        feeRecipient = _feeRecipient;
    }
    
    /**
     * @dev Get participant count
     */
    function getParticipantCount() external view returns (uint256) {
        return participants.length;
    }
    
    /**
     * @dev Get user's lottery numbers
     */
    function getUserLotteryNumbers(address user) external view returns (uint256) {
        return lotteryNumbers[user];
    }
    
    /**
     * @dev Get user's total donations
     */
    function getUserDonations(address user) external view returns (uint256) {
        return donations[user];
    }
    
    /**
     * @dev Calculate winning chance for a user
     */
    function getWinningChance(address user) external view returns (uint256) {
        if (totalLotteryNumbers == 0) return 0;
        return (lotteryNumbers[user] * 10000) / totalLotteryNumbers; // Returns basis points
    }
    
    /**
     * @dev Check if inactivity period has passed
     */
    function canTriggerInactivityBackup() external view returns (bool) {
        return block.timestamp >= lastDonationTime + INACTIVITY_PERIOD;
    }
    
    /**
     * @dev Get contract status
     */
    function getContractStatus() external view returns (
        uint256 _poolAmount,
        uint256 _totalParticipants,
        uint256 _totalLotteryNumbers,
        uint256 _currentRound,
        address _lastDonor,
        uint256 _lastDonationTime,
        bool _canTriggerBackup
    ) {
        return (
            poolAmount,
            participants.length,
            totalLotteryNumbers,
            currentRound,
            lastDonor,
            lastDonationTime,
            block.timestamp >= lastDonationTime + INACTIVITY_PERIOD
        );
    }
}`;

  return (
    <div className="space-y-8">
      {/* Contract Information */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gold-200">
        <h2 className="text-2xl font-bold text-gold-600 mb-4">Contract Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Contract Address</h3>
            <div className="flex items-center gap-2">
              <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono flex-1 break-all">
                {CONTRACT_ADDRESSES.poolAddress}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(CONTRACT_ADDRESSES.poolAddress, 'address')}
              >
                {copiedSection === 'address' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Blockchain Explorer</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`https://bscscan.com/address/${CONTRACT_ADDRESSES.poolAddress}`, '_blank')}
              className="w-full justify-center"
            >
              View on BSCScan
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contract Features */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gold-200">
        <h2 className="text-2xl font-bold text-gold-600 mb-4">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Minimum Donation</h3>
            <p className="text-blue-600">1.05 USD1 (1.00 to pool + 0.05 service fee)</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Target Amount</h3>
            <p className="text-green-600">10,000,000 USD1</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Winner Prize</h3>
            <p className="text-purple-600">5,000,000 USD1</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-orange-800 mb-2">Random Selection</h3>
            <p className="text-orange-600">Chainlink VRF v2</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">Inactivity Backup</h3>
            <p className="text-red-600">7 days without donations</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h3 className="font-semibold text-indigo-800 mb-2">Service Fee</h3>
            <p className="text-indigo-600">5% of donation amount</p>
          </div>
        </div>
      </div>

      {/* Contract Source Code */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gold-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gold-600">Complete Source Code</h2>
          <Button
            variant="outline"
            onClick={() => handleCopy(contractCode, 'contract')}
            className="flex items-center gap-2"
          >
            {copiedSection === 'contract' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedSection === 'contract' ? 'Copied!' : 'Copy Code'}
          </Button>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100 whitespace-pre text-left">
            <code>{contractCode}</code>
          </pre>
        </div>
      </div>

      {/* Contract Verification */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gold-200">
        <h2 className="text-2xl font-bold text-gold-600 mb-4">Contract Verification</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600">
            This smart contract has been deployed and verified on the Binance Smart Chain (BSC). 
            You can verify the contract source code matches the deployed bytecode by checking the contract on BSCScan.
          </p>
          <ul className="text-gray-600 mt-4">
            <li>✅ Open source and publicly verifiable</li>
            <li>✅ Uses Chainlink VRF for provably fair randomness</li>
            <li>✅ Implements OpenZeppelin security standards</li>
            <li>✅ Non-upgradeable immutable contract</li>
            <li>✅ Automated execution with no human intervention in winner selection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SmartContractViewer;
