import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const TransitionContext = createContext(null);

export const TransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const TRANSITION_DURATION = 300;

  const startTransition = (toPath) => {
    setIsTransitioning(true);

    setTimeout(() => {
      navigate(toPath);

      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </TransitionContext.Provider>
  );
};

export const useTransition = () => useContext(TransitionContext);