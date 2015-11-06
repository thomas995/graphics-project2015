var PlayerMissile = function(player) 
   {
	this.width =12; // width of the bullet 
	this.height = 8; // height of the bullet
	this.x = player.x + player.width / 2 - this.width / 3;
	this.y = player.y - this.height;

	this.speed = 15; // speed of the bullet
    } 

	PlayerMissile.prototype.update = function() 
    {
		this.y -= this.speed;
		// check if there is collision with the bullet
		for (var i = 0; i < game.enemies.length; i++) 
        {
			if (this.collide(game.enemies[i]) && !game.enemies[i].dead)
            {
				// Remove enemy and bullet
				game.enemies[i].die();
				this.y = -1;
			}
		};
		
	} 

    // draws the bullet being fired from the enemies
	PlayerMissile.prototype.draw = function(context) 
    {
	 	context.beginPath();
	    context.moveTo(this.x, this.y);
	    context.lineTo(this.x, this.y - this.height);
	    context.lineTo(this.x + this.width, this.y - this.height);
	    context.lineTo(this.x + this.width, this.y);
	    context.fillStyle = "Green";
	    context.fill(); // draws the bullet for the player
	} 

    // controls the collision on the bullets
	PlayerMissile.prototype.collide = function(enemy)
    {
        // Allows for collision on the x axis
        
		horizontalCollision = (this.x < enemy.x && enemy.x < (this.x + this.width)) ||
            // stop them disappearing on wrong side
								(this.x < enemy.x + enemy.width && enemy.x + enemy.width < this.x + this.width) || 
            // stop them disappearing from wrong side
								(enemy.x < this.x && this.x + this.width < enemy.x + enemy.width) 
        
        // Allows for collision on the y axis
		verticalCollision = (this.y < enemy.y && enemy.y < this.y + this.height) || 
            // does the opposite on the other axis
				            (this.y < enemy.y + enemy.height && enemy.y + enemy.height < this.y + this.height) || 
            
				             (enemy.y < this.y && this.y + this.height < enemy.y + enemy.height)

		return horizontalCollision && verticalCollision;
	}
