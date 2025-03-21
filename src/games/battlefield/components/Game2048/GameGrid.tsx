
import React from 'react';
import { Cube } from './types';

// Helper functions for styling
const getCubeColor = (value: number) => {
  const colors: Record<number, string> = {
    2: 'bg-amber-100',
    4: 'bg-amber-200',
    8: 'bg-orange-300',
    16: 'bg-orange-400',
    32: 'bg-orange-500',
    64: 'bg-orange-600',
    128: 'bg-yellow-400',
    256: 'bg-yellow-500',
    512: 'bg-yellow-600',
    1024: 'bg-yellow-700',
    2048: 'bg-yellow-800',
  };
  
  return colors[value] || 'bg-yellow-900';
};

const getTextColor = (value: number) => {
  return value <= 4 ? 'text-gray-800' : 'text-white';
};

interface GameGridProps {
  cubes: Cube[];
  gridSize: number;
}

const GameGrid: React.FC<GameGridProps> = ({ cubes, gridSize }) => {
  return (
    <div className="bg-muted/30 rounded-lg p-4">
      <div 
        className="grid gap-2 w-full aspect-square relative"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {/* Background grid */}
        {Array.from({ length: gridSize * gridSize }).map((_, index) => (
          <div 
            key={`cell-${index}`} 
            className="bg-gray-200 rounded-md flex items-center justify-center"
          />
        ))}
        
        {/* Cubes */}
        {cubes.map(cube => (
          <div
            key={cube.id}
            className={`absolute rounded-md flex items-center justify-center font-bold shadow-md
              ${getCubeColor(cube.value)} ${getTextColor(cube.value)}
              transform transition-all duration-200 ease-in-out`}
            style={{
              width: `calc((100% - ${(gridSize - 1) * 8}px) / ${gridSize})`,
              height: `calc((100% - ${(gridSize - 1) * 8}px) / ${gridSize})`,
              left: `calc(${cube.x} * (100% - ${(gridSize - 0) * 0}px) / ${gridSize} + ${cube.x} * 2px)`,
              top: `calc(${cube.y} * (100% - ${(gridSize - 0) * 0}px) / ${gridSize} + ${cube.y} * 2px)`,
              fontSize: 'clamp(1rem, 5vw, 1.5rem)',
            }}
          >
            {cube.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
