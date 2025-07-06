import React, { useState, useEffect } from 'react';
import { CafeContext } from './cafeContext.js';
import CafeService from '../api/cafeService';

export const CafeProvider = ({ children }) => {
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [isLoadingCafes, setIsLoadingCafes] = useState(true);
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const cafeService = new CafeService();
        const cafeList = await cafeService.getCafes();
        setCafes(cafeList);
        if (cafeList.length > 0) {
          setSelectedCafe(cafeList[0]); // Select first cafe by default
        }
      } catch (error) {
        console.error('Error fetching cafes:', error);
        // Fallback to mock cafe
        const mockCafe = {
          id: '6865de2ede02ff78d35bc68e', // Use the actual cafe ID you have
          address: 'Porto de Galinhas, PE'
        };
        setSelectedCafe(mockCafe);
        setCafes([mockCafe]);
      } finally {
        setIsLoadingCafes(false);
      }
    };

    fetchCafes();
  }, []);

  const handleCafeChange = (cafe) => {
    console.log('CafeContext - Cafe changed to:', cafe);
    setSelectedCafe(cafe);
  };

  const value = {
    selectedCafe,
    setSelectedCafe: handleCafeChange,
    isLoadingCafes,
    cafes
  };

  return (
    <CafeContext.Provider value={value}>
      {children}
    </CafeContext.Provider>
  );
};
