var Enemy = function(image, x, y) {
	this.image = image;

	this.width = 36; //sets width of the invaders
	this.height = 31; //sets height of the invaders

	this.x = x + (80 - this.width) / 2;
	this.y = y;

	this.dead = false;
}

	Enemy.prototype.draw = function(context) 
    {
		context.drawImage(this.image, this.x, this.y, this.width, this.height); // draw the invaders
	}

	Enemy.prototype.update = function(context) 
    {
		if (this.dead) { return }

        // controls how far on the screen the invaders go before moving onto the next line
		if (this.x + this.speed() < 0 || this.x + this.width + this.speed() > game.width - 0) 
        {
			this.moveDown(true);
		}
		this.x += this.speed();
        
		// Fires the Bullets from the invaders at random
		if (Math.random() < EnemyMissileChance) { this.shoot(); }
	}

	Enemy.prototype.moveDown = function(iterate) 
    {
		this.y += this.height / 2;

		if (iterate === true) {
			game.enemySpeed = -1 * game.enemySpeed;
			if (game.enemySpeed > 0) { Math.min(game.enemySpeed += 0.1, 5); } else { Math.min(game.enemySpeed -= 0.1, -5); }
			for (var i = 0; i < game.enemies.length; i++) 
            {
				if (game.enemies[i] === this) { continue; }
				game.enemies[i].moveDown();
			};
		}
	}

	Enemy.prototype.shoot = function() 
    {
		if (game.missiles.length < 1 || game.missiles[game.missiles.length - 1].y > this.y + this.height + 50) 
        {
			game.missiles[game.missiles.length] = new EnemyMissile(this);
		}
	}

    // controls what happens when an enemy invader has been killed
	Enemy.prototype.die = function() 
    {
		this.dead = true;
		game.score += 100 + game.level; //score increases by 100 plus the level for each kill

		enemyAlive = false;
		for (var i = 0; i < game.enemies.length; i++) 
        {
			if (game.enemies[i].dead === false) 
            { 
				enemyAlive = true;
				break;
			}
		};
		if (enemyAlive === false) { game.nextLevel(); } // if dead then move to the next level
	}

    // controls enemies speed
	Enemy.prototype.speed = function() 
    {
		return game.enemySpeed;
	}
