
import React from 'react';
import { Button } from '@/components/ui/button';

interface GameControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onMove }) => {
  return (
    <div className="grid grid-cols-3 gap-2 md:hidden">
      <div></div>
      <Button variant="ghost" onClick={() => onMove('up')}>↑</Button>
      <div></div>
      <Button variant="ghost" onClick={() => onMove('left')}>←</Button>
      <Button variant="ghost" onClick={() => onMove('down')}>↓</Button>
      <Button variant="ghost" onClick={() => onMove('right')}>→</Button>
    </div>
  );
};

export default GameControls;
