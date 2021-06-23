var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;
var fedTime;
var feed;





function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("feed the dog");
  feed.position(650,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  
  //write code to read fedtime value from the database
  fedTime = database.ref("FeedTime");
  fedTime.on("value",(data)=>{
    lastFed = data.val();
  });
  //write code to display text lastFed time here 
  if(lastFed>=12){
    textSize(16);
    fill("white");
    text("last Fed Time"+lastFed%12+"PM",280,30);
  }

  else if(lastFed === 0){
    textSize(16);
    fill("white");
    text("last Fed Time is 12 AM",280,30);
  }

  else {
    textSize(16);
    fill("white");
    text("last Fed Time"+lastFed+"AM",280,30); 
  }
  
 
 

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var foodStockValue = foodObj.getFoodStock();

  if(foodStockValue<=0){
    foodObj.updateFoodStock(foodStockValue*0);
  }

  else{
    foodObj.updateFoodStock(foodStockValue-1);
  }

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
