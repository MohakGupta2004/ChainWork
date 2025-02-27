import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600" />
          
          {/* Animated Circles */}
          <motion.div
            className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -left-20 -bottom-20 w-64 h-64 bg-black/10 rounded-full"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Content */}
          <div className="relative p-12 text-center">
            <motion.h2
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to Start?
            </motion.h2>
            <motion.p
              className="text-xl mb-8 max-w-2xl mx-auto text-white/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Join thousands of freelancers and clients building the future of work on the blockchain.
            </motion.p>
            <motion.button
              className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-900 transition text-lg inline-flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started <ChevronRight className="ml-2 h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
