var dog,sadDog,happyDog, database;
var foodStock, foodS;
var fedTime, lastFed;
var feed, addFood;
var foodObject;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  foodObject = new Food();

  foodS = database.ref('foodStock');
  foodS.on("value", readStock);

  
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(800, 95);
  addFood.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);

  foodObject.display();
  fedTime = database.ref('feedTime');
  fedTime.on("value", (data)=>{
    lastFed = data.val();
  })

  fill(255, 255, 254);
  textSize(15);
  if(lastFed > 12){
    text("last feed: "+ lastFed%12 + ' pm', 350, 30);
  }else if(lastfed == 0){
    text("last feed: 12 am", 350,30)
  }else{
    text("last feed: "+ lastFed + ' am', 350, 30);
  }
  drawSprites();
}

function readStock(data){
   foodS=data.val(); 
   foodObj.updateFoodStock(foodS);
  
  }

  function feedDog(){ 
   dog.addImage(happyDog);
    if(foodObj.getFoodStock()<= 0){
     foodObj.updateFoodStock(foodObj.getFoodStock()*0);
    }else{ 
      foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
    }
    database.ref('/').update({ 
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  }) 
 }

 function addFoods(){
    foodS++; database.ref('/').update({ Food:foodS }) 
  }



