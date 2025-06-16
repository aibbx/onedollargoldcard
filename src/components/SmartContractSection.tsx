
import React, { useState } from 'react';
import { Code, Shield, Zap, Eye, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SmartContractSection: React.FC = () => {
  const navigate = useNavigate();

  const contractFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "完全透明",
      description: "所有捐赠和抽奖过程都在区块链上公开验证",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "自动执行",
      description: "智能合约自动处理捐赠、中奖者选择和奖金分配",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "可验证随机",
      description: "使用Chainlink VRF确保中奖者选择完全公正",
      color: "from-green-500 to-teal-500"
    }
  ];

  const contractRules = [
    "最低捐赠 1.05 USD1 (1 USD1 进入奖池 + 0.05 USD1 服务费)",
    "奖池达到 1000万 USD1 时自动选择中奖者",
    "中奖者获得 500万 USD1，需管理员确认后转账",
    "7天无有效捐赠时，最后捐赠者获得全部奖池"
  ];

  const handleViewContract = () => {
    navigate('/how-it-works', { state: { scrollToSection: 'smartContract' } });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 mb-6">
            <Code className="w-5 h-5 text-blue-400" />
            <span className="text-white font-medium">智能合约驱动</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              智能合约
            </span>
            确保公正透明
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            我们的平台基于经过审计的智能合约构建，确保每一笔捐赠、每一次抽奖都完全透明且不可篡改
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Contract Features */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6">核心特性</h3>
            
            {contractFeatures.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color}`}>
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Contract Rules */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">合约规则</h3>
            
            <div className="space-y-4 mb-8">
              {contractRules.map((rule, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleViewContract}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              查看完整合约代码
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Contract Addresses */}
        <div className="mt-16 bg-gradient-to-r from-gray-900/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6 text-center">已验证的合约地址</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">奖池合约地址</div>
              <code className="text-blue-400 font-mono text-sm break-all">
                0x6c521c6eB53361e901EC2bC1a2D392c8e9796f77
              </code>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">手续费接收地址</div>
              <code className="text-purple-400 font-mono text-sm break-all">
                0x6c521c6eB53361e901EC2bC1a2D392c8e9796f77
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartContractSection;
