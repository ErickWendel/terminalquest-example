const conversationOnInteract = require("../../scripts/conversationOnInteract");

module.exports = {
  animations: {
    idle: {
      frames: [0, 1, 2, 3],
      frameRate: 4,
    },
  },
  spriteSheets: {
    twilioquestApiAcademyTeacherDungeon: {
      fileName: "NPC_Teacher_Dungeon.png",
      frameDimensions: {
        width: 32,
        height: 32,
      },
    },
  },
  events: {
    onPlayerDidInteract: conversationOnInteract,
  },
  properties: {
    sprite: {
      defaultFrameIndex: 0,
      spriteSheet: "twilioquestApiAcademyTeacherDungeon",
      layers: [],
    },
    idleAnimations: {
      animations: {
        idle: 100,
      },
      minIdleTime: 2000,
      maxIdleTime: 5000,
    },
  },
};
