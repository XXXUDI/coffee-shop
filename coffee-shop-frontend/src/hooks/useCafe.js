import { useContext } from 'react';
import { CafeContext } from '../context/cafeContext.js';

export const useCafe = () => {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error('useCafe must be used within a CafeProvider');
  }
  return context;
};
