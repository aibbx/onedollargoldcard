
import { donationProcessingContract } from './donationProcessingContract';
import { winnerSelectionContract } from './winnerSelectionContract';
import { inactivitySafeguardContract } from './inactivitySafeguardContract';
import type { ContractSection } from '../types/contract';

export const contractSections: ContractSection[] = [
  donationProcessingContract,
  winnerSelectionContract,
  inactivitySafeguardContract
];
