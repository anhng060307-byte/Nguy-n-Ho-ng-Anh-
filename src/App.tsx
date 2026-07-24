import React, { useState, useEffect } from 'react';
import { GameState, WorldDefinition } from './types';
import { WORLDS } from './data/worlds';
import { MainMenu } from './components/MainMenu';
import { LevelSelect } from './components/LevelSelect';
import { GameCanvas } from './components/GameCanvas';
import { PauseModal } from './components/PauseModal';
import { VictoryModal } from './components/VictoryModal';
import { GameOverModal } from './components/GameOverModal';
import { InstructionsModal } from './components/InstructionsModal';
import { HistoryModal } from './components/HistoryModal';
import { sound } from './utils/audio';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [currentWorldId, setCurrentWorldId] = useState<number>(1);
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [flagsCollected, setFlagsCollected] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('mario_cat_1945_highscore');
    return saved ? parseInt(saved, 10) : 0;
  });

  const currentWorld = WORLDS.find((w) => w.id === currentWorldId) || WORLDS[0];

  // Sync mute setting
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleStartGame = () => {
    sound.playButtonClick();
    setCurrentWorldId(1);
    setScore(0);
    setFlagsCollected(0);
    setGameState('PLAYING');
  };

  const handleSelectLevel = (world: WorldDefinition) => {
    sound.playButtonClick();
    setCurrentWorldId(world.id);
    setGameState('PLAYING');
  };

  const handleLevelComplete = (earnedScore: number, earnedFlags: number) => {
    const newTotalScore = score + earnedScore;
    const newTotalFlags = flagsCollected + earnedFlags;
    setScore(newTotalScore);
    setFlagsCollected(newTotalFlags);

    if (newTotalScore > highScore) {
      setHighScore(newTotalScore);
      localStorage.setItem('mario_cat_1945_highscore', newTotalScore.toString());
    }

    // Unlock next level
    if (currentWorldId < WORLDS.length) {
      setUnlockedLevel((prev) => Math.max(prev, currentWorldId + 1));
    }

    setGameState('LEVEL_CLEAR');
  };

  const handleNextLevel = () => {
    sound.playButtonClick();
    if (currentWorldId < WORLDS.length) {
      setCurrentWorldId((prev) => prev + 1);
      setGameState('PLAYING');
    } else {
      setGameState('MENU');
    }
  };

  const handleRestartLevel = () => {
    sound.playButtonClick();
    setGameState('PLAYING');
  };

  const handleMainMenu = () => {
    sound.playButtonClick();
    setGameState('MENU');
  };

  return (
    <div className="w-full h-screen bg-stone-950 font-sans text-white overflow-hidden select-none">
      {/* 1. Main Menu Screen */}
      {gameState === 'MENU' && (
        <MainMenu
          onStartGame={handleStartGame}
          onOpenLevelSelect={() => setGameState('LEVEL_SELECT')}
          onOpenInstructions={() => setGameState('INSTRUCTIONS')}
          onOpenHistory={() => setGameState('HISTORY')}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          highScore={highScore}
        />
      )}

      {/* 2. Level Select Screen */}
      {gameState === 'LEVEL_SELECT' && (
        <LevelSelect
          unlockedLevel={unlockedLevel}
          onSelectLevel={handleSelectLevel}
          onBackToMenu={handleMainMenu}
        />
      )}

      {/* 3. Gameplay Screen */}
      {(gameState === 'PLAYING' || gameState === 'PAUSED') && (
        <GameCanvas
          worldId={currentWorldId}
          onLevelComplete={handleLevelComplete}
          onGameOver={() => setGameState('GAME_OVER')}
          onPause={() => setGameState('PAUSED')}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* 4. Pause Overlay */}
      {gameState === 'PAUSED' && (
        <PauseModal
          world={currentWorld}
          onResume={() => setGameState('PLAYING')}
          onRestart={handleRestartLevel}
          onMainMenu={handleMainMenu}
          onOpenInstructions={() => setGameState('INSTRUCTIONS')}
        />
      )}

      {/* 5. Level Victory Modal */}
      {gameState === 'LEVEL_CLEAR' && (
        <VictoryModal
          world={currentWorld}
          score={score}
          flagsCollected={flagsCollected}
          isFinalWorld={currentWorldId === WORLDS.length}
          onNextLevel={handleNextLevel}
          onMainMenu={handleMainMenu}
        />
      )}

      {/* 6. Game Over Modal */}
      {gameState === 'GAME_OVER' && (
        <GameOverModal
          world={currentWorld}
          onRetry={handleRestartLevel}
          onMainMenu={handleMainMenu}
        />
      )}

      {/* 7. Instructions Modal */}
      {gameState === 'INSTRUCTIONS' && (
        <InstructionsModal onClose={() => setGameState(gameState === 'PAUSED' ? 'PAUSED' : 'MENU')} />
      )}

      {/* 8. History Modal */}
      {gameState === 'HISTORY' && (
        <HistoryModal onClose={() => setGameState('MENU')} />
      )}
    </div>
  );
}
