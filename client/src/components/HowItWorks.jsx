import { Wallet, Search, FileCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4">How ChainWork Works</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get started with ChainWork in four simple steps. Our platform makes it easy to connect,
            collaborate, and get paid securely.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: <Wallet className="h-8 w-8" />,
              title: "Connect Wallet",
              description: "Link your Web3 wallet to get started. We support multiple chains."
            },
            {
              icon: <Search className="h-8 w-8" />,
              title: "Find Work/Talent",
              description: "Browse projects or find talented freelancers using our AI matching."
            },
            {
              icon: <FileCheck className="h-8 w-8" />,
              title: "Complete Work",
              description: "Collaborate through our platform with built-in project management tools."
            },
            {
              icon: <Zap className="h-8 w-8" />,
              title: "Get Paid Instantly",
              description: "Receive payment automatically through smart contracts when work is approved."
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 hover:bg-gray-800/40 transition-all duration-300 h-full border border-gray-700/50">
                <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              {index < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <motion.div 
                    className="w-8 h-0.5 bg-orange-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}