var EnemyMissile = function(enemy) 
{
	this.width = 15;
	this.height = 12;
	this.x = enemy.x + enemy.width / 2 - this.width / 3;
	this.y = enemy.y + this.height;

	this.speed = 5;
}
	EnemyMissile.prototype.update = function() 
    {
		this.y += this.speed;
		if (this.collide(game.player)) 
        {
			game.player.die();
			this.y = 1500; 
		}
	}

    // draws the enemy invaders bullets
	EnemyMissile.prototype.draw = function(context)
    {
	 	context.beginPath();
	    context.moveTo(this.x, this.y);
	    context.lineTo(this.x, this.y + this.height);
	    context.lineTo(this.x + this.width, this.y + this.height);
	    context.lineTo(this.x + this.width, this.y);
	    context.fillStyle = "Purple";
	    context.fill();
	}

    // collision of the bullets - small chance of cancelling invader and spaceship bullets if collide together
	EnemyMissile.prototype.collide = function(player) 
    {
		horizontalCollision = (this.x < player.x && player.x < (this.x + this.width)) || 
								(this.x < player.x + player.width && player.x + player.width < this.x + this.width) ||
								(player.x < this.x && this.x + this.width < player.x + player.width)
		verticalCollision = (this.y < player.y && player.y < this.y + this.height) || 
								(this.y < player.y + player.height && player.y + player.height < this.y + this.height) ||
								(player.y < this.y && this.y + this.height < player.y + player.height)

		return horizontalCollision && verticalCollision;
	}