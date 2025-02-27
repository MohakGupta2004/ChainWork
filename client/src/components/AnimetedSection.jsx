import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types'; // ✅ Import PropTypes

export function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.7,
        delay,
        ease: 'easeInOut',
      }}
      className={`transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ✅ Define PropTypes to fix the missing props validation warning
AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is required
  className: PropTypes.string,
  delay: PropTypes.number,
};

export default AnimatedSection;
