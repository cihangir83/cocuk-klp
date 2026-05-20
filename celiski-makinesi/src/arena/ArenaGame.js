import * as Phaser from 'phaser';
import PacManScene from './scenes/ArenaScene';
import UIScene from './scenes/UIScene';

export function createArenaGame(containerId, lives, onBackToWorkshop) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const config = {
    type: Phaser.AUTO,
    parent: containerId,
    width: container.clientWidth || 800,
    height: container.clientHeight || 600,
    backgroundColor: '#0D1B2A',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: [PacManScene, UIScene],
    pixelArt: true,
    roundPixels: true,
  };

  const game = new Phaser.Game(config);

  game.scene.start('PacManScene', {
    lives,
    onBackToWorkshop: () => {
      game.destroy(true);
      if (onBackToWorkshop) onBackToWorkshop();
    }
  });

  return game;
}
