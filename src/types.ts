/**
 * Mario Cat - Cách Mạng Tháng Tám 1945
 * Data Types & Interfaces
 */

export type GameState =
  | 'MENU'
  | 'LEVEL_SELECT'
  | 'PLAYING'
  | 'PAUSED'
  | 'LEVEL_CLEAR'
  | 'GAME_OVER'
  | 'VICTORY_CEREMONY'
  | 'INSTRUCTIONS'
  | 'HISTORY';

export type PowerUpType = 'NONE' | 'BIG_CAT' | 'LEAFLET' | 'STAR_INVINCIBLE';

export type BlockType =
  | 'GROUND'        // Soil, stone, brick ground
  | 'BRICK'         // Breakable brick block
  | 'QUESTION'      // Gold star reward block
  | 'USED_BLOCK'    // Empty block after hit
  | 'CRATE'         // Wooden crop crate
  | 'ROYAL_STONE'   // Mossy/Carved Hue stone
  | 'PIPE_BARREL'   // Guard post / obstacle barrel
  | 'PLATFORM';     // Floating moving/thin platform

export type ItemType =
  | 'POTATO_BREAD'  // 🍠 Củ khoai / Bánh mì (Grow / +1 Life)
  | 'LEAFLET_DOC'   // 📜 Tờ Truyền Đơn Cứu Quốc (Shoot leaflets)
  | 'STAR'          // ⭐️ Ngôi Sao Vàng (Invincibility)
  | 'FLAG_COIN';    // 🇻🇳 Cờ Đỏ Sao Vàng / Gold Star coin

export type EnemyType =
  | 'PATROL_GUARD'  // Lính tuần tra (walks back and forth)
  | 'TANK'          // Xe tăng quân địch (tougher, fires bullets or heavy hazard)
  | 'WATCH_TOWER';  // Tháp canh tĩnh

export interface Vector2D {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Player extends Rect {
  vx: number;
  vy: number;
  isGrounded: boolean;
  facing: 'left' | 'right';
  lives: number;
  powerUp: PowerUpType;
  invincibleTimer: number; // in seconds
  isDead: boolean;
  deathTimer: number;
  isBig: boolean;
  shootCooldown: number;
}

export interface Block extends Rect {
  id: string;
  type: BlockType;
  itemInside?: ItemType;
  isHit?: boolean;
  bounceOffset?: number;
}

export interface Item extends Rect {
  id: string;
  type: ItemType;
  vx: number;
  vy: number;
  isGrounded: boolean;
  collected: boolean;
}

export interface Enemy extends Rect {
  id: string;
  type: EnemyType;
  vx: number;
  vy: number;
  facing: 'left' | 'right';
  health: number;
  isDefeated: boolean;
  defeatAnimationTimer?: number;
  stunnedTimer?: number; // Stunned by leaflet
  minX?: number;
  maxX?: number;
}

export interface Projectile extends Rect {
  id: string;
  vx: number;
  vy: number;
  rotation: number;
  isFromPlayer: boolean;
  lifeTime: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  shape?: 'circle' | 'star' | 'square' | 'leaflet';
}

export interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
}

export interface WorldDefinition {
  id: number;
  worldNumber: number;
  title: string;
  subtitle: string;
  location: string;
  timePeriod: string;
  description: string;
  theme: {
    skyGradient: [string, string];
    groundColor: string;
    brickColor: string;
    accentColor: string;
    bgElements: string[]; // e.g. ['bamboo', 'sun', 'fortress']
  };
  targetScore: number;
  targetFlags: number;
}

export interface LevelMap {
  worldId: number;
  widthInBlocks: number;
  heightInBlocks: number;
  blocks: Block[];
  enemies: Enemy[];
  items: Item[];
  flagpole: Rect;
  playerStart: Vector2D;
}
