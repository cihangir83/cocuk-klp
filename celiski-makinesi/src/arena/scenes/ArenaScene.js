import * as Phaser from 'phaser';
import { generateSprites } from '../SpriteFactory';

const TILE = 32;
const PLAYER_SPEED = 120; // piksel/saniye
const GHOST_SPEED = 100;
const SCARED_DURATION = 8000;

// 31x22 Harita (1=Duvar, 2=Nokta, 3=Güç, 0=Boş, 4=Hayalet Evi)
const MAP = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1],
  [1,3,1,1,1,1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,3,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,2,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,2,1,1,1,1,1,1,1,1],
  [0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,2,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,2,1,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,2,0,0,1,4,4,4,4,4,4,4,4,4,1,0,0,2,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,2,0,0,1,4,4,4,4,4,4,4,4,4,1,0,0,2,1,1,1,1,1,1,1,1],
  [0,0,0,0,0,1,2,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,2,1,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1],
  [1,3,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,3,1],
  [1,1,1,1,2,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const ROWS = MAP.length;
const COLS = MAP[0].length;

export default class PacManScene extends Phaser.Scene {
  constructor() {
    super('PacManScene');
  }

  init(data) {
    this.lives = data.lives || 3;
    this.onBackToWorkshop = data.onBackToWorkshop || (() => {});
    this.score = 0;
    this.dotsLeft = 0;
    this.level = 1;
    this.gameOver = false;
    this.isMobile = false;

    // Oyuncu state
    this.pState = {
      gx: 15, gy: 16,     // Grid koordinatları
      x: 0, y: 0,         // Piksel koordinatları
      dir: 'none',        // Gittiği yön
      nextDir: 'none',    // Kullanıcının basılı tuttuğu yön
      animFrame: 0, timer: 0
    };

    // Hayaletler
    this.ghosts = [];
  }

  create() {
    generateSprites(this);
    this.isMobile = !this.sys.game.device.os.desktop;

    const worldW = COLS * TILE;
    const worldH = ROWS * TILE;
    
    // Arka plan
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        this.add.image(c * TILE + TILE/2, r * TILE + TILE/2, 'floor');
        if (MAP[r][c] === 1) this.add.image(c * TILE + TILE/2, r * TILE + TILE/2, 'wall');
      }
    }

    // Arcade fizik grupları (sadece yemler ve karakterlerin overlap kontrolü için)
    this.dotsGroup = this.physics.add.group();
    this.powerGroup = this.physics.add.group();
    
    this.buildItems();

    // Oyuncu Sprite
    this.pState.x = this.pState.gx * TILE + TILE/2;
    this.pState.y = this.pState.gy * TILE + TILE/2;
    this.player = this.physics.add.sprite(this.pState.x, this.pState.y, 'player_right_0').setDepth(10);
    this.player.body.setSize(16, 16); // Overlap için küçük

    this.cameras.main.setBounds(0, 0, worldW, worldH);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // Hayalet Sprite'ları
    const ghostSpawns = [{x:13,y:10}, {x:15,y:10}, {x:17,y:10}, {x:14,y:11}, {x:16,y:11}];
    this.ghostGroup = this.physics.add.group();
    
    ghostSpawns.forEach((sp, i) => {
      const gSprite = this.ghostGroup.create(sp.x * TILE + TILE/2, sp.y * TILE + TILE/2, `ghost_${i}_0`);
      gSprite.setDepth(9);
      gSprite.body.setSize(16, 16);
      
      this.ghosts.push({
        sprite: gSprite,
        gx: sp.x, gy: sp.y,
        x: sp.x * TILE + TILE/2, y: sp.y * TILE + TILE/2,
        dir: 'up',
        variant: i,
        scared: false,
        timer: 0, frame: 0,
        active: true
      });
    });

    // Çarpışmalar (Overlap)
    this.physics.add.overlap(this.player, this.dotsGroup, this.eatDot, null, this);
    this.physics.add.overlap(this.player, this.powerGroup, this.eatPower, null, this);
    this.physics.add.overlap(this.player, this.ghostGroup, this.touchGhost, null, this);

    // Kontroller
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({up:'W',down:'S',left:'A',right:'D'});

    if (this.isMobile) {
      this.input.on('pointerdown', (p) => { this.swipeStart = {x:p.x, y:p.y}; });
      this.input.on('pointerup', (p) => {
        if (!this.swipeStart) return;
        const dx = p.x - this.swipeStart.x;
        const dy = p.y - this.swipeStart.y;
        if (Math.abs(dx) > Math.abs(dy)) this.pState.nextDir = dx > 0 ? 'right' : 'left';
        else this.pState.nextDir = dy > 0 ? 'down' : 'up';
      });
    }

    this.scene.launch('UIScene', { lives: this.lives, score: this.score, level: this.level, dotsLeft: this.dotsLeft, isMobile: this.isMobile });
    try { this.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { this.audioCtx = null; }
  }

  buildItems() {
    this.dotsLeft = 0;
    this.dotsGroup.clear(true, true);
    this.powerGroup.clear(true, true);
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = c * TILE + TILE/2;
        const y = r * TILE + TILE/2;
        if (MAP[r][c] === 2) {
          this.dotsGroup.create(x, y, 'dot').body.setSize(10, 10);
          this.dotsLeft++;
        } else if (MAP[r][c] === 3) {
          const p = this.powerGroup.create(x, y, 'power_0');
          p.body.setSize(16, 16);
          this.tweens.add({ targets: p, alpha: 0.3, duration: 300, yoyo: true, repeat: -1 });
          this.dotsLeft++;
        }
      }
    }
  }

  playSound(type) {
    if (!this.audioCtx) return;
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    gain.gain.value = 0.1;
    if (type === 'eat') {
      osc.frequency.value = 1200; osc.type = 'sine';
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'die') {
      osc.frequency.value = 300; osc.type = 'sawtooth';
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.5);
    }
  }

  eatDot(player, dot) {
    dot.destroy();
    this.dotsLeft--; this.score += 10;
    this.playSound('eat');
    this.updateUI();
    if (this.dotsLeft <= 0) this.levelComplete();
  }

  eatPower(player, pellet) {
    pellet.destroy();
    this.dotsLeft--; this.score += 50;
    this.playSound('eat');
    this.ghosts.forEach(g => { if (g.active) g.scared = true; });
    if (this.ghostScaredTimer) this.ghostScaredTimer.remove();
    this.ghostScaredTimer = this.time.delayedCall(SCARED_DURATION, () => {
      this.ghosts.forEach(g => g.scared = false);
    });
    this.updateUI();
    if (this.dotsLeft <= 0) this.levelComplete();
  }

  touchGhost(player, ghostSprite) {
    const g = this.ghosts.find(gx => gx.sprite === ghostSprite);
    if (!g || !g.active) return;
    
    if (g.scared) {
      g.scared = false; g.active = false;
      ghostSprite.setVisible(false); ghostSprite.body.enable = false;
      this.score += 200; this.updateUI();
      this.time.delayedCall(3000, () => {
        g.gx = 15; g.gy = 10;
        g.x = g.gx * TILE + TILE/2; g.y = g.gy * TILE + TILE/2;
        ghostSprite.setPosition(g.x, g.y);
        ghostSprite.setVisible(true); ghostSprite.body.enable = true;
        g.active = true;
      });
    } else {
      this.playerDie();
    }
  }

  playerDie() {
    this.lives--;
    this.playSound('die');
    this.updateUI();
    if (this.lives <= 0) {
      this.gameOver = true;
      this.scene.get('UIScene').showGameOver(this.score, false);
    } else {
      this.gameOver = true; // Geçici duraklatma
      this.player.setTint(0xff0000);
      this.time.delayedCall(1000, () => {
        this.player.clearTint();
        this.pState.gx = 15; this.pState.gy = 16;
        this.pState.x = 15 * TILE + TILE/2; this.pState.y = 16 * TILE + TILE/2;
        this.pState.dir = 'none'; this.pState.nextDir = 'none';
        this.player.setPosition(this.pState.x, this.pState.y);
        
        const sp = [{x:13,y:10},{x:15,y:10},{x:17,y:10},{x:14,y:11},{x:16,y:11}];
        this.ghosts.forEach((g, i) => {
          g.gx = sp[i].x; g.gy = sp[i].y;
          g.x = g.gx * TILE + TILE/2; g.y = g.gy * TILE + TILE/2;
          g.sprite.setPosition(g.x, g.y);
          g.scared = false;
        });
        this.gameOver = false;
      });
    }
  }

  levelComplete() {
    this.level++;
    this.gameOver = true;
    this.scene.get('UIScene').showLevelComplete(this.level);
    this.time.delayedCall(2000, () => {
      this.buildItems();
      this.pState.gx = 15; this.pState.gy = 16;
      this.pState.x = 15 * TILE + TILE/2; this.pState.y = 16 * TILE + TILE/2;
      this.pState.dir = 'none'; this.pState.nextDir = 'none';
      this.player.setPosition(this.pState.x, this.pState.y);
      this.updateUI();
      this.gameOver = false;
    });
  }

  updateUI() {
    const ui = this.scene.get('UIScene');
    if (ui && ui.updateHUD) ui.updateHUD(this.lives, this.score, this.level, this.dotsLeft);
  }

  isWall(gx, gy) {
    if (gx < 0 || gx >= COLS || gy < 0 || gy >= ROWS) return false;
    return MAP[gy][gx] === 1;
  }

  // --- KUSURSUZ GRID HAREKET MOTORU ---
  moveEntity(ent, speed, delta, isPlayer) {
    const moveDist = (speed * delta) / 1000;
    const cx = ent.gx * TILE + TILE/2;
    const cy = ent.gy * TILE + TILE/2;

    // Tam merkezde miyiz?
    if (Math.abs(ent.x - cx) < 1 && Math.abs(ent.y - cy) < 1) {
      ent.x = cx; ent.y = cy; // Tam ortala
      
      // Oyuncuysa, önce nextDir'e dönebiliyor muyuz bakalım
      if (isPlayer && ent.nextDir !== 'none' && ent.nextDir !== ent.dir) {
        let nx = ent.gx, ny = ent.gy;
        if (ent.nextDir === 'left') nx--;
        if (ent.nextDir === 'right') nx++;
        if (ent.nextDir === 'up') ny--;
        if (ent.nextDir === 'down') ny++;
        if (!this.isWall(nx, ny)) {
          ent.dir = ent.nextDir;
        }
      }

      // Mevcut yönde önümüz açık mı?
      let forwardX = ent.gx, forwardY = ent.gy;
      if (ent.dir === 'left') forwardX--;
      if (ent.dir === 'right') forwardX++;
      if (ent.dir === 'up') forwardY--;
      if (ent.dir === 'down') forwardY++;

      if (this.isWall(forwardX, forwardY)) {
        ent.dir = 'none'; // Duvara çarptık, dur
        return;
      }
    }

    // Hareket et
    if (ent.dir === 'left') ent.x -= moveDist;
    if (ent.dir === 'right') ent.x += moveDist;
    if (ent.dir === 'up') ent.y -= moveDist;
    if (ent.dir === 'down') ent.y += moveDist;

    // Tünel efekti
    if (ent.x < 0) { ent.x = COLS * TILE; ent.gx = COLS - 1; }
    if (ent.x > COLS * TILE) { ent.x = 0; ent.gx = 0; }

    // Yeni ızgara konumunu hesapla
    ent.gx = Math.floor(ent.x / TILE);
    ent.gy = Math.floor(ent.y / TILE);
  }

  update(time, delta) {
    if (this.gameOver) return;

    // Tuşları oku
    if (this.cursors.left.isDown || this.wasd.left.isDown) this.pState.nextDir = 'left';
    else if (this.cursors.right.isDown || this.wasd.right.isDown) this.pState.nextDir = 'right';
    else if (this.cursors.up.isDown || this.wasd.up.isDown) this.pState.nextDir = 'up';
    else if (this.cursors.down.isDown || this.wasd.down.isDown) this.pState.nextDir = 'down';

    // Oyuncuyu hareket ettir
    this.moveEntity(this.pState, PLAYER_SPEED, delta, true);
    this.player.setPosition(this.pState.x, this.pState.y);

    // Animasyon (Oyuncu)
    this.pState.timer += delta;
    if (this.pState.timer > 120) {
      this.pState.timer = 0;
      this.pState.animFrame = (this.pState.animFrame + 1) % 2;
      const d = this.pState.dir !== 'none' ? this.pState.dir : (this.pState.nextDir !== 'none' ? this.pState.nextDir : 'right');
      this.player.setTexture(`player_${d}_${this.pState.animFrame}`);
    }

    // Hayaletler
    this.ghosts.forEach(g => {
      if (!g.active) return;
      
      // Hayalet merkezdeyse karar ver
      const cx = g.gx * TILE + TILE/2;
      const cy = g.gy * TILE + TILE/2;
      if (Math.abs(g.x - cx) < 1 && Math.abs(g.y - cy) < 1) {
        g.x = cx; g.y = cy;
        
        const opposites = { left:'right', right:'left', up:'down', down:'up', none:'none' };
        const dirs = ['up', 'left', 'down', 'right'].filter(d => d !== opposites[g.dir]);
        
        // Gidebileceği geçerli yollar
        const valid = dirs.filter(d => {
          let nx = g.gx, ny = g.gy;
          if (d === 'left') nx--; if (d === 'right') nx++;
          if (d === 'up') ny--; if (d === 'down') ny++;
          return !this.isWall(nx, ny);
        });

        if (valid.length > 0) {
          // Basit AI: Rastgele veya oyuncuya doğru
          if (g.scared) {
            g.dir = valid[Math.floor(Math.random() * valid.length)];
          } else {
            // Oyuncuya olan mesafeye göre en iyisini seç
            let best = valid[0];
            let bestD = Infinity;
            valid.forEach(d => {
              let nx = g.gx, ny = g.gy;
              if (d === 'left') nx--; if (d === 'right') nx++;
              if (d === 'up') ny--; if (d === 'down') ny++;
              const dist = Math.abs(nx - this.pState.gx) + Math.abs(ny - this.pState.gy);
              if (dist < bestD) { bestD = dist; best = d; }
            });
            // %30 rastgelelik
            if (Math.random() < 0.3) g.dir = valid[Math.floor(Math.random() * valid.length)];
            else g.dir = best;
          }
        } else {
          g.dir = opposites[g.dir]; // Çıkmaz sokak, geri dön
        }
      }

      this.moveEntity(g, g.scared ? GHOST_SPEED * 0.6 : GHOST_SPEED + this.level * 2, delta, false);
      g.sprite.setPosition(g.x, g.y);

      // Hayalet Animasyon
      g.timer += delta;
      if (g.timer > 200) {
        g.timer = 0; g.frame = (g.frame + 1) % 2;
        g.sprite.setTexture(g.scared ? `ghost_scared_${g.frame}` : `ghost_${g.variant}_${g.frame}`);
      }
    });
  }
}
