module.exports = {
  animations: {
    idle: {
      frames: [...Array(32).keys()],
      frameRate: 6
    }
  },
  spriteSheets: {
    OWLN_margaret_tinkering: {
      fileName: 'NPC_Margaret_Tinkering_Sprite.png',
      frameDimensions: {
        width: 72,
        height: 72,
      },
    },
  },
  properties: {
    sprite: {
      defaultFrameIndex: 0,
      spriteSheet: 'OWLN_margaret_tinkering',
      layers: [],
    },
  },
  events: {
    onMapDidLoad: (self, event, world) => {
      self.playAnimation('idle', true);
    },
    onPlayerDidInteract: (self, event, world) => {
      if (event.target.type === 'margaret_tinkering') {
        world.startConversation('margaretDefault', 'margaretNeutral.png');
      }
    },
  }
};
