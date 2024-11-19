'use client';

import React, { createContext, useContext, useState } from 'react';

interface PatternContextType {
  triggerNeuralAnimation: () => void;
  isAnimating: boolean;
}

const PatternContext = createContext<PatternContextType | undefined>(undefined);

export const PatternProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerNeuralAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000); // Animation duration
    }
  };

  return (
    <PatternContext.Provider value={{ triggerNeuralAnimation, isAnimating }}>
      {children}
    </PatternContext.Provider>
  );
};

export const usePattern = () => {
  const context = useContext(PatternContext);
  if (context === undefined) {
    throw new Error('usePattern must be used within a PatternProvider');
  }
  return context;
};
