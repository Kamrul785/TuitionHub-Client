import { motion } from "framer-motion";

/**
 * Wraps page content with a subtle fade-in-up entrance animation.
 * Usage: <PageTransition>...page content...</PageTransition>
 */
const PageTransition = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
