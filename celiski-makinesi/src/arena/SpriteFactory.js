/**
 * PacMan Sprite Factory - Programatik Pixel Art
 * Pac-Man tarzı karakterler ve harita elemanları
 */
const S = 2; // pixel scale

function createCanvas(w = 32, h = 32) {
  const c = document.createElement('canvas');
  c.width = w * S; c.height = h * S;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  return { canvas: c, ctx };
}

function px(ctx, x, y, col) {
  ctx.fillStyle = col;
  ctx.fillRect(x * S, y * S, S, S);
}

function rect(ctx, x, y, w, h, col) {
  ctx.fillStyle = col;
  ctx.fillRect(x * S, y * S, w * S, h * S);
}

function fillCircle(ctx, cx, cy, r, col) {
  ctx.fillStyle = col;
  for (let y = -r; y <= r; y++)
    for (let x = -r; x <= r; x++)
      if (x * x + y * y <= r * r) px(ctx, cx + x, cy + y, col);
}

// ─── PAC-MAN (Mucit Çocuk - yuvarlak, ağzı açılıp kapanan) ───
function drawPacPlayer(ctx, dir, frame) {
  const bodyCol = '#FFD700';
  const mouthOpen = frame % 2 === 0;
  
  fillCircle(ctx, 16, 16, 12, bodyCol);
  
  // Göz
  if (dir !== 'left') px(ctx, 19, 10, '#1A1A2E');
  if (dir !== 'right') px(ctx, 13, 10, '#1A1A2E');
  
  // Kırmızı şapka (bere)
  rect(ctx, 8, 3, 16, 5, '#E74C3C');
  rect(ctx, 10, 1, 12, 3, '#C0392B');
  fillCircle(ctx, 16, 2, 2, '#FFFFFF');
  
  // Ağız (Pac-Man tarzı)
  if (mouthOpen) {
    ctx.fillStyle = '#0D1B2A';
    const angles = { right: 0, down: Math.PI/2, left: Math.PI, up: -Math.PI/2 };
    const a = angles[dir] || 0;
    ctx.save();
    ctx.translate(16 * S, 16 * S);
    ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(14 * S, -8 * S);
    ctx.lineTo(14 * S, 8 * S);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

// ─── HAYALETLER (Kardan Adam Tarzı) ─────────────────────
function drawGhost(ctx, variant, frame) {
  const colors = ['#E74C3C', '#FF69B4', '#00BCD4', '#FF9800', '#9C27B0'];
  const col = colors[variant % 5];
  const wobble = frame % 2 === 0 ? 0 : 1;
  
  // Gövde (klasik hayalet şekli)
  fillCircle(ctx, 16, 12, 10, col);
  rect(ctx, 6, 12, 20, 12, col);
  
  // Alt dalgalı kısım
  for (let i = 0; i < 5; i++) {
    const x = 6 + i * 4;
    const h = (i + wobble) % 2 === 0 ? 3 : 0;
    rect(ctx, x, 24, 4, 4 - h, col);
  }
  
  // Gözler
  rect(ctx, 11, 9, 4, 5, '#FFFFFF');
  rect(ctx, 18, 9, 4, 5, '#FFFFFF');
  px(ctx, 13, 11, '#1A1A2E'); px(ctx, 14, 11, '#1A1A2E');
  px(ctx, 20, 11, '#1A1A2E'); px(ctx, 21, 11, '#1A1A2E');
  
  // Atkı
  rect(ctx, 6, 16, 20, 2, '#FFFFFF');
}

// ─── KORKMUŞ HAYALET ────────────────────────────────────
function drawScaredGhost(ctx, frame) {
  const col = frame % 2 === 0 ? '#2196F3' : '#FFFFFF';
  fillCircle(ctx, 16, 12, 10, col);
  rect(ctx, 6, 12, 20, 12, col);
  for (let i = 0; i < 5; i++) {
    const x = 6 + i * 4;
    rect(ctx, x, 24, 4, (i + frame) % 2 === 0 ? 1 : 4, col);
  }
  // Korkmuş yüz
  px(ctx, 11, 10, '#FFFFFF'); px(ctx, 20, 10, '#FFFFFF');
  for (let i = 0; i < 8; i++) {
    px(ctx, 9 + i * 2, 18 + (i % 2), '#FFFFFF');
  }
}

// ─── TOPLANAN NOKTALAR ──────────────────────────────────
function drawDot(ctx) {
  fillCircle(ctx, 8, 8, 3, '#FFD700');
  px(ctx, 6, 6, '#FFF9C4');
}

function drawPowerPellet(ctx, frame) {
  const r = 5 + (frame % 2);
  fillCircle(ctx, 8, 8, r, '#76FF03');
  fillCircle(ctx, 8, 8, r - 2, '#B2FF59');
  px(ctx, 5, 5, '#FFFFFF');
}

// ─── MEYVE BONUSLARI ────────────────────────────────────
function drawFruit(ctx, type) {
  if (type === 0) { // Kiraz
    fillCircle(ctx, 12, 18, 5, '#E74C3C');
    fillCircle(ctx, 20, 18, 5, '#E74C3C');
    rect(ctx, 14, 8, 2, 10, '#4CAF50');
    rect(ctx, 18, 10, 2, 8, '#4CAF50');
    rect(ctx, 14, 6, 6, 3, '#66BB6A');
  } else { // Yıldız
    fillCircle(ctx, 16, 16, 6, '#FFD700');
    px(ctx, 16, 8, '#FFD700'); px(ctx, 16, 24, '#FFD700');
    px(ctx, 8, 16, '#FFD700'); px(ctx, 24, 16, '#FFD700');
    fillCircle(ctx, 16, 16, 3, '#FFF9C4');
  }
}

// ─── DUVAR ──────────────────────────────────────────────
function drawWall(ctx) {
  rect(ctx, 0, 0, 32, 32, '#1565C0');
  rect(ctx, 1, 1, 30, 30, '#1976D2');
  rect(ctx, 2, 2, 28, 28, '#1E88E5');
  // Kenar parıltısı
  rect(ctx, 0, 0, 32, 1, '#42A5F5');
  rect(ctx, 0, 0, 1, 32, '#42A5F5');
}

function drawFloor(ctx) {
  rect(ctx, 0, 0, 32, 32, '#0D1B2A');
  // Hafif doku
  for (let i = 0; i < 3; i++) {
    px(ctx, 5 + i * 10, 5 + i * 8, '#152238');
  }
}

// ─── ANA EXPORT ─────────────────────────────────────────
export function generateSprites(scene) {
  // Zemin
  const floor = createCanvas(); drawFloor(floor.ctx);
  scene.textures.addCanvas('floor', floor.canvas);
  
  // Duvar
  const wall = createCanvas(); drawWall(wall.ctx);
  scene.textures.addCanvas('wall', wall.canvas);

  // Pac-Man oyuncu (4 yön × 2 frame)
  ['down','up','left','right'].forEach(dir => {
    for (let f = 0; f < 2; f++) {
      const { canvas, ctx } = createCanvas();
      drawPacPlayer(ctx, dir, f);
      scene.textures.addCanvas(`player_${dir}_${f}`, canvas);
    }
  });

  // Hayaletler (5 varyant × 2 frame)
  for (let v = 0; v < 5; v++) {
    for (let f = 0; f < 2; f++) {
      const { canvas, ctx } = createCanvas();
      drawGhost(ctx, v, f);
      scene.textures.addCanvas(`ghost_${v}_${f}`, canvas);
    }
  }

  // Korkmuş hayalet
  for (let f = 0; f < 2; f++) {
    const { canvas, ctx } = createCanvas();
    drawScaredGhost(ctx, f);
    scene.textures.addCanvas(`ghost_scared_${f}`, canvas);
  }

  // Nokta
  const dot = createCanvas(16, 16); drawDot(dot.ctx);
  scene.textures.addCanvas('dot', dot.canvas);

  // Güç hapı
  for (let f = 0; f < 2; f++) {
    const pp = createCanvas(16, 16); drawPowerPellet(pp.ctx, f);
    scene.textures.addCanvas(`power_${f}`, pp.canvas);
  }

  // Meyveler
  for (let t = 0; t < 2; t++) {
    const fr = createCanvas(); drawFruit(fr.ctx, t);
    scene.textures.addCanvas(`fruit_${t}`, fr.canvas);
  }
}
