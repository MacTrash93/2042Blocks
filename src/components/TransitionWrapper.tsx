
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface TransitionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const TransitionWrapper = ({ children, className = '' }: TransitionWrapperProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('animate-fade-in');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('animate-fade-out');
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('animate-fade-in');
      }, 300); // Match this with the animation duration
      
      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  return (
    <div className={`${transitionStage} min-h-[calc(100vh-4rem)] ${className}`}>
      {children}
    </div>
  );
};

export default TransitionWrapper;
