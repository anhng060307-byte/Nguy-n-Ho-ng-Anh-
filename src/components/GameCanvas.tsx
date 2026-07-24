import React, { useEffect, useRef, useState } from 'react';
import { generateLevelMap } from '../data/levels';
import { WORLDS } from '../data/worlds';
import {
  Block,
  Enemy,
  FloatingText,
  Item,
  Particle,
  Player,
  Projectile,
  WorldDefinition,
} from '../types';
import { sound } from '../utils/audio';
import {
  renderBackground,
  renderBlock,
  renderEnemy,
  renderFlagpole,
  renderFloatingTexts,
  renderItem,
  renderParticles,
  renderPlayer,
  renderProjectile,
} from '../utils/renderer';
import { HUD } from './HUD';
import { TouchControls } from './TouchControls';

interface GameCanvasProps {
  worldId: number;
  onLevelComplete: (score: number, flags: number) => void;
  onGameOver: () => void;
  onPause: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  worldId,
  onLevelComplete,
  onGameOver,
  onPause,
  isMuted,
  onToggleMute,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const world: WorldDefinition = WORLDS.find((w) => w.id === worldId) || WORLDS[0];

  // Game Engine State Refs (for smooth 60fps loop without React re-render lag)
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const cameraXRef = useRef<number>(0);
  const scoreRef = useRef<number>(0);
  const flagsRef = useRef<number>(0);

  // Entities state refs
  const mapDataRef = useRef(generateLevelMap(worldId));

  const playerRef = useRef<Player>({
    x: mapDataRef.current.playerStart.x,
    y: mapDataRef.current.playerStart.y,
    width: 32,
    height: 38,
    vx: 0,
    vy: 0,
    isGrounded: false,
    facing: 'right',
    lives: 5, // 5 Mạng
    powerUp: 'NONE',
    invincibleTimer: 0,
    isDead: false,
    deathTimer: 0,
    isBig: false,
    shootCooldown: 0,
  });

  const blocksRef = useRef<Block[]>(mapDataRef.current.blocks);
  const enemiesRef = useRef<Enemy[]>(mapDataRef.current.enemies);
  const itemsRef = useRef<Item[]>(mapDataRef.current.items);
  const projectilesRef = useRef<Projectile[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);

  // HUD display state
  const [hudState, setHudState] = useState({
    lives: 5,
    score: 0,
    flags: 0,
    powerUp: 'NONE' as Player['powerUp'],
    invincibleTimer: 0,
  });

  // Touch control helper handlers
  const touchLeftRef = useRef(false);
  const touchRightRef = useRef(false);
  const touchJumpRef = useRef(false);

  // Initialize or reset level
  useEffect(() => {
    mapDataRef.current = generateLevelMap(worldId);
    blocksRef.current = mapDataRef.current.blocks;
    enemiesRef.current = mapDataRef.current.enemies;
    itemsRef.current = mapDataRef.current.items;
    projectilesRef.current = [];
    particlesRef.current = [];
    floatingTextsRef.current = [];
    cameraXRef.current = 0;

    playerRef.current = {
      x: mapDataRef.current.playerStart.x,
      y: mapDataRef.current.playerStart.y,
      width: 32,
      height: 38,
      vx: 0,
      vy: 0,
      isGrounded: false,
      facing: 'right',
      lives: playerRef.current.lives > 0 ? playerRef.current.lives : 5,
      powerUp: 'NONE',
      invincibleTimer: 0,
      isDead: false,
      deathTimer: 0,
      isBig: false,
      shootCooldown: 0,
    };

    sound.startBGM();

    return () => {
      sound.stopBGM();
    };
  }, [worldId]);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;

