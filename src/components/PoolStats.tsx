import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { usePoolStats } from '../hooks/usePoolStats';
import { TrendingUp, Users, Clock, Trophy } from 'lucide-react';

const PoolStats = () => {
  const { t } = useLanguage();
  const { 
    poolAmount, 
    targetAmount, 
    totalDonors, 
    timeLeft, 
    progress, 
    isLoading 
  } = usePoolStats();

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    } else {
      return `$${amount.toLocaleString()}`;
    }
  };

  const stats = [
    {
      icon: TrendingUp,
      label: "Current Pool",
      value: isLoading ? "Loading..." : formatCurrency(poolAmount),
      change: `+$${Math.floor(poolAmount * 0.1)} today`,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      label: "Total Participants", 
      value: isLoading ? "Loading..." : totalDonors.toLocaleString(),
      change: `+${Math.floor(totalDonors * 0.05)} today`,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      label: "Time Remaining",
      value: isLoading ? "Loading..." : timeLeft,
      change: "Until target or inactivity",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Trophy,
      label: "Target Pool",
      value: formatCurrency(targetAmount),
      change: `${progress.toFixed(1)}% complete`,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Live Statistics
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real-time blockchain data showing the growing community and prize pool
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-6`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              
              <div className="text-gray-400 text-sm mb-4">
                {stat.label}
              </div>
              
              <div className="text-xs text-gray-500">
                {stat.change}
              </div>

              {/* Progress bar for pool completion */}
              {stat.label === "Target Pool" && (
                <div className="mt-4">
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Winner Selection Info - now with real prize amount */}
        <div className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-sm rounded-3xl p-12 border border-white/10 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            How Winners Are Selected
          </h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <div className="font-semibold text-white">Pool Reaches {formatCurrency(targetAmount)}</div>
                    <div className="text-gray-300 text-sm">Winner selected using Chainlink VRF</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <div className="font-semibold text-white">7-Day Inactivity Rule</div>
                    <div className="text-gray-300 text-sm">Last donor wins if no activity for 7 days</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <div className="font-semibold text-white">Instant Transfer</div>
                    <div className="text-gray-300 text-sm">{formatCurrency(targetAmount * 0.5)} USD1 automatically sent to winner</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{formatCurrency(targetAmount * 0.5)}</div>
                <div className="text-gray-300 mb-4">Winner Prize</div>
                <div className="text-blue-400 text-sm">USD1 Token Prize</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoolStats;
