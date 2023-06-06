module.exports = {
  animations: {
    idle: {
      frames: [0, 1, 2, 3, 4, 5, 6, 7],
      frameRate: 4,
    },
  },
  spriteSheets: {
    twilioQuestOpenSourceBrush: {
      fileName: "BurnableBrushAnim.png",
      frameDimensions: {
        width: 24,
        height: 24,
      },
    },
    twilioQuestFlameThrowerLeftRight: {
      fileName: "Operator_ToolEffects_LeftRight.png",
      frameDimensions: {
        width: 64,
        height: 32,
      },
    },
    twilioQuestFlameThrowerUpDown: {
      fileName: "Operator_ToolEffects_UpDown.png",
      frameDimensions: {
        width: 32,
        height: 64,
      },
    },
  },
  events: {},
  properties: {
    sprite: {
      defaultFrameIndex: 0,
      spriteSheet: "twilioQuestOpenSourceBrush",
      layers: [],
    },
    idleAnimations: {
      animations: {
        idle: 100,
      },
      minIdleTime: 1000,
      maxIdleTime: 3000,
    },
  },
};
