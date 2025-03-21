
import React from 'react';
import TransitionWrapper from '@/components/TransitionWrapper';
import BattlefieldGame from './components/BattlefieldGame';
import { LoadingIndicator } from './components/LoadingIndicator';

const BattlefieldApp: React.FC = () => {
  // In a real implementation, you would have loading logic here
  const isLoading = false;

  return (
    <TransitionWrapper>
      {isLoading ? <LoadingIndicator /> : <BattlefieldGame />}
    </TransitionWrapper>
  );
};

export default BattlefieldApp;
