import { useState, useCallback } from 'react';

interface LoadingState {
  isLoading: boolean;
  loadingProgress: number;
  startLoading: () => void;
  updateProgress: (progress: number) => void;
  finishLoading: () => void;
}

export const useLoadingState = (): LoadingState => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setLoadingProgress(0);
    
    // Auto-increment progress to simulate loading
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      
      if (progress > 90) {
        clearInterval(interval);
        setLoadingProgress(90); // Cap at 90% until finishLoading is called
      } else {
        setLoadingProgress(progress);
      }
    }, 300);
    
    // Cleanup interval if component unmounts
    return () => clearInterval(interval);
  }, []);

  const updateProgress = useCallback((progress: number) => {
    setLoadingProgress(Math.min(90, progress)); // Cap at 90% until finishLoading is called
  }, []);

  const finishLoading = useCallback(() => {
    setLoadingProgress(100);
    
    // Small delay before hiding the loading indicator
    setTimeout(() => {
      setIsLoading(false);
      setLoadingProgress(0);
    }, 300);
  }, []);

  return {
    isLoading,
    loadingProgress,
    startLoading,
    updateProgress,
    finishLoading,
  };
};