/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init() {
    if (__DEV__) {
      //  Advanced profiling, including the fps rate, fps min/max, suggestedFps and msMin/msMax are updated
      game.time.advancedTiming = true;
    }
  }

  preload() {
    this.game.load.image('mushroom', 'assets/images/mushroom2.png');
    this.game.load.image('nature', 'assets/images/nature_background.png');
    this.game.load.image('ground', 'assets/images/platform.png');
    this.game.load.image('star', 'assets/images/star.png');
    this.game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
  }

  create() {
    // We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // A simple background for our game
    this.game.add.sprite(0, 0, 'nature');

    // The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    // We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    // Here we create the ground.
    const ground = this.platforms.create(0, this.game.world.height - 98, 'ground');

    // Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 4);

    // This stops it from falling away when you jump on it
    ground.body.immovable = true;

    // Now let's create two ledges
    let ledge = this.platforms.create(400, 370, 'ground');

    ledge.body.immovable = true;

    ledge = this.platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;

    this.player = new Player({
      game: this.game,
      x: 32,
      y: 0,
      asset: 'dude'
    });
    this.game.add.existing(this.player);
  }

  update() {
    // Collide the player and the stars with the platforms
    const hitPlatform = game.physics.arcade.collide(this.player, this.platforms);
    const cursors = this.game.input.keyboard.createCursorKeys();

    // Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
      this.player.body.velocity.y = -250;
    }
  }

  render () {
    if (__DEV__) {
      const worldWidth = this.game.world.width;
      const worldHeight = this.game.world.height;

      // Add debug info for the player
      this.game.debug.spriteInfo(this.player, 10, worldHeight - 75);

      this.game.debug.text(`FPS: ${this.game.time.fps}`, worldWidth - 100, worldHeight - 75);
    }
  }
}
