var Player = function(image){
	this.image = image;

	this.name = 'Thomas';

	this.height = this.image.height;
	this.width = this.image.width;

	this.y = game.canvas.height - this.height - 10;
	this.x = game.canvas.width / 2 - this.width / 2;

	this.lives = 5; // lives in the game
	this.missiles = []; // values for the bullets

	this.speed = 7; // speed of the ship
	this.fireRate = 250; // fire rate of the ship
}
	Player.prototype.update = function() {
		// Update player's missiles
		for (var i = 0; i < this.missiles.length; i++) 
        {
			this.missiles[i].update();
			// Delete missile if missile is out of sight
			if (this.missiles[i].y + this.missiles[i].height < 0) {
				game.player.missiles.splice(i, 1);
			}
		};
	}
	Player.prototype.draw = function(context) 
    {
		context.drawImage(this.image, this.x, this.y);
		this.drawLives(context);
        
		context.fillStyle = "black";
		for (missile in this.missiles)
        {
			this.missiles[missile].draw(context);
		}
	}

	Player.prototype.drawLives = function(context) 
    {
		for (var i = 0; i < this.lives; i++) 
        {
			context.drawImage(this.image, 20  + i * (this.width / 2 + 10), 620, this.width / 2, this.height / 2);
		};
	}

    // controls how far left you can move
	Player.prototype.moveLeft = function() 
    {
		this.x = Math.max(0, this.x - this.speed);
	}

    // controls how far right you can move
	Player.prototype.moveRight = function() 
    {
		this.x = Math.min(game.width - this.width - 0, this.x + this.speed);
	}

    // allows you to shoot at the enemies
	Player.prototype.shoot = function() 
    {
		if (this.missiles.length < 1 || this.missiles[this.missiles.length - 1].y < this.y - this.height - this.fireRate) {
			this.missiles[this.missiles.length] = new PlayerMissile(this);
		}
	}

    // What happens if you get hit by the enemy
	Player.prototype.die = function() {
		this.lives--; // life goes down
        this.score - 100; // score drops by 100

		// brings up the game over screen
		if (this.lives == 0) 
        {
			// Gameover
			game.state = 'dead';
		} else {
            
			// continue playing
		}

	}