import {
    Shield,
    Zap,
    Wallet2,
    Bot,
    Target,
    ArrowUpRight,
  } from 'lucide-react';
  import { motion } from 'framer-motion';

  import AnimatedSection from './AnimetedSection';
  import AnimatedCard from './AnimetedCard';

  
  export default function Features() {
    return (
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="mb-16">
            <h2 className="text-6xl text-center font-bold mb-4 my-2 py-2">
              About ChainWork
            </h2>
            <div className="items-center justify-center gap-2 text-2xl text-gray-400 mb-8">
              <span>Our team has been creating </span>
              <Zap className="inline h-6 w-6 text-orange-500" />
              <span> a unique and powerful freelancing platform for </span>
              <span className="bg-orange-500/50 text-white px-2 py-1 rounded">
                Web3
              </span>
              <span> with a team of </span>
              <span className="bg-gray-800 px-2 py-1 rounded">20+ people</span>
            </div>
          </AnimatedSection>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row: 2-1 Layout */}
            <AnimatedCard className="md:col-span-2" delay={0.2}>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 h-full border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
                <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Smart Contract Security
                </h3>
                <p className="text-gray-400 mb-6">
                  Enterprise-grade smart contracts with automated auditing and
                  threat detection. Protecting over $50M in freelancer earnings.
                </p>
                <motion.button
                  className="flex items-center text-orange-500 hover:text-orange-400 transition-colors"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn more <ArrowUpRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </AnimatedCard>
  
            <AnimatedCard delay={0.3}>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 h-full">
                <div className="bg-black/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Wallet2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Instant Payments</h3>
                <p className="text-white/90">
                  Get paid instantly in crypto or stablecoins. No more waiting for
                  bank transfers.
                </p>
              </div>
            </AnimatedCard>
  
            {/* Second Row: 1-2 Layout */}
            <AnimatedCard delay={0.4}>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 h-full border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
                <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Bot className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">AI-based Detection</h3>
                <p className="text-gray-400">
                  Advanced fraud prevention and quality assurance powered by AI.
                </p>
              </div>
            </AnimatedCard>
  
            <AnimatedCard className="md:col-span-2" delay={0.5}>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 h-full border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
                <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Smart Talent Matching</h3>
                <p className="text-gray-400">
                  AI-powered system suggests personalized matches based on skills,
                  experience, and project requirements. Over 15K+ successful
                  matches made.
                </p>
              </div>
            </AnimatedCard>
          </div>
  
          <AnimatedSection className="mt-20" delay={0.6}>
            <h2 className="text-6xl text-center font-bold mb-12">Our Goal</h2>
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { value: '$50M+', label: 'Paid to Freelancers' },
                { value: '15K+', label: 'Active Projects' },
                { value: '95%', label: 'Client Satisfaction' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                >
                  <motion.div
                    className="text-6xl font-bold text-white mb-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }