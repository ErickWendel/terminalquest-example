const onPlayerDidInteract = require("../../scripts/npcPlayerDidInteract");

module.exports = {
  spriteSheets: {
    tq_python_van_possum: {
      fileName: "NPC_ToledoVanPossum.png",
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
  },
  properties: {
    sprite: {
      defaultFrameIndex: 0,
      spriteSheet: "tq_python_van_possum",
    },
    idleAnimations: {
      animations: { idle: 100 },
      minIdleTime: 2000,
      maxIdleTime: 4000,
    },
  },
};
