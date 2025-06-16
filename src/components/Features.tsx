
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Zap, Globe, TrendingUp, Users, Lock } from 'lucide-react';

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "All donations secured by smart contracts on the EVM blockchain with full transparency.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Instant Execution", 
      description: "Automated winner selection using Chainlink VRF for provably fair randomness.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "Global Participation",
      description: "Open to non-US residents worldwide. Simple wallet connection required.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: TrendingUp,
      title: "Growing Pool",
      description: "Pool grows to $10M target. Winner receives $5M USD1 for Gold Card application.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of participants in this revolutionary financial opportunity.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Lock,
      title: "Smart Contract",
      description: "No intermediaries. Pure blockchain execution with mathematical certainty.",
      gradient: "from-gray-600 to-gray-800"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              USD1GoldCard?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionary blockchain technology meets life-changing opportunity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105"
              style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmerTranslate transition-opacity duration-1000"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Change Your Life?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join the revolution. One dollar could be your gateway to the American Dream.
            </p>
            <div className="flex justify-center items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">$5M USD1</div>
                <div className="text-gray-400 text-sm">Prize Pool</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">$1 USD1</div>
                <div className="text-gray-400 text-sm">Minimum Entry</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
