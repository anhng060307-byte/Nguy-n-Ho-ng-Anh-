import { Block, Enemy, Item, LevelMap, Vector2D } from '../types';

/**
 * Generates rich, playable level maps for all 5 worlds of Mario Cat 1945.
 */
export function generateLevelMap(worldId: number): LevelMap {
  const widthInBlocks = worldId === 5 ? 80 : 120 + worldId * 10;
  const heightInBlocks = 14;
  const blockSize = 32;

  const blocks: Block[] = [];
  const enemies: Enemy[] = [];
  const items: Item[] = [];

  const groundY = heightInBlocks - 2;

  let blockIdCounter = 0;
  let enemyIdCounter = 0;
  let itemIdCounter = 0;

  // 1. Build Ground with occasional gaps for jumping challenge
  for (let x = 0; x < widthInBlocks; x++) {
    // Leave gaps in worlds 2, 3, 4 for platform jumping (World 5 is flat victory parade)
    const isGap =
      worldId !== 5 &&
      ((x >= 28 && x <= 30) ||
        (x >= 55 && x <= 57) ||
        (x >= 85 && x <= 87 && worldId >= 3));

    if (!isGap) {
      // Ground block
      blocks.push({
        id: `b_${blockIdCounter++}`,
        x: x * blockSize,
        y: groundY * blockSize,
        width: blockSize,
        height: blockSize,
        type: 'GROUND',
      });
      // Sub-ground block
      blocks.push({
        id: `b_${blockIdCounter++}`,
        x: x * blockSize,
        y: (groundY + 1) * blockSize,
        width: blockSize,
        height: blockSize,
        type: 'GROUND',
      });
    }
  }

  // Helper to place Question Block
  const addQuestionBlock = (x: number, y: number, itemInside: Item['type']) => {
    blocks.push({
      id: `b_q_${blockIdCounter++}`,
      x: x * blockSize,
      y: y * blockSize,
      width: blockSize,
      height: blockSize,
      type: 'QUESTION',
      itemInside,
    });
  };

  // Helper to place Bricks
  const addBrickBlock = (x: number, y: number, type: Block['type'] = 'BRICK') => {
    blocks.push({
      id: `b_br_${blockIdCounter++}`,
      x: x * blockSize,
      y: y * blockSize,
      width: blockSize,
      height: blockSize,
      type,
    });
  };

  // Helper to place Patrol Enemy
  const addEnemy = (x: number, y: number, type: Enemy['type'], patrolDist = 120) => {
    const enemyWidth = type === 'TANK' ? 44 : 28;
    const enemyHeight = type === 'TANK' ? 32 : 36;
    enemies.push({
      id: `e_${enemyIdCounter++}`,
      type,
      x: x * blockSize,
      y: y * blockSize - (enemyHeight - blockSize),
      width: enemyWidth,
      height: enemyHeight,
      vx: type === 'TANK' ? 0.8 : 1.2,
      vy: 0,
      facing: 'left',
      health: type === 'TANK' ? 3 : 1,
      isDefeated: false,
      minX: x * blockSize - patrolDist,
      maxX: x * blockSize + patrolDist,
    });
  };

  // Helper to place Flag Coin collectible
  const addFlagCoin = (x: number, y: number) => {
    items.push({
      id: `item_coin_${itemIdCounter++}`,
      type: 'FLAG_COIN',
      x: x * blockSize + 6,
      y: y * blockSize + 6,
      width: 20,
      height: 20,
      vx: 0,
      vy: 0,
      isGrounded: true,
      collected: false,
    });
  };

  // 2. Custom World Placements
  if (worldId === 1) {
    // World 1: Khởi Nghĩa Tiền Đề (Bắc Giang, Hải Dương, Hà Tĩnh, Quảng Nam)
    // Structure 1
    addQuestionBlock(8, groundY - 4, 'POTATO_BREAD'); // 🍠 Củ khoai / bánh mì
    addBrickBlock(7, groundY - 4, 'CRATE');
    addBrickBlock(9, groundY - 4, 'CRATE');
    addFlagCoin(8, groundY - 5);

    // Enemy 1
    addEnemy(15, groundY - 1, 'PATROL_GUARD', 100);

    // Structure 2
    addBrickBlock(20, groundY - 3, 'CRATE');
    addQuestionBlock(21, groundY - 3, 'LEAFLET_DOC'); // 📜 Tờ truyền đơn
    addBrickBlock(22, groundY - 3, 'CRATE');
    addFlagCoin(21, groundY - 4);

    // Tank Enemy
    addEnemy(35, groundY - 1, 'TANK', 80);

    // Platform over gap
    for (let px = 27; px <= 31; px += 2) {
      addBrickBlock(px, groundY - 3, 'PLATFORM');
    }

    // High reward structure
    addQuestionBlock(45, groundY - 4, 'STAR'); // ⭐️ Ngôi sao vàng bất tử!
    addBrickBlock(44, groundY - 4);
    addBrickBlock(46, groundY - 4);
    addFlagCoin(45, groundY - 6);

    addEnemy(50, groundY - 1, 'PATROL_GUARD', 120);
    addEnemy(65, groundY - 1, 'TANK', 100);

    // Mid-level steps
    for (let step = 0; step < 4; step++) {
      for (let sy = 0; sy <= step; sy++) {
        addBrickBlock(70 + step, groundY - 1 - sy, 'CRATE');
      }
    }

    // Flag coins line
    for (let cx = 80; cx <= 90; cx += 2) {
      addFlagCoin(cx, groundY - 3);
    }

    addEnemy(85, groundY - 1, 'PATROL_GUARD', 100);
    addEnemy(98, groundY - 1, 'TANK', 120);

  } else if (worldId === 2) {
    // World 2: Cơn Bão Tại Thủ Đô (Hà Nội)
    addQuestionBlock(6, groundY - 4, 'POTATO_BREAD');
    addBrickBlock(5, groundY - 4);
    addBrickBlock(7, groundY - 4);

    addEnemy(12, groundY - 1, 'PATROL_GUARD');
    addEnemy(18, groundY - 1, 'TANK');

    // Hanoi Red Brick Bridges
    for (let bx = 22; bx <= 26; bx++) {
      addBrickBlock(bx, groundY - 3);
    }
    addQuestionBlock(24, groundY - 6, 'LEAFLET_DOC');
    addFlagCoin(24, groundY - 7);

    // High Platforms
    addQuestionBlock(40, groundY - 5, 'STAR');
    addFlagCoin(39, groundY - 5);
    addFlagCoin(41, groundY - 5);

    addEnemy(48, groundY - 1, 'TANK');
    addEnemy(62, groundY - 1, 'PATROL_GUARD');
    addEnemy(75, groundY - 1, 'TANK');

    // Hanoi Opera House stairs
    for (let step = 0; step < 5; step++) {
      for (let sy = 0; sy <= step; sy++) {
        addBrickBlock(88 + step, groundY - 1 - sy);
      }
    }

  } else if (worldId === 3) {
    // World 3: Sóng Lừng Trung Bộ (Huế)
    // Royal Stone Bricks & Perfume River platforms
    addQuestionBlock(7, groundY - 4, 'POTATO_BREAD');
    addBrickBlock(6, groundY - 4, 'ROYAL_STONE');
    addBrickBlock(8, groundY - 4, 'ROYAL_STONE');

    addEnemy(14, groundY - 1, 'PATROL_GUARD');
    addEnemy(22, groundY - 1, 'TANK');

    // Floating river stepping stones
    addBrickBlock(28, groundY - 2, 'ROYAL_STONE');
    addBrickBlock(30, groundY - 4, 'ROYAL_STONE');
    addQuestionBlock(30, groundY - 7, 'LEAFLET_DOC');
    addBrickBlock(32, groundY - 2, 'ROYAL_STONE');

    addEnemy(42, groundY - 1, 'PATROL_GUARD');
    addEnemy(50, groundY - 1, 'TANK');

    // Ngo Mon Citadel Castle wall
    for (let cx = 60; cx <= 70; cx++) {
      addBrickBlock(cx, groundY - 3, 'ROYAL_STONE');
    }
    addQuestionBlock(65, groundY - 6, 'STAR');

    for (let cx = 80; cx <= 90; cx += 2) {
      addFlagCoin(cx, groundY - 2);
    }

    addEnemy(85, groundY - 1, 'TANK');
    addEnemy(95, groundY - 1, 'PATROL_GUARD');

  } else if (worldId === 4) {
    // World 4: Nam Bộ Đột Phá (Sài Gòn - Gia Định)
    addQuestionBlock(6, groundY - 4, 'POTATO_BREAD');
    addEnemy(12, groundY - 1, 'TANK');
    addEnemy(18, groundY - 1, 'PATROL_GUARD');

    // High Urban Girders
    for (let gx = 25; gx <= 32; gx++) {
      addBrickBlock(gx, groundY - 4);
    }
    addQuestionBlock(28, groundY - 7, 'LEAFLET_DOC');

    // Heavy Armored Tank Garrison
    addEnemy(40, groundY - 1, 'TANK');
    addEnemy(46, groundY - 1, 'TANK');

    addQuestionBlock(55, groundY - 5, 'STAR');
    for (let fx = 53; fx <= 57; fx++) {
      addFlagCoin(fx, groundY - 6);
    }

    addEnemy(68, groundY - 1, 'PATROL_GUARD');
    addEnemy(78, groundY - 1, 'TANK');
    addEnemy(88, groundY - 1, 'TANK');

    // City Hall steps
    for (let step = 0; step < 5; step++) {
      for (let sy = 0; sy <= step; sy++) {
        addBrickBlock(98 + step, groundY - 1 - sy);
      }
    }

  } else if (worldId === 5) {
    // World Final: Ngày Độc Lập (Quảng Trường Ba Đình)
    // Victory Celebration level with lots of stars, flags, potato breads!
    for (let bx = 8; bx <= widthInBlocks - 15; bx += 4) {
      addQuestionBlock(bx, groundY - 4, bx % 8 === 0 ? 'STAR' : (bx % 6 === 0 ? 'POTATO_BREAD' : 'LEAFLET_DOC'));
      addFlagCoin(bx, groundY - 5);
      addFlagCoin(bx + 1, groundY - 5);
    }

    // Ba Dinh ceremonial steps leading to rostrum
    for (let step = 0; step < 6; step++) {
      for (let sy = 0; sy <= step; sy++) {
        addBrickBlock(widthInBlocks - 25 + step, groundY - 1 - sy, 'ROYAL_STONE');
      }
    }
  }

  // 3. Flagpole / Lễ Đài Podium Placement at Level End
  const flagpoleX = (widthInBlocks - 8) * blockSize;
  const flagpoleY = (groundY - 7) * blockSize;
  const flagpole = {
    x: flagpoleX,
    y: flagpoleY,
    width: 24,
    height: 7 * blockSize,
  };

  const playerStart: Vector2D = {
    x: 2 * blockSize,
    y: (groundY - 2) * blockSize,
  };

  return {
    worldId,
    widthInBlocks,
    heightInBlocks,
    blocks,
    enemies,
    items,
    flagpole,
    playerStart,
  };
}
