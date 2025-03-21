
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useGame2048 } from './useGame2048';
import GameGrid from './GameGrid';
import GameControls from './GameControls';
import GameOverlay from './GameOverlay';

const Game2048: React.FC = () => {
  const gridSize = 4;
  const { gameState, resetGame, moveCubes } = useGame2048(gridSize);
  const { cubes, score, gameOver } = gameState;
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        moveCubes('up');
      } else if (e.key === 'ArrowDown') {
        moveCubes('down');
      } else if (e.key === 'ArrowLeft') {
        moveCubes('left');
      } else if (e.key === 'ArrowRight') {
        moveCubes('right');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveCubes]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-card p-8 rounded-xl shadow-lg relative">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-3">Number Blocks</h1>
          <p className="text-muted-foreground mb-4">
            Combine adjacent blocks with the same number. Get to 2048!
          </p>
          
          <div className="flex justify-between items-center mb-6">
            <div className="bg-primary/10 px-4 py-2 rounded-lg">
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-xl font-bold text-primary">{score}</p>
            </div>
            
            <Button 
              onClick={resetGame}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              New Game
            </Button>
          </div>
        </div>
        
        <GameGrid cubes={cubes} gridSize={gridSize} />
        
        <div className="mt-6">
          <GameControls onMove={moveCubes} />
        </div>
        
        <GameOverlay gameOver={gameOver} score={score} onReset={resetGame} />
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Use arrow keys to move blocks ⬆️ ⬇️ ⬅️ ➡️</p>
        </div>
      </div>
    </div>
  );
};

export default Game2048;
