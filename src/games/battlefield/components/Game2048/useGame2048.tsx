
import { useState, useEffect } from 'react';
import { Cube, Game2048State } from './types';

export const useGame2048 = (gridSize: number = 4) => {
  const [gameState, setGameState] = useState<Game2048State>({
    cubes: [],
    score: 0,
    gameOver: false
  });
  
  // Initialize game board
  useEffect(() => {
    resetGame();
  }, []);
  
  const resetGame = () => {
    // Create initial cubes with random values (2 or 4) at random positions
    const initialCubes: Cube[] = [];
    // Add two initial cubes
    for (let i = 0; i < 2; i++) {
      addRandomCube(initialCubes);
    }
    
    setGameState({
      cubes: initialCubes,
      score: 0,
      gameOver: false
    });
  };
  
  const addRandomCube = (currentCubes: Cube[]) => {
    // Generate all possible empty positions
    const emptyPositions = [];
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        if (!currentCubes.some(cube => cube.x === x && cube.y === y)) {
          emptyPositions.push({ x, y });
        }
      }
    }
    
    if (emptyPositions.length > 0) {
      const position = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
      const value = Math.random() < 0.8 ? 2 : 4; // 80% chance for 2, 20% chance for 4
      
      currentCubes.push({
        id: Date.now() + Math.random(), // Unique ID
        value,
        x: position.x,
        y: position.y
      });
    }
    
    return currentCubes;
  };
  
  const checkGameOver = (currentCubes: Cube[]) => {
    // Check if board is full
    if (currentCubes.length < gridSize * gridSize) {
      return false;
    }
    
    // Check if any adjacent cubes have the same value
    for (const cube of currentCubes) {
      const { x, y, value } = cube;
      
      // Check adjacent cells
      const adjacentPositions = [
        { x: x + 1, y },
        { x: x - 1, y },
        { x, y: y + 1 },
        { x, y: y - 1 }
      ];
      
      for (const pos of adjacentPositions) {
        if (pos.x >= 0 && pos.x < gridSize && pos.y >= 0 && pos.y < gridSize) {
          const adjacentCube = currentCubes.find(c => c.x === pos.x && c.y === pos.y);
          if (adjacentCube && adjacentCube.value === value) {
            return false;
          }
        }
      }
    }
    
    return true;
  };
  
  const moveCubes = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameState.gameOver) return;
    
    let newCubes = [...gameState.cubes];
    let hasChanged = false;
    let newScore = gameState.score;
    
    // Sort cubes based on direction to handle merging correctly
    if (direction === 'up') {
      newCubes.sort((a, b) => a.y - b.y);
    } else if (direction === 'down') {
      newCubes.sort((a, b) => b.y - a.y);
    } else if (direction === 'left') {
      newCubes.sort((a, b) => a.x - b.x);
    } else if (direction === 'right') {
      newCubes.sort((a, b) => b.x - a.x);
    }
    
    // Process each cube
    newCubes.forEach(cube => {
      let { x, y } = cube;
      
      // Move in the specified direction until hitting a wall or another cube
      let moved = false;
      
      if (direction === 'up') {
        while (y > 0 && !newCubes.some(c => c.id !== cube.id && c.x === x && c.y === y - 1)) {
          y--;
          moved = true;
        }
      } else if (direction === 'down') {
        while (y < gridSize - 1 && !newCubes.some(c => c.id !== cube.id && c.x === x && c.y === y + 1)) {
          y++;
          moved = true;
        }
      } else if (direction === 'left') {
        while (x > 0 && !newCubes.some(c => c.id !== cube.id && c.y === y && c.x === x - 1)) {
          x--;
          moved = true;
        }
      } else if (direction === 'right') {
        while (x < gridSize - 1 && !newCubes.some(c => c.id !== cube.id && c.y === y && c.x === x + 1)) {
          x++;
          moved = true;
        }
      }
      
      if (moved) {
        cube.x = x;
        cube.y = y;
        hasChanged = true;
      }
    });
    
    // Merge cubes with the same value that are adjacent
    const mergedIds = new Set<number>();
    
    // Sort again after movement
    if (direction === 'up') {
      newCubes.sort((a, b) => a.y - b.y);
    } else if (direction === 'down') {
      newCubes.sort((a, b) => b.y - a.y);
    } else if (direction === 'left') {
      newCubes.sort((a, b) => a.x - b.x);
    } else if (direction === 'right') {
      newCubes.sort((a, b) => b.x - a.x);
    }
    
    for (let i = 0; i < newCubes.length; i++) {
      if (mergedIds.has(newCubes[i].id)) continue;
      
      for (let j = i + 1; j < newCubes.length; j++) {
        const cubeA = newCubes[i];
        const cubeB = newCubes[j];
        
        // Check if adjacent and same value
        const isAdjacent = (
          (Math.abs(cubeA.x - cubeB.x) === 1 && cubeA.y === cubeB.y) ||
          (Math.abs(cubeA.y - cubeB.y) === 1 && cubeA.x === cubeB.x)
        );
        
        if (isAdjacent && cubeA.value === cubeB.value && !mergedIds.has(cubeB.id)) {
          // Merge cubes
          cubeA.value *= 2;
          newScore += cubeA.value;
          mergedIds.add(cubeB.id);
          hasChanged = true;
          break;
        }
      }
    }
    
    // Remove merged cubes
    newCubes = newCubes.filter(cube => !mergedIds.has(cube.id));
    
    // Add a new cube if the board changed
    if (hasChanged) {
      newCubes = addRandomCube([...newCubes]);
      
      // Check if game is over
      const noMoreMoves = checkGameOver(newCubes);
      if (noMoreMoves) {
        setGameState(prev => ({
          ...prev,
          gameOver: true,
          cubes: newCubes,
          score: newScore
        }));
        return;
      }
    }
    
    setGameState(prev => ({
      ...prev,
      cubes: newCubes,
      score: newScore
    }));
  };

  return {
    gameState,
    resetGame,
    moveCubes
  };
};
