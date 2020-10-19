var hunter; 
var hunterImg;
var bulletImg;
var backgroundImg;
var lionImg,tigerImg;
var deerImg,bearImg,zebraImg;
var animalY = 1000;
var gameOverImg,youWinImg,startButtonImg;
var gameState = 0;
var gamerOver,youWin,startButton;
var bulletSound,youWinSound,gameOverSound,scoreSound; 
var score = 0;

function preload(){
  hunterImg = loadImage("player.png");
  bulletImg = loadImage("bullet.png");
  backgroundImg = loadImage("1.jpg");
  lionImg = loadImage("lion.png");
  deerImg = loadImage("deer.png");
  tigerImg = loadImage("tiger.png");
  zebraImg = loadImage("zebra.png");
  bearImg = loadImage("bear.png");
  gameOverImg = loadImage("gameOver.png");
  youWinImg = loadImage("youWin.png");
  startButtonImg = loadImage("startButton.png");
  bulletSound = loadSound("BulletSound.mp3");
  youWinSound = loadSound("youWinSound.mp3");
  gameOverSound = loadSound("gameOverSound.mp3");
  scoreSound = loadSound("scoreSound.mp3");  

}
function setup() {
  createCanvas(windowWidth,windowHeight);
  hunter = createSprite(100,height-100,50,50);
  hunter.scale = 0.4;
  hunter.addImage(hunterImg);
  animalGroup = new Group();
  bulletGroup = new Group();
  startButton = createSprite(width/2,height/2+100);
  startButton.addImage(startButtonImg);
  startButton.scale = 0.5;
  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  youWin = createSprite(width/2,height/2);
  youWin.addImage(youWinImg);
  youWin.visible = false;

  }

  


function draw() {
  background("lightblue");  
  image(backgroundImg,-1000,0,width*5,height);
  text(mouseX+":"+mouseY,mouseX,mouseY);
  if(gameState === 0){
    textSize(100);
    fill("red");
    textStyle(BOLD);
    text("War in jungle",width/2-280,height/2-150);
    textSize(20);
    text("Shoot the animal to get the score.",width/2-150,height/2-100);
    text("collect 10 points to win the game",width/2-150,height/2-50);
    text("Dont touch the animal,when you touch the animal it will kill you",width/2-250,height/2);
    hunter.visible = false;
    if(mousePressedOver(startButton)){
      gameState = 1;
    }
  }

  else if(gameState === 1){
    startButton.visible = false;
    hunter.visible = true;
    if(hunter.isTouching(animalGroup)){
      gameState = 2;
      gameOverSound.play();
    }
    if(score === 10){
      gameState = 3;
      youWinSound.play();
    }
    textSize(50);
    textStyle(BOLD);
    fill("red");
    text("Score: "+score,camera.position.x+400,50);

    

    playerControl(); 
    animals(); 
    if(keyWentDown("space")&&bulletGroup.length<=1){
      shoot();
      bulletSound.play();
    }
    for(var i = 0;i<bulletGroup.length;i = i+1){
      for(var j = 0;j<animalGroup.length;j = j+1){
        if(bulletGroup.isTouching(animalGroup)){
          scoreSound.play();
          score = score+1;
          bulletGroup.get(i).destroy()
          animalGroup.get(j).destroy()
          
        }
      }
      
    }
  }
  else if(gameState === 2){
    gameOver.visible = true;
    hunter.visible = false;
    animalGroup.destroyEach();
    gameOver.x = camera.position.x;
    gameOver.y = camera.position.y;
    bulletGroup.destroyEach();

  }
  else if(gameState === 3){
    youWin.visible = true;
    youWin.x = camera.position.x;
    youWin.y = camera.position.y;
    hunter.visible = false;
    animalGroup.destroyEach();
    bulletGroup.destroyEach();
  } 

  drawSprites();  

}
function playerControl(){
  camera.position.x = hunter.x+300;
  if(keyDown(UP_ARROW)) {
    // hunter.velocityX = 0;
    //  hunter.velocityY = -2;
    hunter.y = hunter.y-5;
   }
   
   if(keyDown(DOWN_ARROW)){
    //  hunter.velocityX = 0;
    //  hunter.velocityY = 2;
    hunter.y = hunter.y+5
   }
   
   if(keyDown(RIGHT_ARROW)){
    //  hunter.velocityX = 2;
    //  hunter.velocityY = 0;
    hunter.x = hunter.x+5
   }
   
   if (keyDown(LEFT_ARROW)){
    //  hunter.velocityX = -2;
    //  hunter.velocityY = 0;
    hunter.x = hunter.x-5
   }

}
function shoot(){
  
  var bullet = createSprite(hunter.x+100,hunter.y,10,10);
  bullet.addImage(bulletImg);
  bullet.scale = 0.1
  bullet.velocityX = 10;
  bullet.lifetime = floor(width/10);
  bulletGroup.add(bullet);
  
}
function animals(){
  if(frameCount % 10 === 0&&animalGroup.length<5){
    animalY = animalY+400
    var animal = createSprite(animalY,500,10,10);
    animal.y = random(100,height-100);
    animal.velocityX = -3;
    animal.velocitY = random(-1,1);
    var rand = floor(random(1,5));
    animalGroup.add(animal);
    switch(rand){
      case 1:animal.addImage(lionImg);
      animal.scale = 0.2;break;
      case 2:animal.addImage(tigerImg);
      animal.scale = 0.2;break;
      case 3:animal.addImage(bearImg);
      animal.scale = 0.2;break;
      case 4:animal.addImage(zebraImg);
      animal.scale = 0.2;break;
      case 5:animal.addImage(deerImg);
      animal.scale = 0.2;break;
      default:break;
    }
  }
}