import { motion } from 'framer-motion';
import { useTransition } from '../../contexts/TransitionContext';

const TransitionOverlay = () => {
  const { isTransitioning } = useTransition();

  const overlayVariants = {
    hidden: { opacity: 0, transition: { duration: 0.2 } },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate={isTransitioning ? 'visible' : 'hidden'}
      variants={overlayVariants}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        // backgroundColor: '#F7F7F0',
        // backgroundColor: '#3b7b73',
        // zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
};

export default TransitionOverlay;