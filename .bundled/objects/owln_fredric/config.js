const STATE_KEY = 'com.twilioquest.owls_nest';

function onMapDidLoad(self) {
  self.playAnimation('idle', true);
  self.sprite.body.enable = false;
  self.sprite.alpha = 0;
  self.sprite.scale.x = 2;
  self.sprite.scale.y = 2;
  self.sprite.tint = 0x059142;
}

async function onTriggerAreaWasEntered(self, event, world) {
  const worldState = world.getState(STATE_KEY) || {};
  
  // Only trigger on the approproate prompt and if the threat has not yet
  // been received
  if (
    event.target.key !== 'fredricDialogTrigger' ||
    worldState.fredricThreatReceived
  ) {
    return;
  }
  
  // Temporarily disable player movement and reveal Fredric!
  world.disablePlayerMovement();
  await world.tweenCameraToPosition({
    x: 696,
    y: 504,
  });
  world.playBackgroundMusic('unsettlingarea_59895b');
  world.__internals.level.game.add.tween(self.sprite).to({
    alpha: 0.8,
    tint: 0xffffff
  }, 2500, 'Linear', true);
  await world.wait(5000);
  world.startConversation('fredricDefault', 'fredricNeutral.png');
  worldState.fredricThreatReceived = true;

  world.setState(STATE_KEY, worldState);
}

async function onConversationDidEnd(self, event, world) {
  if (event.npc && event.npc.conversation === 'fredricDefault') {
    world.__internals.level.game.add.tween(self.sprite).to({
      alpha: 0,
      tint: 0x059142
    }, 2500, 'Linear', true);
    await world.wait(3000);
    await world.tweenCameraToPlayer();
    world.enablePlayerMovement();
    world.startConversation('kevinCedricAfterFredric', 'kevinNeutral.png');
  }
}

// Export object configuration
module.exports = {
  animations: {
    idle: {
      frames: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 
        20, 21, 22, 23
      ],
      frameRate: 4
    }
  },
  spriteSheets: {
    OWLN_fredric: {
      fileName: 'fredric_holo.png',
      frameDimensions: {
        width: 32,
        height: 32,
      },
    },
  },
  properties: {
    sprite: {
      defaultFrameIndex: 0,
      spriteSheet: 'OWLN_fredric',
      layers: [],
    },
  },
  events: {
    onMapDidLoad,
    onTriggerAreaWasEntered,
    onConversationDidEnd,
  }
};
