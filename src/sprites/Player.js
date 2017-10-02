import Phaser from 'phaser-ce';

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game = game;

    this.anchor.setTo(0.5);

    // We need to enable physics on the player
    game.physics.arcade.enable(this);

    // Player physics properties. Give the little guy a slight bounce.
    this.body.bounce.y = 0.2;
    this.body.gravity.y = 500;
    this.body.collideWorldBounds = true;

    // Our two animations, walking left and right.
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);
  }

  update() {
    const cursors = this.game.input.keyboard.createCursorKeys();

    //  Reset the players velocity (movement)
    this.body.velocity.x = 0;

    if (cursors.left.isDown) {
      //  Move to the left
      this.body.velocity.x = -150;
      this.animations.play('left');
    } else if (cursors.right.isDown) {
      //  Move to the right
      this.body.velocity.x = 150;
      this.animations.play('right');
    } else {
      //  Stand still
      this.animations.stop();
      this.frame = 4;
    }
  }
}
