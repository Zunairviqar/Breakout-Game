// Defining the storage of the background image, ufo image, the second background
let artwork;
let target;
let bg2
// Defining the storage of the different sounds
let bounceSound;
let hitSound;
let gameOver;
// Setting the starting positions of the background in order to be sequentially aligned.
let p1 = 0;
let p2 = -1000;
// Starting X position of paddle
paddleX = 200;
// Starting position of ball
ballX = 250;
ballY = 250;
// Diameter of the ball
size = 20;
// keeping track of ball speed
let xSpeed = 0;
let ySpeed = 0;
// keeping track of ball color
let r;
let g;
let b;
// keeping track of the rate of change of ball color
let rChange;
let gChange;
let bChange;
// A boolena variable to detect if collision happened.
let collision = false;
// Number of times the ball bounces back
let bounceCount = 0;
// Number of times the ball collides with the UFO
let hitCount = 0;
// A boolean variable to intiate the beginning of the game
start = false;
// Detects the collision of the ball with the right side of the paddle
let rSide;
// Detects the collision of the ball with the left side of the paddle
let lSide;
// The acceleration of the paddle in Round 2
let accel = 0.1;
// Keeping track of the speed of the paddle in Round 2
let paddleSpeed = 0;

// Function that preloads all the multimedia before the execution of 'setup' begins
function preload() {
  artwork = loadImage('assets/starfield.png');
  bg2 = loadImage('assets/bg2.jpeg')
  target = loadImage('assets/ufo.png');
  bounceSound = loadSound("assets/space_bounce.wav");
  hitSound = loadSound("assets/ship_caught.wav");
  gameOver = loadSound("assets/game_over.wav");
}

function setup() {
  // set the background size of our canvas
  createCanvas(500, 500);

  //Set the random r,g,b colors of the call
  r = random(60,255);
  g = random(60,255);
  b = random(60,255);

  // Choose a random rate at which the r,g,b colors change/fluctuate
  rChange = random(-3,3);
  gChange = random(-3,3);
  bChange = random(-3,3);

  // The x & y speeds of the ball chosen at random
  xSpeed = random(1,4);
  ySpeed = random(1,4);

  // Random placement of the X and Y coordinates of the UFO
  ufoX = random(20+50, width-20-50);
  ufoY = random(20+50, 300);
}

