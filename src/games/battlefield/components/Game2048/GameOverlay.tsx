
import React from 'react';
import { Button } from '@/components/ui/button';

interface GameOverlayProps {
  gameOver: boolean;
  score: number;
  onReset: () => void;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ gameOver, score, onReset }) => {
  if (!gameOver) return null;
  
  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-xl">
      <div className="bg-card p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
        <p className="mb-4">Your score: {score}</p>
        <Button onClick={onReset}>Play Again</Button>
      </div>
    </div>
  );
};

export default GameOverlay;
