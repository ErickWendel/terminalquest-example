const STATE_KEY = 'com.twilioquest.owls_nest';

function toggleAnimation(self, event, world) {
  const levelState = world.getState(STATE_KEY) || {};
  if (levelState.fredricThreatReceived && !levelState.missionComplete) {
    self.playAnimation('danger', true);
  } else {
    self.playAnimation('idle', true);
  }
}

module.exports = {
  animations: {
    idle: {
      frames: [0, 1, 2, 1, 2, 1],
      frameRate: 2
    },
    danger: {
      frames: [3, 4, 5],
      frameRate: 3
    }
  },
  spriteSheets: {
    OWLN_control_panel: {
      fileName: 'controls.png',
      frameDimensions: {
        width: 48,
        height: 48,
      },
    },
  },
  properties: {
    sprite: {
      defaultFrameIndex: 0,
      spriteSheet: 'OWLN_control_panel',
      layers: [],
    },
  },
  events: {
    onMapDidLoad: toggleAnimation,
    onConversationDidEnd: toggleAnimation,
    onPlayerDidInteract: async (self, event, world) => {
      if (event.target.type !== 'fog_owl_controls') {
        return;
      }

      const levelState = world.getState(STATE_KEY) || {};

      if (levelState.missionComplete) {
        world.showNotification(`
          With the self destruct disabled, the Fog Owl shows green across the
          board. The Owl is ready to fly!
        `);
      } else if (levelState.ryanSaved) {
        world.showNotification(`
          You hear an automated voice over the PA system:<br/><br/>
          "Self destruct sequence disabled. Imminent destruction prevented.
          Have a nice day, and please drive home safely."
        `);
        await world.wait(5000);
        levelState.missionComplete = true;
        world.setState(STATE_KEY, levelState);
        window.warp('owls_nest', 'player_entry1', 'victory');
      } else if (levelState.fredricThreatReceived) {
        world.showNotification(`
          The console is completely inoperable. You need to <em>find Ryan
          and retrieve his access codes</em> to access the console and abort
          the Fog Owl's self-destruct sequence.
        `);
      } else {
        world.showNotification(`
          This console controls the Fog Owl's preflight routines. It looks like
          it's almost ready for launch.
        `);
      }
    }
  }
};