function draw()
{
  if (hitCount<10){
    // Creating the background images for every frame
    background(0);
    // Loading the images sequentially on the background
    image(artwork, 0, p1);
    image(artwork, 0, p2);
    // Creating the border
    fill(150);
    noStroke();
    rect(0,0,500,20);
    rect(0,0,20,500);
    rect(500,0,-20,500);
  }
  if (hitCount>=10){
    // Creating the background images for every frame
    background(0);
    // Loading the images sequentially on the background
    image(bg2, 0, p1);
    image(bg2, 0, p2);
    // Creating the border
    fill(150);
    noStroke();
    rect(0,0,500,20);
    rect(0,0,20,500);
    rect(500,0,-20,500);
  }
  // Reducing the Y positions of the background to allow for a smoothly moving background
  p1 += 2;
  p2 += 2;

  // When the first background image completely moves away from the screen, it is set to come after the second image.
  if (p1 >= 1000) {
    p1 = p2 - 1000;
  }
  // When the second background image completely moves away from the screen, it is set to come after the first image.
  if (p2 >= 1000) {
    p2 = p1 - 1000;
  }

  // Creating the paddle
  fill(255);
  rect(paddleX, 500, 100,-20);

  // Checking if the mouse has been clicked.
  if (start == true){
    // The Target(ufo) appears
    imageMode(CENTER);
    image(target,ufoX,ufoY);
    imageMode(CORNER);

    // Changing the position of the paddle with a key press
    if (hitCount<10){
      // Checking that the paddle does not go beyond the right border
      if (paddleX < width -100 -20){
        // Checking if the 'D' key is pressed
        if (keyIsDown(68)) {
          // Moving the Paddle as the key is pressed.
          paddleX+=5;
        }
      }
      // Checking that the paddle does not go behing the left border
      if (paddleX > 20) {
        // Checking if the 'A' key is pressed
        if (keyIsDown(65)) {
          // Moving the Paddle as the key is pressed.
          paddleX -=5;
        }
      }
    }

    // Accelerating the Paddle for Round 2
    if (hitCount>=10){
      if (paddleX > width -100 -20){
        // Setting the paddle to stop when it hits the border
        paddleSpeed = 0;
        // Causing the paddle to slightly bounce back
        paddleX = paddleX-4;
      }
      if (paddleX < 20) {
        // Setting the paddle to stop when it hits the border
        paddleSpeed =0;
        // Causing the paddle to slightly bounce back
        paddleX = paddleX+4;

      }
      // Increasing the speed of the paddle by the acceleration when the 'D' key is pressed
      if (keyIsDown(68)) {
        paddleSpeed += accel
      }
      // Decreasing the speed of the paddle by the deceleration when the 'A' key is pressed
      if (keyIsDown(65)) {
        paddleSpeed -=accel;
      }
        // paddleX += paddleSpeed
      paddleX += paddleSpeed
    }

    // Changing the speed of the ball, with the randomly assigned speeds, for every frame.
    ballX += xSpeed;
    ballY += ySpeed;
  }

  // Bouncing the ball back when it hits the right border
  if (ballX > width-30 || ballX < 30) {
    // Changing the x-direction of the ball
    xSpeed *= -1;
    // Increasing the number of bounces
    bounceCount+=1;
    // Playing a sound as the ball hits the border
    bounceSound.play();
  }
  // Bouncing the ball back when it hits the left border
  if (ballY < 30) {
    bounceCount+=1;
    bounceSound.play();
    ySpeed *= -1;
  }

  // Changing the r,g,b for the color of the ball
  r += rChange;
  g += gChange;
  b += bChange;

  // Checking the boundaries of r,g,b as 255 and 50.
  // Reversing the direction of the rate of change of the color if the boundary is met.
  if (r > 255 || r < 60) {
    rChange *= -1;
  }
  if (g > 255 || b < 60) {
    gChange *= -1;
  }
  if (b > 255 || b < 60) {
    bChange *= -1;
  }

  // Filling the color of the ball
  fill(r,g,b);
  // Recreating the ball on every iteration
  circle(ballX, ballY, size)

  // Setting the boundaries of the paddle and the ball
  var paddleRight = paddleX + 100;
  var paddleLeft = paddleX;
  var paddleTop = 480;
  var ballRight = ballX + 10;
  var ballLeft = ballX - 10;
  var ballBottom = ballY + 10;
  var ballTop = ballY - 10;

  // Checking if the ball does not collide with the Paddle
  if ((paddleTop > ballBottom || ballRight < paddleLeft || ballLeft > paddleRight || paddleTop<ballTop)) {
    collision = false;
  }
  // Setting the collision to be true for all other cases
  else {
    bounceCount +=1;
    collision = true;

    // Play the sound when the ball collides with the paddle
    bounceSound.play();
    // Ensuring that the paddlie hits the ball on the Left
    if (ballX>paddleLeft & ballX<paddleX+50){
      // Checking the position when the paddle is hit with the ball
      hitPos = (ballX-(paddleX));
      // Map the position of contact to be between 6 and 1
      lSide = map(hitPos,0, 50, 6,1);
      // Reverse the speed of the ball accordingly
      if (xSpeed<0){
        xSpeed = -lSide;
      }
      if (xSpeed>0){
        xSpeed = lSide;
      }
    }
    // Ensuring that the paddlie hits the ball on the Right
    if (ballX>paddleX + 50){
      hitPos = (ballX-(paddleX+50));
      rSide = map(hitPos,0, 50, 1,6);
      if (xSpeed<0){
        xSpeed = -rSide;
      }
      if (xSpeed>0){
        xSpeed = rSide;
      }
    }
  }

  // Reverse the Yspeed of the ball on collision with the paddle and bounce it back
  if(collision == true){
      ballY = ballY-4;
      ySpeed *= -1;
  }

  // Checking if the ball goes below the bottom of the canvas
  if (ballTop > height){
    // Repositioning the ball
    ballX = 250;
    ballY = 250;
    // Assigning new initial speeds
    xSpeed = random(1,4);
    ySpeed = random(1,4);
    // Making sure that we have to click again to start
    start = false;
    // Playing the game over sound
    gameOver.play();
    // Resetting the countings and the paddle speed.
    hitCount = 0;
    bounceCount = 0;
    paddleSpeed = 0;
  }

  // Calculating the distance between the UFO and the Ball
  var d = dist(ballX, ballY, ufoX, ufoY);

  // Checking if the ball collides with the UFO
  if (d<60){
    // Assigning a new random position to the UFO
    ufoX = random(20+50, width-20-50);
    ufoY = random(20+50, 300);
    // Increasing the number of UFOs that the ball has collided with
    hitCount+=1;
    hitSound.play();
  }
  // Writing the count of collisions on the top of the screen
  fill(255);
  text("Bounces: " + bounceCount, 20, 15);
  text("UFOs: " + hitCount, 90, 15);

  if (hitCount>=10){
    text("ROUND 2 ", 420, 15);
  }

}

// To set the boolean variable, start, to be true for starting the game
function mousePressed() {
  start = true;
}
