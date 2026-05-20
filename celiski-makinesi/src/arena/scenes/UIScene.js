import * as Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor() { super('UIScene'); }

  init(data) {
    this.lives = data.lives || 3;
    this.score = data.score || 0;
    this.level = data.level || 1;
    this.dotsLeft = data.dotsLeft || 0;
    this.isMobile = data.isMobile || false;
  }

  create() {
    const w = this.cameras.main.width;
    const pxFont = { fontFamily: '"Press Start 2P", monospace', fontSize: '12px', color: '#FFFFFF' };

    // Üst bar
    this.add.rectangle(w / 2, 20, w, 40, 0x000000, 0.7).setScrollFactor(0).setDepth(100);

    // Can
    this.livesText = this.add.text(16, 10, '', { ...pxFont, fontSize: '16px' }).setScrollFactor(0).setDepth(101);

    // Skor
    this.scoreText = this.add.text(w / 2, 10, `SKOR: 0`, pxFont).setScrollFactor(0).setOrigin(0.5, 0).setDepth(101);

    // Seviye
    this.levelText = this.add.text(w - 16, 10, `LV.1`, pxFont).setScrollFactor(0).setOrigin(1, 0).setDepth(101);

    // Kalan nokta
    this.dotsText = this.add.text(w - 16, 26, '', { ...pxFont, fontSize: '9px', color: '#FFD700' }).setScrollFactor(0).setOrigin(1, 0).setDepth(101);

    // Mobil D-Pad
    if (this.isMobile) {
      const bx = 80, by = this.cameras.main.height - 100, bs = 50;
      const btnStyle = { fontSize: '28px' };
      const makeBtn = (x, y, emoji, dir) => {
        const b = this.add.text(x, y, emoji, btnStyle).setScrollFactor(0).setDepth(200).setOrigin(0.5).setInteractive();
        b.on('pointerdown', () => {
          const arena = this.scene.get('PacManScene');
          if (arena) arena.nextDir = dir;
        });
      };
      makeBtn(bx, by - bs, '⬆️', 'up');
      makeBtn(bx, by + bs, '⬇️', 'down');
      makeBtn(bx - bs, by, '⬅️', 'left');
      makeBtn(bx + bs, by, '➡️', 'right');
    }

    this.refreshLives();
  }

  refreshLives() {
    let s = '';
    for (let i = 0; i < this.lives; i++) s += '❤️';
    this.livesText.setText(s);
  }

  updateHUD(lives, score, level, dotsLeft) {
    this.lives = lives;
    this.score = score;
    this.level = level;
    this.dotsLeft = dotsLeft;
    this.refreshLives();
    this.scoreText.setText(`SKOR: ${score}`);
    this.levelText.setText(`LV.${level}`);
    this.dotsText.setText(`${dotsLeft} nokta`);
  }

  showLevelComplete(newLevel) {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;
    const txt = this.add.text(w/2, h/2, `🎉 SEVİYE ${newLevel}!`, {
      fontFamily: '"Press Start 2P", monospace', fontSize: '28px', color: '#FFD700', align: 'center'
    }).setScrollFactor(0).setOrigin(0.5).setDepth(300);
    this.tweens.add({ targets: txt, scale: 1.3, duration: 300, yoyo: true, repeat: 2, onComplete: () => txt.destroy() });
  }

  showGameOver(score, won) {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;
    const pxFont = { fontFamily: '"Press Start 2P", monospace', align: 'center' };

    this.add.rectangle(w/2, h/2, w, h, 0x000000, 0.85).setScrollFactor(0).setDepth(300);

    this.add.text(w/2, h*0.2, won ? '🏆 TEBRİKLER!' : '💀 OYUN BİTTİ!', {
      ...pxFont, fontSize: '24px', color: '#FFD700'
    }).setScrollFactor(0).setOrigin(0.5).setDepth(301);

    this.add.text(w/2, h*0.38, `SKOR: ${score}`, {
      ...pxFont, fontSize: '18px', color: '#4FC3F7'
    }).setScrollFactor(0).setOrigin(0.5).setDepth(301);

    this.add.text(w/2, h*0.48, 'Daha fazla can için atölyede\nçelişki çöz!', {
      ...pxFont, fontSize: '10px', color: '#B0BEC5', lineSpacing: 6
    }).setScrollFactor(0).setOrigin(0.5).setDepth(301);

    // Atölyeye dön
    const btn1 = this.add.rectangle(w/2, h*0.62, 300, 45, 0x2196F3).setScrollFactor(0).setDepth(301).setInteractive({useHandCursor:true});
    this.add.text(w/2, h*0.62, '🔧 ATÖLYEye DÖN', { ...pxFont, fontSize: '12px', color:'#FFF' }).setScrollFactor(0).setOrigin(0.5).setDepth(302);
    btn1.on('pointerover', () => btn1.setFillStyle(0x1976D2));
    btn1.on('pointerout', () => btn1.setFillStyle(0x2196F3));
    btn1.on('pointerdown', () => {
      const arena = this.scene.get('PacManScene');
      if (arena && arena.onBackToWorkshop) arena.onBackToWorkshop();
    });

    // Tekrar oyna
    const btn2 = this.add.rectangle(w/2, h*0.75, 300, 45, 0x4CAF50).setScrollFactor(0).setDepth(301).setInteractive({useHandCursor:true});
    this.add.text(w/2, h*0.75, '🔄 YENİDEN OYNA', { ...pxFont, fontSize: '12px', color:'#FFF' }).setScrollFactor(0).setOrigin(0.5).setDepth(302);
    btn2.on('pointerover', () => btn2.setFillStyle(0x388E3C));
    btn2.on('pointerout', () => btn2.setFillStyle(0x4CAF50));
    btn2.on('pointerdown', () => {
      const arena = this.scene.get('PacManScene');
      this.scene.stop('UIScene');
      this.scene.stop('PacManScene');
      if (arena) {
        this.scene.start('PacManScene', {
          lives: Math.max(1, arena.lives),
          onBackToWorkshop: arena.onBackToWorkshop
        });
      }
    });
  }
}
