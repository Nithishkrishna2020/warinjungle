var hunter; 
var hunterImg;
var bulletImg;
var backgroundImg;
var lionImg,tigerImg;
var deerImg,bearImg,zebraImg;
var animalY = 0;
var gameOverImg,youWinImg,startButtonImg;
var gameState = 0;
var gamerOver,youWin,startButton;

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
  

}
function setup() {
  createCanvas(windowWidth,windowHeight);
  hunter = createSprite(100,height-100,50,50);
  hunter.scale = 0.4;
  hunter.addImage(hunterImg);
  animalGroup = new Group();
  bulletGroup = new Group();
  startButton = createSprite(width/2-100,height/2+100);
  startButton.addImage(startButtonImg);
  startButton.scale = 0.5;
  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  }
  


function draw() {
  background("lightblue");
  image(backgroundImg,-1000,0,width*5,height);
  if(gameState === 0){

    textSize(50);
    fill("red")
    text("War in jungle",width/2-200,height/2);
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
    }
    
    

    playerControl(); 
    animals(); 
    if(keyWentDown("space")){
      shoot();
    }
    for(var i = 0;i<bulletGroup.length;i = i+1){
      for(var j = 0;j<animalGroup.length;j = j+1){
        if(bulletGroup.isTouching(animalGroup)){
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
    animalY = animalY+500
    var animal = createSprite(animalY,500,10,10);
    animal.y = random(100,height-100);
    animal.velocityX = -3;
    animal.velocitY = random(-1,1);
    var rand = floor(random(1,5));
    animal.lifetime = floor(width/3);
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