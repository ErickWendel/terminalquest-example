const onPlayerDidInteract = require('../../scripts/npcPlayerDidInteract');
const onMapDidLoad = require('../../scripts/ghostMapDidLoad');
const onConversationDidEnd = require('../../scripts/ghostConversationDidEnd');

module.exports = {
  spriteSheets: {
    tq_python_ghost3: {
      fileName: 'NPC_PythonicGhost3.png',
      frameDimensions: {
        width: 32,
        height: 32,
      },
    },
  },
  animations: {
    idle: {
      frames: [0, 1, 2, 3],
      frameRate: 4,
    },
  },
  events: {
    onPlayerDidInteract,
    onMapDidLoad,
    onConversationDidEnd,
  },
  properties: {
    sprite: {
      defaultFrameIndex: 0,
      spriteSheet: 'tq_python_ghost3',
    },
    idleAnimations: {
      animations: { idle: 100 },
      minIdleTime: 2000,
      maxIdleTime: 4000,
    },
  },
};
