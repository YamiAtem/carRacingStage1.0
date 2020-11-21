class Game {
  constructor() {
    
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    
    car = createSprite(100, 100, 20, 100);
    car.shapeColor="red"
    car2 = createSprite(200, 100, 20, 100);
    car2.shapeColor="yellow"
    car3 = createSprite(300, 100, 20, 100);
    car3.shapeColor = "blue"
    car4 = createSprite(400, 100, 20, 100);
    car4.shapeColor="green"
    cars = [car, car2, car3, car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){

      var x = 0;
      var y;
      var index = 0;

      for(var plr in allPlayers){
        index += 1;
        x += 200;
        y = displayHeight - allPlayers[plr].distance;

        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index) {
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    drawSprites();
  }
}