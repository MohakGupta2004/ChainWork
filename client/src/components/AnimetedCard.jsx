import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedCard = ({ children, className = '', delay = 0, hover = true }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      whileHover={hover ? { scale: 1.03, y: -3 } : undefined}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeInOut',
      }}
      className={`rounded-xl shadow-lg overflow-hidden transition-all ${className}`}
    >
      <div className="p-4">{children}</div>
    </motion.div>
  );
};

// ✅ Add PropTypes validation
AnimatedCard.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is required
  className: PropTypes.string,
  delay: PropTypes.number,
  hover: PropTypes.bool,
};

export default AnimatedCard;
