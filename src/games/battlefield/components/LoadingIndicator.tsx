
import React from 'react';
import TransitionWrapper from '@/components/TransitionWrapper';

export const LoadingIndicator: React.FC = () => {
  return (
    <TransitionWrapper>
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 rounded-full bg-primary/20"></div>
        </div>
      </div>
    </TransitionWrapper>
  );
};
