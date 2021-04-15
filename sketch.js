var Plr, plrTop, plrDown, plrRight, plrLeft;
var Zombie;
var rightEdge, leftEdge;
var edges;
var zombieGrp, zombieDL, zombieDR, zombieD;
var Plrhead;
var zomSound, vicSound;
var safeZone;
PLAY = 0;
END = 1;
var gameState = PLAY;

function preload(){
  plrTop = loadImage("Survivor faceTop.png");
  plrDown = loadImage("Survivor faceDown.png");
  plrRight = loadImage("Survivor faceLeft.png");
  plrLeft = loadImage("Survivor faceRight.png");

  zombieDL = loadImage("Zombie1DL.png");
  zombieDR = loadImage("Zombie1DR.png");
  zombieD = loadImage("Zombie1D.png");

  zomSound = loadSound("SpookyZombies.mp3");
  vicSound = loadSound("VictorySound.wav");

  safeZone1Img = loadImage("Circular park.png");
  safeZone2Img = loadImage("Rectangular park.jpg");
  safeZone3Img = loadImage("Square park.png");
  safeZone4Img = loadImage("Circular park.png");
  safeZone5Img = loadImage("Square park.png");

}

function setup() {
  createCanvas(1600,750);

  rightEdge = createSprite(0, 375, 20, 900);
  leftEdge = createSprite(1600, 375, 20, 900);

  safeZone1 = createSprite(100, 150, 150, 150);
  safeZone1.addImage(safeZone1Img);
  safeZone1.scale = 0.23;
  safeZone2 = createSprite(400, 300, 50, 150);
  safeZone2.addImage(safeZone2Img);
  safeZone2.scale = 0.3;
  safeZone3 = createSprite(700, 100, 100, 150);
  safeZone3.addImage(safeZone3Img);
  safeZone3.scale = 0.2;
    

  // Plrhead = createSprite(400, 200, 20, 20);
  // Plrhead.setColor("34, 32, 33");

  zombieGrp = new Group();

  
  Plr = createSprite(400, 300, 40, 40);
  Plr.addImage(plrTop);
}

function draw() {
  background(255, 223, 0);

  fill("red");
  stroke("black")
  textSize(20);
  text("I just made the gameStates and the zombies to bounce off the safeZones", 100, 20);

  // zomSound.play();
  // vicSound.play();

  // if(frameCount === 10){
  //   gameState = PLAY;
  // }

  if(gameState === PLAY){

    Plr.debug = true;

  // zombieGrp.collide(rightEdge);

  if(keyDown(UP_ARROW)){
    Plr.y -= 8;
    Plr.addImage(plrTop);
  }

  if(keyDown(DOWN_ARROW)){
    Plr.y += 8;
    Plr.addImage(plrDown);
  }

  if(keyDown(RIGHT_ARROW)){
    Plr.x += 8;
    Plr.addImage(plrRight);
  }

  if(keyDown(LEFT_ARROW)){
    Plr.x -= 8;
    Plr.addImage(plrLeft);
  }

  // zombieGrp.collide(rightEdge);
  // zombieGrp.collide(leftEdge);

  if(zombieGrp.isTouching(rightEdge)){
    zombieGrp.collide(rightEdge);
    zombieGrp.setVelocityX = -2;
  }

  if(zombieGrp.isTouching(leftEdge)){
    zombieGrp.collide(leftEdge);
    zombieGrp.setVelocityX =  2;
  }

  if(zombieGrp.isTouching(Plr)){
    gameState = END;
  }
  
  // zombieGrp.bounce(rightEdge);
  // zombieGrp.bounce(leftEdge);
  zombieGrp.bounceOff(safeZone1);
  zombieGrp.bounceOff(safeZone2);
  zombieGrp.bounceOff(safeZone3);

}

if(gameState === END){
  zombieGrp.destroyEach();
  zombieGrp.setVelocityXEach(0);
  zombieGrp.setVelocityYEach(0);
}

zombieGrp.collide(zombieGrp);

  drawSprites();
  spawnZombie();
}

function spawnZombie(){
  if(frameCount%20 === 0){
    Zombie = createSprite(Math.round(random(100, 750)), Math.round(random(-20, -100)), 20, 20);
    Zombie.velocityY = 3;
    Zombie.velocityX = Math.round(random(-4, 4));
    Zombie.scale = 0.4;
    Zombie.setCollider("circle", -5, -5, 100);
    Zombie.debug = true;

    if(Zombie.velocityX < 0){
      Zombie.addImage(zombieDL);
    }

    if(Zombie.velocityX > 0){
      Zombie.addImage(zombieDR);
    }

    if(Zombie.velocityX === 0){
      Zombie.addImage(zombieD);
    }

    zombieGrp.add(Zombie);
  }
}