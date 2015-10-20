## Graphics Programming Project 2015

**Due: 5pm Friday, November 13th 2015**

You have just started working for a games company called GaCo, and as your first task you have been asked to create a small addictive 2D game using HTML5 and JavaScript.
The game will, for the time being, be focused only on players accessing the game through their desktop browser.
GaCo hopes the game will become popular, so that they can then sell advertisements on the webpage where the game is available.


>*The beauty of Pac-Man is that anyone who plays it immediately knows what is going on in the game. That is why it still works today if you download it on a smartphone. Thirty-five years ago, we were limited by the power of the CPU, now we don’t have those constraints, but game makers need to be thinking about what made the older games so good.*

> **Tōru Iwatani**

## Instructions
1. Create a file called index.html, which is the webpage the user will open to start the game.
You may use multiple files to organise your game, however the starting point must be index.html.
Create a the game using only HTML, CSS and JavaScript. Your starting index.html file might look like this:
    
    ```html
     <!DOCTYPE html>
    <html>
      <head>
        ...
        <style type="text/css"></style>
      </head>
      <body>
        <script type="text/javascript">
          ...
        </script>
      </body>
    </html>
    ```
    
1. Use a single Canvas element in index.html where all of your game is played and displayed.
    ```html
    <canvas id="gamecanvas"></canvas>
    ```

1. Use requestAnimationFrame to enable animation in your game.
    ```
    function step(t) {
      requestAnimationFrame(step);
    }
    ```

1. User interaction can either be through the mouse or keyboard or both. You may use jQuery to enable this, but ensure you include your jquery source file in your submission.
    ```js
    window.addEventListener("keydown", function(event) { 
        ...
    });
    ```

1. Comment all of your code so that it easily readable and understandable.
    
    ```js
    // ball is an object that represents a ball on the canvas.
    var ball = {
        // position is a property that represents the ball's position on the canvas.
        // It is an object itself with two properties, the x and y coordinates of the ball.
        position: {x: 10, y: 10}
        ...
    }
    ```
    
1. Include a README file with your code, written in [GitHub-flavoured](https://help.github.com/articles/github-flavored-markdown/) [MarkDown](https://help.github.com/articles/markdown-basics/).

    ```markdown
    # PacMan - an addictive 2D game
    ** by Tōru Iwatani **
    This is the README for PacMan, which includes details about the game including instructions detailing how to play the game.
    ```
    
1. Use Git to manage your source code, and create a GitHub repository for your code and upload your game's code to it.

## GitHub
You must upload your game to a repository in your GitHub account in order to submit it.
You can do this using [git](https://git-scm.com/) on the command line, using [GitHub Desktop](https://desktop.github.com/), or otherwise.
The computer labs have git installed, but not GitHub Desktop for technical reasons.
I have created a short introduction to the git command line [here](https://github.com/ianmcloughlin/git-basics/).

## Submission
On the course Moodle page there is a link where you can submit your GitHub repository's url.
You must do this before the submission deadline.
Any changes made to your repository after the submission deadline will not count towards your mark.

## Plagiarism
All work must be the student’s own, with any content from outside parties being clearly attributed to those parties.
Submissions may be filtered through plagiarism prevention services.
Students should consult the lecturer in case of confusion regarding this issue.
Students are bound by GMIT’s Code of Student Conduct and GMIT’s Policy on Plagiarism, both available on the GMIT website.

## Grading
This assignment is worth 50% of your mark for this module.
The grading scheme is as follows.


Category | % | Acceptable | Excellent
---------|--:|------------|----------
**Overall design** | 10 | The game is straight-forward and clear in both its user interface and code design. | Significant thought has been put into the user interface to make it intuitive. The code is well structured and clearly organised.
**Comments and commits** | 10 | Each part of the code is commented, and git has been used to track progress of the codebase. | Each part of the code is easily understandable due to well explained, suitable comments. Git has been used to track all changes to the codebase and an extensive commit history is available.
**Animation** | 10 | Animation is used correctly for at least part of the game. | Animation is used correctly, and it is carefully thought out so that the game's animations run smoothly. The animation adds to the user experience.
**User interaction** | 10 | The user can control elements of the game with the keyboard or mouse. | User interaction is intuitive, and it works very well. There are no obvious bugs related to user interaction, and user errors are handled gracefully.
**Collisions** | 10 | The game makes use of collision detection that works. | The collision detection is free from bugs, and is achieved through efficient and well designed code.