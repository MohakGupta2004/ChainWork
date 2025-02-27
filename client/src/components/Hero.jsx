import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The Next Level of
            <motion.span
              className="text-orange-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {' '}
              Web3
            </motion.span>{' '}
            Freelancing
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Connect, collaborate, and get paid securely with blockchain
            technology. The future of freelancing is here.
          </motion.p>

          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Find Work
            </motion.button>
            <motion.button
              className="border border-orange-500 text-orange-500 px-8 py-4 rounded-lg hover:bg-orange-500/10 transition text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Talent
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}