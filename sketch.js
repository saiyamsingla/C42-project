var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png")

  jumpSound=loadSound("jump.wav");
  failSound=loadSound("gameOver.wav");
 
}



function setup() {
  createCanvas(400,400);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.09;

  ground=createSprite(400,350,900,10);
  ground.shapeColor="brown";
  ground.velocityX=-4;
  ground.x=ground.width/2;

  obstacleGroup=new Group();
  FoodGroup=new Group();
  gameOver = createSprite(200,160);
  gameOver.addImage(gameOverImg);
  
 
  
 
  gameOver.scale = 0.5;
  
  
  monkey.setCollider("circle",0,0,300);
 // monkey.debug="true"

}


function draw() {
  background(255);
  
  if(gameState===PLAY){
    gameOver.visible = false;
    
    if(ground.x<0){
    ground.x=ground.width/2;
  }
    
  if(keyDown("space")&&monkey.y>=250){
    monkey.velocityY=-12;
    jumpSound.play();
  }
 
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground);
  food();
  spawnObstacles();
    
    
    
   if(FoodGroup.isTouching(monkey)){
      score=score+2;
      banana.destroy();
     monkey.scale+=0.01;
     }
    
    if(obstacleGroup.isTouching(monkey)){
      monkey.scale=0.08;
      failSound.play();
      gameState=END;
    }
  }
  else if(gameState===END){
    gameOver.visible = true;
    

    ground.velocityX=0;
    monkey.visible=false;
    
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
  }
  
  

  drawSprites ();
  
  
  textSize(20);
  stroke("black");
  fill("black")
  text("Score= " + score,150,50);

}

function food(){ 
if(frameCount % 80===0){
  banana=createSprite(200,200,20,20);
  banana.y=Math.round(random(120,250));
  banana.velocityX=-5;
  banana.addImage(bananaImage);
  banana.scale=0.1;
  FoodGroup.add(banana);
  FoodGroup.setLifetimeEach(100);
}
}

function spawnObstacles(){ 
if(frameCount % 100===0){
 obstacle=createSprite(350,325,20,20);
 obstacle.addImage("obstacles",obstacleImage);        obstacle.velocityX=-6;
 obstacle.scale=0.1;
 obstacleGroup.add(obstacle);
  obstacleGroup.setLifetimeEach(80);
}
}