      // Escape or P to Pause
      if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        onPause();
      }

      // Shoot key
      if (
        (e.key === 'x' || e.key === 'X' || e.key === 'Shift') &&
        playerRef.current.powerUp === 'LEAFLET' &&
        playerRef.current.shootCooldown <= 0
      ) {
        shootLeaflet();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onPause]);

  const shootLeaflet = () => {
    const p = playerRef.current;
    if (p.isDead) return;

    sound.playLeafletShoot();
    p.shootCooldown = 0.3; // Seconds

    const vx = p.facing === 'right' ? 8 : -8;
    projectilesRef.current.push({
      id: `proj_${Date.now()}_${Math.random()}`,
      x: p.facing === 'right' ? p.x + p.width : p.x - 16,
      y: p.y + 10,
      width: 16,
      height: 12,
      vx,
      vy: -1,
      rotation: 0,
      isFromPlayer: true,
      lifeTime: 2.5,
    });
  };

  // Particle Generators
  const createDebris = (x: number, y: number, color: string) => {
    for (let i = 0; i < 8; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 6 - 2,
        color,
        size: Math.random() * 4 + 2,
        life: 1,
        maxLife: 1,
      });
    }
  };

  const addFloatingText = (x: number, y: number, text: string, color = '#f1c40f') => {
    floatingTextsRef.current.push({
      id: `ft_${Date.now()}_${Math.random()}`,
      x,
      y,
      text,
      color,
      life: 1,
      maxLife: 1,
    });
  };

  // Main 60 FPS Game Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const updateAndRender = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05); // Cap dt
      lastTime = currentTime;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Resize Canvas to fit parent container
      const container = canvas.parentElement;
      if (container) {
        if (canvas.width !== container.clientWidth || canvas.height !== container.clientHeight) {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
        }
      }

      // --- GAME PHYSICS UPDATE ---
      const player = playerRef.current;

      if (!player.isDead) {
        // Timers
        if (player.invincibleTimer > 0) {
          player.invincibleTimer -= dt;
        }
        if (player.shootCooldown > 0) {
          player.shootCooldown -= dt;
        }

        // Horizontal Controls
        const speed = player.invincibleTimer > 0 ? 6.5 : 4.5;
        let moveX = 0;

        if (keysRef.current['ArrowRight'] || keysRef.current['d'] || keysRef.current['D'] || touchRightRef.current) {
          moveX += 1;
          player.facing = 'right';
        }
        if (keysRef.current['ArrowLeft'] || keysRef.current['a'] || keysRef.current['A'] || touchLeftRef.current) {
          moveX -= 1;
          player.facing = 'left';
        }

        player.vx = moveX * speed;

        // Jump Control
        const jumpPressed =
          keysRef.current['ArrowUp'] ||
          keysRef.current['w'] ||
          keysRef.current['W'] ||
          keysRef.current[' '] ||
          touchJumpRef.current;

        if (jumpPressed && player.isGrounded) {
          player.vy = -11.5;
          player.isGrounded = false;
          sound.playJump();
        }

        // Apply Gravity
        player.vy += 22 * dt;

        // Apply X Movement & Block Collision
        player.x += player.vx;
        blocksRef.current.forEach((b) => {
          if (checkRectOverlap(player, b)) {
            if (player.vx > 0) {
              player.x = b.x - player.width;
            } else if (player.vx < 0) {
              player.x = b.x + b.width;
            }
          }
        });

        // Apply Y Movement & Block Collision
        player.y += player.vy;
        player.isGrounded = false;

        blocksRef.current.forEach((b) => {
          if (checkRectOverlap(player, b)) {
            if (player.vy > 0) {
              // Landing on top of block
              player.y = b.y - player.height;
              player.vy = 0;
              player.isGrounded = true;
            } else if (player.vy < 0) {
              // Headbutting block from below
              player.y = b.y + b.height;
              player.vy = 0;

              // Hit Question or Brick Block
              if (b.type === 'QUESTION' && !b.isHit) {
                b.isHit = true;
                b.type = 'USED_BLOCK';
                b.bounceOffset = -8;
                sound.playPowerUpSpawn();

                if (b.itemInside) {
                  itemsRef.current.push({
                    id: `item_${Date.now()}_${Math.random()}`,
                    type: b.itemInside,
                    x: b.x + 6,
                    y: b.y - 28,
                    width: 20,
                    height: 20,
                    vx: 0.8,
                    vy: -3,
                    isGrounded: false,
                    collected: false,
                  });
                }
              } else if (b.type === 'BRICK' || b.type === 'CRATE') {
                b.bounceOffset = -6;
                sound.playBlockBump();
                if (player.isBig || player.invincibleTimer > 0) {
                  // Break brick
                  createDebris(b.x + b.width / 2, b.y + b.height / 2, world.theme.brickColor);
                  b.y = 99999; // Remove block
                  scoreRef.current += 50;
                }
              }
            }
          }

          // Bounce back animation recovery
          if (b.bounceOffset && b.bounceOffset < 0) {
            b.bounceOffset += 28 * dt;
            if (b.bounceOffset > 0) b.bounceOffset = 0;
          }
        });

        // Fall off bottom pit -> Lose life
        if (player.y > canvas.height + 100) {
          handlePlayerDamage(true);
        }

        // --- ITEM PICKUP & PHYSICS ---
        itemsRef.current.forEach((item) => {
          if (item.collected) return;

          // Item physics
          item.vy += 15 * dt;
          item.x += item.vx;
          item.y += item.vy;

          blocksRef.current.forEach((b) => {
            if (checkRectOverlap(item, b)) {
              if (item.vy > 0) {
                item.y = b.y - item.height;
                item.vy = 0;
                item.isGrounded = true;
              } else if (item.vx > 0) {
                item.x = b.x - item.width;
                item.vx = -item.vx;
              } else if (item.vx < 0) {
                item.x = b.x + b.width;
                item.vx = -item.vx;
              }
            }
          });

          // Player collecting item
          if (checkRectOverlap(player, item)) {
            item.collected = true;

            if (item.type === 'POTATO_BREAD') {
              sound.playPowerUpCollect();
              player.powerUp = 'BIG_CAT';
              player.isBig = true;
              scoreRef.current += 300;
              addFloatingText(player.x, player.y - 20, '🍠 CỦ KHOAI (+300)');
            } else if (item.type === 'LEAFLET_DOC') {
              sound.playPowerUpCollect();
              player.powerUp = 'LEAFLET';
              scoreRef.current += 500;
              addFloatingText(player.x, player.y - 20, '📜 TRUYỀN ĐƠN (+500)');
            } else if (item.type === 'STAR') {
              sound.playPowerUpCollect();
              player.powerUp = 'STAR_INVINCIBLE';
              player.invincibleTimer = 8; // 8 seconds invincibility
              scoreRef.current += 800;
              addFloatingText(player.x, player.y - 20, '⭐️ BẤT TỬ (+800)', '#f1c40f');
            } else if (item.type === 'FLAG_COIN') {
              sound.playCoin();
              flagsRef.current += 1;
              scoreRef.current += 200;
              addFloatingText(player.x, player.y - 20, '🇻🇳 CỜ ĐỎ (+200)', '#e74c3c');
            }
          }
        });

        // --- PROJECTILES PHYSICS ---
        projectilesRef.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.lifeTime -= dt;

          // Rotation
          p.rotation += 10 * dt;

          // Hit enemies
          if (p.isFromPlayer) {
            enemiesRef.current.forEach((e) => {
              if (!e.isDefeated && checkRectOverlap(p, e)) {
                p.lifeTime = 0; // Destroy projectile
                e.health -= 1;

                if (e.health <= 0) {
                  e.isDefeated = true;
                  sound.playStomp();
                  scoreRef.current += e.type === 'TANK' ? 600 : 300;
                  addFloatingText(e.x, e.y, e.type === 'TANK' ? '+600' : '+300');
                  createDebris(e.x + e.width / 2, e.y + e.height / 2, '#e74c3c');
                } else {
                  e.stunnedTimer = 2; // Stun
                  sound.playBlockBump();
                }
              }
            });
          }
        });

        projectilesRef.current = projectilesRef.current.filter((p) => p.lifeTime > 0);

        // --- ENEMIES AI & COLLISION ---
        enemiesRef.current.forEach((e) => {
          if (e.isDefeated) return;

          // Enemy patrol
          if (!e.stunnedTimer || e.stunnedTimer <= 0) {
            e.x += e.vx;
            if (e.minX && e.x < e.minX) {
              e.x = e.minX;
              e.vx = -e.vx;
              e.facing = 'right';
            } else if (e.maxX && e.x > e.maxX) {
              e.x = e.maxX;
              e.vx = -e.vx;
              e.facing = 'left';
            }
          } else {
            e.stunnedTimer -= dt;
          }

          // Collision with player
          if (checkRectOverlap(player, e)) {
            if (player.invincibleTimer > 0) {
              // Star invincibility knocks enemy away!
              e.isDefeated = true;
              sound.playExplosion();
              scoreRef.current += 500;
              createDebris(e.x + e.width / 2, e.y + e.height / 2, '#f1c40f');
              addFloatingText(e.x, e.y, '+500 ⭐️', '#f1c40f');
            } else if (player.vy > 0 && player.y + player.height - player.vy <= e.y + 12) {
              // Stomp on top of enemy head!
              e.isDefeated = true;
              player.vy = -8; // Bounce up
              sound.playStomp();
              scoreRef.current += 250;
              addFloatingText(e.x, e.y, '+250');
              createDebris(e.x + e.width / 2, e.y + e.height / 2, '#2c3e50');
            } else {
              // Player takes damage
              handlePlayerDamage(false);
            }
          }
        });

        // --- FLAGPOLE / LEVEL END CHECK ---
        const flagpole = mapDataRef.current.flagpole;
        if (checkRectOverlap(player, flagpole)) {
          sound.playLevelVictory();
          onLevelComplete(scoreRef.current, flagsRef.current);
          return;
        }

        // Camera Tracking
        const targetCamX = Math.max(0, player.x - canvas.width * 0.35);
        cameraXRef.current += (targetCamX - cameraXRef.current) * 0.1;
      } else {
        // Player Death Timer
        player.deathTimer += dt;
        if (player.deathTimer > 1.5) {
          if (player.lives > 0) {
            // Respawn
            player.x = mapDataRef.current.playerStart.x;
            player.y = mapDataRef.current.playerStart.y;
            player.vx = 0;
            player.vy = 0;
            player.isDead = false;
            player.invincibleTimer = 2.5; // Short spawn invincibility
          } else {
            // Game Over
            sound.playGameOver();
            onGameOver();
            return;
          }
        }
      }

      // Update Particles & Floating Text
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt;
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      floatingTextsRef.current.forEach((ft) => {
        ft.y -= 20 * dt;
        ft.life -= dt;
      });
      floatingTextsRef.current = floatingTextsRef.current.filter((ft) => ft.life > 0);

      // --- RENDERING PASS ---
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      renderBackground(ctx, canvas.width, canvas.height, cameraXRef.current, world);

      ctx.save();
      ctx.translate(-cameraXRef.current, 0);

      // Render Flagpole
      renderFlagpole(ctx, mapDataRef.current.flagpole);

      // Render Blocks
      blocksRef.current.forEach((b) => renderBlock(ctx, b, world));

      // Render Items
      itemsRef.current.forEach((item) => renderItem(ctx, item));

      // Render Enemies
      enemiesRef.current.forEach((e) => renderEnemy(ctx, e));

      // Render Projectiles
      projectilesRef.current.forEach((p) => renderProjectile(ctx, p));

      // Render Player
      renderPlayer(ctx, player);

      // Render Particles & Text
      renderParticles(ctx, particlesRef.current);
      renderFloatingTexts(ctx, floatingTextsRef.current);

      ctx.restore();

      // Update HUD State occasionally
      setHudState({
        lives: player.lives,
        score: scoreRef.current,
        flags: flagsRef.current,
        powerUp: player.powerUp,
        invincibleTimer: player.invincibleTimer,
      });

      animationFrameId = requestAnimationFrame(updateAndRender);
    };

    animationFrameId = requestAnimationFrame(updateAndRender);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [worldId, world, onLevelComplete, onGameOver]);

  const handlePlayerDamage = (isInstantKill: boolean) => {
    const player = playerRef.current;
    if (player.invincibleTimer > 0 && !isInstantKill) return;

    if (player.isBig && !isInstantKill) {
      // Revert to normal cat
      player.isBig = false;
      player.powerUp = 'NONE';
      player.invincibleTimer = 2;
      sound.playBlockBump();
      return;
    }

    // Lose a life
    player.lives -= 1;
    player.isDead = true;
    player.deathTimer = 0;
    sound.playExplosion();

    if (player.lives <= 0) {
      sound.playGameOver();
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      {/* HUD Header */}
      <HUD
        player={playerRef.current}
        world={world}
        score={hudState.score}
        flagsCollected={hudState.flags}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        onPause={onPause}
      />

      {/* 2D HTML5 Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block bg-stone-950 cursor-crosshair" />

      {/* On-Screen Mobile Touch Controls */}
      <TouchControls
        onLeftStart={() => (touchLeftRef.current = true)}
        onLeftEnd={() => (touchLeftRef.current = false)}
        onRightStart={() => (touchRightRef.current = true)}
        onRightEnd={() => (touchRightRef.current = false)}
        onJumpStart={() => (touchJumpRef.current = true)}
        onJumpEnd={() => (touchJumpRef.current = false)}
        onShootStart={() => shootLeaflet()}
        hasShootPower={hudState.powerUp === 'LEAFLET'}
      />
    </div>
  );
};

function checkRectOverlap(r1: { x: number; y: number; width: number; height: number }, r2: { x: number; y: number; width: number; height: number }) {
  return (
    r1.x < r2.x + r2.width &&
    r1.x + r1.width > r2.x &&
    r1.y < r2.y + r2.height &&
    r1.y + r1.height > r2.y
  );
}
