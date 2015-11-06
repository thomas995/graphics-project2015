var EnemyMissileChance = 0.0005;
var leftPressed = false;
var rightPressed = false;
var spacePressed = false;

var Game = function() 
{
	this.canvas = document.getElementById('canvas');
	this.context = this.canvas.getContext("2d");

    // variables being used for the canvas
	this.width = this.canvas.width;
	this.height = this.canvas.height;

	this.images = {};
	this.sounds = {};
	this.totalResources = 2; // resources that will be used
	this.numResourcesLoaded = 0;
	this.fps = 60;
	this.totalFrames = 0;


	this.loadImage("player"); // images used
	this.loadImage("invader");

	this.interval = null;
};
	Game.prototype.initialize = function() 
    {
		this.player = new Player(this.images['player']);
		this.score = 0; // score at the beginning of the game
		this.level = 0; // level at the beginning of the game
        this.lives = 5; // total lives
		this.levelReset();

		this.enemySpeed = 0.5; // enemy speed

		this.state = 'playing';
		this.bindEvents();
		this.interval = setInterval(this.update, 350 / this.fps); // speed at which enemies shoot
	}

    // Keyboard controls for moving the players spaceship
	Game.prototype.bindEvents = function()
    {
		$(document).keydown(function(e) 
                            {
		  	var keyCode = e.keyCode || e.which;
		  	switch (keyCode) {
			    case 37: // left
			    	leftPressed = true;
			    	rightPressed = false;
			    break;
			    case 39: // right
			    	rightPressed = true;
			    	leftPressed = false;
			    break;
			    case 32: // Space
			    	spacePressed = true;
			    break;
		  	}
		});

		$(document).keyup(function(e)
        {
		  var keyCode = e.keyCode || e.which;
		  switch (keyCode) 
          {
			    case 37: // left
			    	leftPressed = false;
			    break;
			    case 39: // right
			    	rightPressed = false;
			    break;
			    case 32: // Space
			    	spacePressed = false;
			    break;
		  	}
		});
	};
    // loads the images from the images folder to the canvas to be used
	Game.prototype.loadImage = function(name) 
    {
		  this.images[name] = new Image();
		  this.images[name].onload = function() 
          { 
		      game.resourceLoaded();
		  }
          // Where the images are located
		  this.images[name].src = "images/" + name + ".png"; 
	}

    // Allows the resources used above to be loaded into the canvas
	Game.prototype.resourceLoaded = function() 
    {
		this.numResourcesLoaded += 1;
		if(this.numResourcesLoaded === this.totalResources)
        {
			this.initialize();
		}
	}

    // controls what is drawn onto the screen
	Game.prototype.redraw = function() 
    {
		this.canvas.width = this.canvas.width; // clears the canvas 
		this.player.draw(this.context); // Draw invaders onto the canvas
		for (var i = 0; i < this.enemies.length; i++) 
        {
			// Removes the enemies from the canvas after they are killed	
			if (game.enemies[i].dead) 
            {
				continue;				
			}
			this.enemies[i].draw(this.context);
		};
		// Draw the bullets the enemy's fire
		for (missile in this.missiles) 
        {
			this.missiles[missile].draw(this.context);
		}	
        
        // Draws the score for the game
		this.context.fillStyle="#195";
		this.context.lineStyle="#222";
		this.context.font="18px sans-serif";
        
		this.context.fillText("Score: " + this.score, 20, 20); // shows score
		this.context.fillText("Level: " + this.level, 130, 20); // show level
	}

    // creates the states in which the game can be run in
	Game.prototype.update = function() 
    {
		if (game.state === 'pause') { return; }
		if (game.state === 'dead') { game.updateDead() }
		if (game.state === 'playing') { game.play() }
	}

    //Displays the game over screen on the canvas when the players health reaches 0
	Game.prototype.updateDead = function() 
    {
		this.missiles = [];
		this.enemies = [];

		this.canvas.width = this.canvas.width; // clears the canvas 

		this.player.x = 320 - this.player.width;
		this.player.draw(this.context);
        
        this.context.fillStyle="#fff";
		this.context.lineStyle="#222";
		this.context.font="80px sans-serif";
		this.context.fillText("You Have Been Killed", 100, 150); // displays message when killed

		this.context.font="20px sans-serif";
		
		this.context.font="30px sans-serif";
		this.context.fillText("Revive using the button below", 120, 260); // displays message when killed
        
        this.context.font="20px sans-serif";
        this.context.fillText("Final Score: " + this.score, 120, 340); // displays score when killed
        
        this.context.font="20px sans-serif";
        this.context.fillText("Final Level: " + this.level, 120, 380); // displays level when killed

        
		this.stop();
	}

	Game.prototype.play = function() 
    {
		this.totalFrames++;
		this.player.update();
		if ( leftPressed) { this.player.moveLeft() } // moves the player left
		if ( rightPressed) { this.player.moveRight(); } // moves the player right
		if ( spacePressed) { this.player.shoot(); } // allows the player to shoot

		// Update enemies
		for (var i = 0; i < this.enemies.length; i++) 
        {
			this.enemies[i].update();
		};

		// Allows the bullets to show up on the canvas
		for (var i = 0; i < this.missiles.length; i++) 
        {
			missile = this.missiles[i];
			missile.update();
			// Deletes the button if the bullet is off the screen
			if (missile.y > 640)
            {
				this.missiles.splice(i, 1);
			}
			// small chance of the player missile collides with enemy's missile
			for (var j = 0; j < this.player.missiles.length; j++) 
            {
				if (missile.collide(this.player.missiles[j])) 
                {
					this.missiles.splice(i, 1);		
					this.player.missiles.splice(j, 1);
				}
			};
		};
		this.redraw(); // draws the bullets
	}

    // resets the game
	Game.prototype.reset = function() 
    {
		clearInterval(this.interval);
		game = new Game();
	}

    // stops the game
	Game.prototype.stop = function() 
    {
		clearInterval(this.interval);
		game = null;
	}

    // what happens when you move onto the next level
	Game.prototype.nextLevel = function() 
    {
		this.levelReset(); // level resets
		this.level++; // level goes up by one
		// Make the next level harder
		this.enemySpeed = 0.5 + 0.1 * this.level;
		EnemyMissileChance += 0.0001;
        this.lives = this.lives++;
	}

    // what occurs when the game is reset - where everything is placed
	Game.prototype.levelReset = function() 
    {
		this.enemies = [];

		this.enemySpeed = 0.5;
		this.enemyDirection = 'right';
		this.missiles = [];
		this.flyingSaucers = [];		

		for (var i = 0; i < 10; i++) {
			for (var y = 0; y < 5; y++) {
                // where the invader is placed
				this.enemies[this.enemies.length] = new Enemy(this.images['invader'], 40 + i * 80 + 24, y * 40 + 40); 
			};			
		};
	}

    
// controls all the functions on the buttons below the games canvas    
$('button.start').click(function() 
{
	// Start game
	game = new Game(); // new game
});
$('button.reset').click(function() 
{
	// Start game
	game.reset(); // reset all values
});

$('button.stop').click(function() 
{
	// Start game
	game.stop(); // stop the game
});

$('button.pause').click(function()
{
    // displays the text on the pause button
	console.log(this);
	if (game.state === 'pause') 
    {
		game.state = 'playing';
		$(this).html('Wait');
	} 
    else 
    {
		game.state = 'pause';
		$(this).html('Continue');
	}
});

$('button.start').click();

// had code for a cheat button to increase lives using similar code to the ones above but couldn't get it to function