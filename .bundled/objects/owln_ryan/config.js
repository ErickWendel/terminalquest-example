const STATE_KEY = 'com.twilioquest.owls_nest';

function toggleAnimations(self, event, world) {
  const levelState = world.getState(STATE_KEY) || {};
  if (levelState.fredricThreatReceived) {
    self.playAnimation('worried', true);
  } else {
    self.playAnimation('idle', true);
  }
}

async function onTriggerAreaWasEntered(self, event, world) {
  const worldState = world.getState(STATE_KEY) || {};
  
  // Only trigger on the approproate prompt and if the threat has not yet
  // been received
  if (
    event.target.key !== 'ryanDialogTrigger' ||
    worldState.ryanInitialGreeting
  ) {
    return;
  }
  
  // Temporarily disable player movement and reveal Fredric!
  world.disablePlayerMovement();
  self.playAnimation('worried', true);
  await world.tweenCameraToPosition({
    x: 404,
    y: 743,
  });
  await world.wait(1000);
  world.startConversation('ryanBehindFire', 'ryanNeutral.png');
  worldState.ryanInitialGreeting = true;
  self.setState({
    cameraMoved: true
  });

  world.setState(STATE_KEY, worldState);
}

async function onConversationDidEnd(self, event, world) {
  const levelState = world.getState(STATE_KEY) || {};

  if (levelState.fredricThreatReceived) {
    self.playAnimation('worried', true);
  }

  if (
    event.npc && event.npc.conversation === 'ryanBehindFire' &&
    self.state.cameraMoved
  ) {
    await world.wait(1000);
    await world.tweenCameraToPosition({
      x: 96,
      y: 384,
    });
    await world.wait(1000);
    await world.tweenCameraToPlayer();
    world.enablePlayerMovement();
    self.setState({
      cameraMoved: false
    });
  }

  if (
    event.npc && event.npc.conversation === 'ryanDefault'
  ) {
    world.disablePlayerMovement();
    await world.wait(500);
    await world.tweenCameraToPosition({
      x: 794,
      y: 500,
    });
    await world.wait(1000);
    await world.tweenCameraToPlayer();
    world.enablePlayerMovement();
  }
}

function onPlayerDidInteract(self, event, world) {
  const worldState = world.getState(STATE_KEY) || {};

  if (
    event.target.type === 'owln_ryan'
  ) {
    // Once the player interacts with Ryan, they have received the codes
    worldState.ryanSaved = true;
    world.startConversation('ryanDefault', 'ryanNeutral.png');
  }
  
  world.setState(STATE_KEY, worldState);
}

module.exports = {
  animations: {
    idle: {
      frames: [
        8, 9, 10, 11, 12, 13, // shift left
    
        25, 24, 24,
        25, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        25, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        25, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, // blink
    
        8, 9, 10, 11, 12, 13, // shift left
    
        25, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        25, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        25, 24, 24, 24, 24, 24, 24, 24,
        25, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, // blink
    
        0, 1, 2, 3, 4, 5, // wipe sweat
    
        25, 24, 24, 24, 24, 24, 24, 24,
        25, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        25, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        25, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, // blink
    
        16, 17, 18, 19, 20, 21, // shift right
    
        25, 24, 24,
        25, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        25, 24, 24, 24, 24, 24,
        25, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, // blink
    
        0, 1, 2, 3, 4, 5, // wipe sweat
      ],
      frameRate: 6
    },
    worried: {
      frames: Array.from({ length: 32 }, (_, i) => i + 88),
      frameRate: 8
    }
  },
  spriteSheets: {
    OWLN_ryan: {
      fileName: 'ryan.png',
      frameDimensions: {
        width: 32,
        height: 32,
      },
    },
  },
  properties: {
    sprite: {
      defaultFrameIndex: 0,
      spriteSheet: 'OWLN_ryan',
      layers: [],
    },
  },
  events: {
    onMapDidLoad: toggleAnimations,
    onPlayerDidInteract,
    onTriggerAreaWasEntered,
    onConversationDidEnd,
  }
};
