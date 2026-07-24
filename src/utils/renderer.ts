import {
  Block,
  Enemy,
  FloatingText,
  Item,
  Particle,
  Player,
  Projectile,
  Rect,
  WorldDefinition,
} from '../types';

/**
 * 2D Canvas Renderer for Mario Cat 1945
 * Renders cute Mèo Mũ Cối, tanks, patrol guards, collectibles, and historic backgrounds.
 */

export function renderBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cameraX: number,
  world: WorldDefinition
) {
  // 1. Sky Gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, world.theme.skyGradient[0]);
  gradient.addColorStop(1, world.theme.skyGradient[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 2. Parallax Distant Background Elements
  ctx.save();

  // Sun or Dawn light glow
  if (world.id === 1) {
    // Dawn Sun in Bac Giang sunrise
    const sunX = 200 - cameraX * 0.1;
    ctx.fillStyle = 'rgba(255, 215, 0, 0.4)';
    ctx.beginPath();
    ctx.arc(sunX, 100, 70, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 235, 150, 0.7)';
    ctx.beginPath();
    ctx.arc(sunX, 100, 45, 0, Math.PI * 2);
    ctx.fill();

    // Distant Bamboo & Village silhouettes
    ctx.fillStyle = '#2d5a27';
    for (let i = -100; i < width + 1000; i += 180) {
      const bx = i - cameraX * 0.2;
      // Bamboo cluster
      for (let b = 0; b < 5; b++) {
        ctx.fillRect(bx + b * 12, height - 180, 4, 120);
        ctx.beginPath();
        ctx.arc(bx + b * 12 + 2, height - 180, 18, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (world.id === 2) {
    // World 2: Hanoi Opera House & Old Quarter silhouettes
    ctx.fillStyle = 'rgba(120, 30, 30, 0.35)';
    for (let i = -100; i < width + 1000; i += 300) {
      const hx = i - cameraX * 0.25;
      // Hanoi Opera House roof outline
      ctx.beginPath();
      ctx.moveTo(hx, height - 80);
      ctx.lineTo(hx + 40, height - 160);
      ctx.lineTo(hx + 120, height - 160);
      ctx.lineTo(hx + 160, height - 80);
      ctx.closePath();
      ctx.fill();
    }

    // Cheering crowd flags silhouettes in background
    ctx.fillStyle = 'rgba(218, 37, 29, 0.5)';
    for (let i = 0; i < width + 500; i += 60) {
      const fx = i - cameraX * 0.4;
      ctx.fillRect(fx, height - 110, 2, 30);
      ctx.beginPath();
      ctx.arc(fx + 6, height - 105, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (world.id === 3) {
    // World 3: Hue Citadel / Ngo Mon Gate silhouette & Perfume River reflection
    ctx.fillStyle = 'rgba(78, 50, 20, 0.4)';
    for (let i = -100; i < width + 1000; i += 400) {
      const nx = i - cameraX * 0.2;
      // Ngo Mon Gate silhouette
      ctx.fillRect(nx, height - 180, 180, 100);
      ctx.fillRect(nx + 30, height - 220, 120, 40);
      ctx.fillRect(nx + 60, height - 250, 60, 30);
    }

    // Perfume River water band
    ctx.fillStyle = 'rgba(100, 149, 237, 0.3)';
    ctx.fillRect(0, height - 70, width, 25);
  } else if (world.id === 4) {
    // World 4: Saigon City Hall & Streetlights
    ctx.fillStyle = 'rgba(30, 50, 90, 0.4)';
    for (let i = -100; i < width + 1000; i += 350) {
      const sx = i - cameraX * 0.2;
      // City hall dome & clock tower outline
      ctx.fillRect(sx, height - 170, 140, 90);
      ctx.fillRect(sx + 50, height - 220, 40, 50);
      ctx.beginPath();
      ctx.arc(sx + 70, height - 220, 20, Math.PI, 0);
      ctx.fill();
    }
  } else if (world.id === 5) {
    // World 5: Ba Dinh Square Rostrum & Grand Flagpole
    const bx = 300 - cameraX * 0.15;
    ctx.fillStyle = 'rgba(241, 196, 15, 0.4)';
    ctx.fillRect(bx, height - 240, 260, 160);
    // Rostrum Pillars
    ctx.fillStyle = 'rgba(218, 37, 29, 0.6)';
    ctx.fillRect(bx + 20, height - 210, 220, 130);

    // Festive balloons in sky
    const colors = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db'];
    for (let b = 0; b < 15; b++) {
      const balX = (b * 120 + 50) - cameraX * 0.08;
      const balY = 80 + Math.sin(Date.now() * 0.002 + b) * 15;
      ctx.fillStyle = colors[b % colors.length];
      ctx.beginPath();
      ctx.arc(balX, balY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(balX, balY + 12);
      ctx.lineTo(balX, balY + 25);
      ctx.stroke();
    }
  }

  ctx.restore();
}

/**
 * Renders Blocks & Terrain
 */
export function renderBlock(
  ctx: CanvasRenderingContext2D,
  block: Block,
  world: WorldDefinition
) {
  ctx.save();
  const yOffset = block.bounceOffset || 0;
  const drawY = block.y + yOffset;

  if (block.type === 'GROUND') {
    // Ground block
    ctx.fillStyle = world.theme.groundColor;
    ctx.fillRect(block.x, drawY, block.width, block.height);

    // Top grass border
    ctx.fillStyle = '#689f38';
    ctx.fillRect(block.x, drawY, block.width, 4);

    // Texture detail dots
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(block.x + 4, drawY + 8, 6, 6);
    ctx.fillRect(block.x + 18, drawY + 16, 6, 6);

    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.strokeRect(block.x, drawY, block.width, block.height);
  } else if (block.type === 'BRICK' || block.type === 'CRATE' || block.type === 'ROYAL_STONE') {
    ctx.fillStyle = world.theme.brickColor;
    ctx.fillRect(block.x, drawY, block.width, block.height);

    // Brick pattern lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(block.x + 1, drawY + 1, block.width - 2, block.height - 2);

    // Inner detail
    ctx.beginPath();
    ctx.moveTo(block.x, drawY + block.height / 2);
    ctx.lineTo(block.x + block.width, drawY + block.height / 2);
    ctx.stroke();

    if (block.type === 'CRATE') {
      // Wood cross
      ctx.beginPath();
      ctx.moveTo(block.x + 4, drawY + 4);
      ctx.lineTo(block.x + block.width - 4, drawY + block.height - 4);
      ctx.moveTo(block.x + block.width - 4, drawY + 4);
      ctx.lineTo(block.x + 4, drawY + block.height - 4);
      ctx.stroke();
    }
  } else if (block.type === 'QUESTION') {
    // Gold star block
    ctx.fillStyle = '#f39c12';
    ctx.fillRect(block.x, drawY, block.width, block.height);

    // Golden border
    ctx.strokeStyle = '#f1c40f';
    ctx.lineWidth = 2;
    ctx.strokeRect(block.x + 1, drawY + 1, block.width - 2, block.height - 2);

    // Star icon inside
    drawStar(ctx, block.x + block.width / 2, drawY + block.height / 2, 5, 8, 4, '#da251d');
  } else if (block.type === 'USED_BLOCK') {
    ctx.fillStyle = '#7f8c8d';
    ctx.fillRect(block.x, drawY, block.width, block.height);
    ctx.strokeStyle = '#2c3e50';
    ctx.strokeRect(block.x, drawY, block.width, block.height);
  } else if (block.type === 'PLATFORM') {
    ctx.fillStyle = '#d35400';
    ctx.fillRect(block.x, drawY, block.width, block.height / 2);
    ctx.fillStyle = '#f39c12';
    ctx.fillRect(block.x, drawY, block.width, 3);
  }

  ctx.restore();
}

/**
 * Renders Mèo Mũ Cối (Mario Cat)
 */
export function renderPlayer(ctx: CanvasRenderingContext2D, player: Player) {
  ctx.save();

  const isFlipped = player.facing === 'left';
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;

  ctx.translate(centerX, centerY);
  if (isFlipped) {
    ctx.scale(-1, 1);
  }

  const w = player.width;
  const h = player.height;

  // Invincible Star Glow Effect
  if (player.invincibleTimer > 0) {
    const time = Date.now() * 0.02;
    ctx.shadowColor = `hsl(${(time * 50) % 360}, 100%, 50%)`;
    ctx.shadowBlur = 15;
  }

  // Flash when damaged/respawning
  if (player.invincibleTimer > 0 && Math.floor(Date.now() / 100) % 2 === 0) {
    ctx.globalAlpha = 0.7;
  }

  // 1. Cat Tail
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-w * 0.3, h * 0.2);
  ctx.quadraticCurveTo(-w * 0.6, h * 0.1, -w * 0.5, -h * 0.1);
  ctx.stroke();

  // 2. Body (White Cat Fur)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(0, h * 0.15, w * 0.38, h * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();

  // Red Scarf / Collar
  ctx.fillStyle = '#da251d';
  ctx.fillRect(-w * 0.3, -h * 0.1, w * 0.6, 6);

  // 3. Cat Head
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, -h * 0.22, w * 0.42, 0, Math.PI * 2);
  ctx.fill();

  // Pink Ears
  ctx.fillStyle = '#ff9ff3';
  // Left ear
  ctx.beginPath();
  ctx.moveTo(-w * 0.35, -h * 0.4);
  ctx.lineTo(-w * 0.2, -h * 0.6);
  ctx.lineTo(-w * 0.05, -h * 0.45);
  ctx.fill();
  // Right ear
  ctx.beginPath();
  ctx.moveTo(w * 0.05, -h * 0.45);
  ctx.lineTo(w * 0.2, -h * 0.6);
  ctx.lineTo(w * 0.35, -h * 0.4);
  ctx.fill();

  // Eyes (Big Sparkling Cat Eyes)
  ctx.fillStyle = '#2c3e50';
  ctx.beginPath();
  ctx.arc(w * 0.12, -h * 0.25, 4, 0, Math.PI * 2);
  ctx.arc(-w * 0.12, -h * 0.25, 4, 0, Math.PI * 2);
  ctx.fill();

  // Eye highlights
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(w * 0.14, -h * 0.27, 1.5, 0, Math.PI * 2);
  ctx.arc(-w * 0.10, -h * 0.27, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Cute Nose & Whiskers
  ctx.fillStyle = '#ff7675';
  ctx.beginPath();
  ctx.arc(0, -h * 0.18, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Whiskers
  ctx.strokeStyle = '#b2bec3';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w * 0.15, -h * 0.18);
  ctx.lineTo(w * 0.4, -h * 0.2);
  ctx.moveTo(w * 0.15, -h * 0.15);
  ctx.lineTo(w * 0.4, -h * 0.12);
  ctx.moveTo(-w * 0.15, -h * 0.18);
  ctx.lineTo(-w * 0.4, -h * 0.2);
  ctx.moveTo(-w * 0.15, -h * 0.15);
  ctx.lineTo(-w * 0.4, -h * 0.12);
  ctx.stroke();

  // 4. Mũ Cối (Green Pith Helmet with Gold Star)
  ctx.fillStyle = '#2e7d32'; // Green Pith Helmet
  ctx.beginPath();
  ctx.arc(0, -h * 0.32, w * 0.45, Math.PI, 0); // Top dome
  ctx.fill();

  // Helmet Brim
  ctx.fillStyle = '#1b5e20';
  ctx.fillRect(-w * 0.5, -h * 0.32, w, 5);

  // Yellow Star Emblem on Helmet
  drawStar(ctx, 0, -h * 0.42, 5, 5, 2.5, '#ffff00');

  // 5. Weapon (AK47 or Leaflet pouch)
  if (player.powerUp === 'LEAFLET') {
    // Leaflet Satchel
    ctx.fillStyle = '#f39c12';
    ctx.fillRect(w * 0.1, 0, 12, 14);
    // Leaflet paper popping out
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(w * 0.14, -4, 8, 8);
  } else {
    // AK47 Rifle
    ctx.fillStyle = '#795548'; // Wood stock
    ctx.fillRect(w * 0.05, h * 0.05, 12, 4);
    ctx.fillStyle = '#37474f'; // Metal barrel
    ctx.fillRect(w * 0.2, h * 0.03, 14, 3);
    // Curved Magazine
    ctx.fillStyle = '#263238';
    ctx.beginPath();
    ctx.arc(w * 0.2, h * 0.15, 5, 0, Math.PI);
    ctx.fill();
  }

  // 6. Walking Feet
  const walkPhase = Math.sin(Date.now() * 0.015);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-w * 0.18 + walkPhase * 4, h * 0.42, 5, 0, Math.PI * 2);
  ctx.arc(w * 0.18 - walkPhase * 4, h * 0.42, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Renders Enemies (Patrol Guards & Armored Tanks)
 */
export function renderEnemy(ctx: CanvasRenderingContext2D, enemy: Enemy) {
  ctx.save();

  if (enemy.isDefeated) {
    ctx.globalAlpha = enemy.defeatAnimationTimer ? enemy.defeatAnimationTimer / 20 : 0.5;
  }

  const isFlipped = enemy.facing === 'left';
  const centerX = enemy.x + enemy.width / 2;
  const centerY = enemy.y + enemy.height / 2;

  ctx.translate(centerX, centerY);
  if (isFlipped) {
    ctx.scale(-1, 1);
  }

  const w = enemy.width;
  const h = enemy.height;

  if (enemy.type === 'PATROL_GUARD') {
    // Colonial Patrol Guard
    // Body / Uniform
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(-w * 0.35, -h * 0.1, w * 0.7, h * 0.5);

    // Head
    ctx.fillStyle = '#ffcc80';
    ctx.beginPath();
    ctx.arc(0, -h * 0.25, w * 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Foreign Helmet
    ctx.fillStyle = '#3e2723';
    ctx.beginPath();
    ctx.arc(0, -h * 0.3, w * 0.35, Math.PI, 0);
    ctx.fill();

    // Rifle
    ctx.fillStyle = '#1a237e';
    ctx.fillRect(w * 0.1, -h * 0.1, 16, 3);

    // Stunned status
    if (enemy.stunnedTimer && enemy.stunnedTimer > 0) {
      ctx.fillStyle = '#f1c40f';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('💫', -6, -h * 0.5);
    }

  } else if (enemy.type === 'TANK') {
    // Xe tăng quân địch (Armored Tank)
    // Tank Body
    ctx.fillStyle = '#37474f';
    ctx.fillRect(-w * 0.48, -h * 0.1, w * 0.96, h * 0.4);

    // Tank Turret Dome
    ctx.fillStyle = '#263238';
    ctx.beginPath();
    ctx.arc(0, -h * 0.1, w * 0.3, Math.PI, 0);
    ctx.fill();

    // Cannon Barrel
    ctx.fillStyle = '#102027';
    ctx.fillRect(w * 0.2, -h * 0.22, w * 0.35, 6);

    // Tank Tracks / Wheels
    ctx.fillStyle = '#1c313a';
    ctx.fillRect(-w * 0.48, h * 0.25, w * 0.96, h * 0.2);

    ctx.fillStyle = '#b0bec5';
    for (let i = -w * 0.4; i < w * 0.4; i += 10) {
      ctx.beginPath();
      ctx.arc(i, h * 0.35, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Health bar for tank
    if (enemy.health < 3 && !enemy.isDefeated) {
      ctx.fillStyle = '#e74c3c';
      ctx.fillRect(-w * 0.4, -h * 0.6, w * 0.8, 4);
      ctx.fillStyle = '#2ecc71';
      ctx.fillRect(-w * 0.4, -h * 0.6, (w * 0.8 * enemy.health) / 3, 4);
    }
  }

  ctx.restore();
}

/**
 * Renders Collectible Items & Power-ups
 */
export function renderItem(ctx: CanvasRenderingContext2D, item: Item) {
  if (item.collected) return;

  ctx.save();
  const centerX = item.x + item.width / 2;
  const centerY = item.y + item.height / 2;

  // Float animation
  const bounce = Math.sin(Date.now() * 0.005) * 3;

  ctx.translate(centerX, centerY + bounce);

  if (item.type === 'POTATO_BREAD') {
    // 🍠 Sweet Potato / Bread
    ctx.fillStyle = '#8e44ad'; // Purple sweet potato skin
    ctx.beginPath();
    ctx.ellipse(0, 0, 12, 8, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Sweet potato flesh inside
    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    ctx.arc(4, -1, 5, 0, Math.PI * 2);
    ctx.fill();

  } else if (item.type === 'LEAFLET_DOC') {
    // 📜 Tờ Truyền Đơn Cứu Quốc
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-10, -12, 20, 24);

    ctx.strokeStyle = '#da251d';
    ctx.strokeRect(-10, -12, 20, 24);

    // Revolutionary text lines
    ctx.fillStyle = '#da251d';
    ctx.fillRect(-7, -8, 14, 3);
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(-7, -2, 14, 2);
    ctx.fillRect(-7, 2, 14, 2);
    ctx.fillRect(-7, 6, 10, 2);

  } else if (item.type === 'STAR') {
    // ⭐️ Ngôi Sao Vàng
    drawStar(ctx, 0, 0, 5, 12, 6, '#f1c40f');

  } else if (item.type === 'FLAG_COIN') {
    // 🇻🇳 Cờ Đỏ Sao Vàng / Gold Flag Coin
    ctx.fillStyle = '#da251d';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();

    drawStar(ctx, 0, 0, 5, 5, 2.5, '#ffff00');
  }

  ctx.restore();
}

/**
 * Renders Projectiles (Leaflets / Bullets)
 */
export function renderProjectile(ctx: CanvasRenderingContext2D, p: Projectile) {
  ctx.save();
  ctx.translate(p.x + p.width / 2, p.y + p.height / 2);
  ctx.rotate(p.rotation);

  if (p.isFromPlayer) {
    // Revolutionary Leaflet flying
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
    ctx.fillStyle = '#da251d';
    ctx.fillRect(-p.width / 2 + 2, -p.height / 2 + 2, p.width - 4, 3);
  } else {
    // Tank cannon bullet
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Renders Flagpole / Podium at level end
 */
export function renderFlagpole(ctx: CanvasRenderingContext2D, flagpole: Rect) {
  ctx.save();

  // Pole
  ctx.fillStyle = '#b2bec3';
  ctx.fillRect(flagpole.x, flagpole.y, 6, flagpole.height);

  // Top Brass Sphere
  ctx.fillStyle = '#f1c40f';
  ctx.beginPath();
  ctx.arc(flagpole.x + 3, flagpole.y - 4, 8, 0, Math.PI * 2);
  ctx.fill();

  // Red Flag with Gold Star waving
  const wave = Math.sin(Date.now() * 0.006) * 4;
  ctx.fillStyle = '#da251d';
  ctx.beginPath();
  ctx.moveTo(flagpole.x + 6, flagpole.y + 10);
  ctx.lineTo(flagpole.x + 50, flagpole.y + 15 + wave);
  ctx.lineTo(flagpole.x + 50, flagpole.y + 45 + wave);
  ctx.lineTo(flagpole.x + 6, flagpole.y + 40);
  ctx.closePath();
  ctx.fill();

  // Gold Star on Flag
  drawStar(ctx, flagpole.x + 28, flagpole.y + 28 + wave * 0.5, 5, 7, 3.5, '#ffff00');

  ctx.restore();
}

/**
 * Helper to draw a star
 */
function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number,
  color: string
) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);

  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }

  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

/**
 * Render Particles & Floating Texts
 */
export function renderParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  particles.forEach((p) => {
    ctx.save();
    ctx.globalAlpha = p.life / p.maxLife;
    ctx.fillStyle = p.color;

    if (p.shape === 'star') {
      drawStar(ctx, p.x, p.y, 5, p.size, p.size / 2, p.color);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });
}

export function renderFloatingTexts(ctx: CanvasRenderingContext2D, texts: FloatingText[]) {
  texts.forEach((ft) => {
    ctx.save();
    ctx.globalAlpha = ft.life / ft.maxLife;
    ctx.fillStyle = ft.color;
    ctx.font = 'bold 16px sans-serif';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 4;
    ctx.fillText(ft.text, ft.x, ft.y);
    ctx.restore();
  });
}
