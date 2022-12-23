(function () {
'use strict';

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var arkanoidTimerID = 0;

var ball = {
  coefficientX: 0,
  coefficientY: 0,
  posX: 150,
  posY: 274,
  getRadians: function(degrees) {return (Math.PI/180)*degrees;},
  paint: function() {      
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, 6, 0, this.getRadians(360));
    ctx.fillStyle = 'black';
    ctx.closePath();
    ctx.fill();
  },
  move: function(coefficientX, coefficientY) {
    this.posX += this.coefficientX;
    this.posY += this.coefficientY;
  },
  reactWall: function() {
    if (this.posX <= 0 && this.posY <= 0) {
      this.coefficientY = -this.coefficientY;
      this.coefficientX = -this.coefficientX;
    } else if (this.posY <= 6) {
      this.coefficientY = -this.coefficientY;
    } else if (this.posX >= 292 && ball.posY <= 0) {
      this.coefficientY = -this.coefficientY;
      this.coefficientX = -this.coefficientX;
    } else if (this.posX >= 292) {
      this.coefficientX = -this.coefficientX;
    } else if (this.posX <= 6) {
      this.coefficientX = -this.coefficientX;       
    }
  },
  restartGame: function() {
    if (this.posY > 450) {
      clearInterval(gameID);
      this.posX = 150;
      this.posY = 274;
      this.coefficientX = 0;
      this.coefficientY = 0;
      arkanoid.posX = 130;
      arkanoid.posY = 280;
      gameID = setInterval(paintGame, 30);
      document.addEventListener('keydown', startGame);
    }
  }
};

var arkanoid = {
  timer: 0,
  posX: 130,
  posY: 280,
  paint: function() {      
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, 40, 10);
    ctx.fillStyle = 'gray';
    ctx.closePath();
    ctx.fill();
  },
  
  move: function() {
    if (event.keyCode == 37) {
      arkanoidTimerID = setInterval(function() {
        if (arkanoid.posX >= 0) {
          arkanoid.posX -= 2;
        }
      }, 10);
      document.removeEventListener('keydown', arkanoid.move);
    }  else if(event.keyCode == 39) {
      arkanoidTimerID = setInterval(function() {
        if (arkanoid.posX <= 260) {
          arkanoid.posX += 2;
        }
      }, 10);
      document.removeEventListener('keydown', arkanoid.move);
    }
  },
  stopMove: function() {
    if (event.keyCode == 37) {
      clearInterval(arkanoidTimerID);
      document.addEventListener('keydown', arkanoid.move);
    } else if(event.keyCode == 39) {
      clearInterval(arkanoidTimerID);
      document.addEventListener('keydown', arkanoid.move);
    }
  },
  reactBall: function() {
    if (ball.posY >= 274 && ball.posY < 276 && this.posX <= ball.posX + 12 && this.posX + 52 >= ball.posX) {
      ball.coefficientY = -ball.coefficientY;
    }
  },
};

var dashboard = {
  state: [  
            ['gainsboro', 2, 40], ['gainsboro', 25, 40], ['gainsboro', 48, 40],
            ['gainsboro', 71, 40], ['gainsboro', 94, 40], ['gainsboro', 117, 40], 
            ['gainsboro', 140, 40], ['gainsboro', 163, 40], ['gainsboro', 186, 40], 
            ['gainsboro', 209, 40], ['gainsboro', 231, 40], ['gainsboro', 254, 40], ['gainsboro', 277, 40],
    
            ['red', 2, 51], ['red', 25, 51], ['red', 48, 51],
            ['red', 71, 51], ['red', 94, 51], ['red', 117, 51], 
            ['red', 140, 51], ['red', 163, 51], ['red', 186, 51], 
            ['red', 209, 51], ['red', 231, 51], ['red', 254, 51], ['red', 277, 51],
      
            ['yellow', 2, 62], ['yellow', 25, 62], ['yellow', 48, 62],
            ['yellow', 71, 62], ['yellow', 94, 62], ['yellow', 117, 62], 
            ['yellow', 140, 62], ['yellow', 163, 62], ['yellow', 186, 62], 
            ['yellow', 209, 62], ['yellow', 231, 62], ['yellow', 254, 62], ['yellow', 277, 62],
    
            ['blue', 2, 73], ['blue', 25, 73], ['blue', 48, 73],
            ['blue', 71, 73], ['blue', 94, 73], ['blue', 117, 73], 
            ['blue', 140, 73], ['blue', 163, 73], ['blue', 186, 73], 
            ['blue', 209, 73], ['blue', 231, 73], ['blue', 254, 73], ['blue', 277, 73],
    
            ['pink', 2, 84], ['pink', 25, 84], ['pink', 48, 84],
            ['pink', 71, 84], ['pink', 94, 84], ['pink', 117, 84], 
            ['pink', 140, 84], ['pink', 163, 84], ['pink', 186, 84], 
            ['pink', 209, 84], ['pink', 231, 84], ['pink', 254, 84], ['pink', 277, 84],
    
            ['green', 2, 95], ['green', 25, 95], ['green', 48, 95],
            ['green', 71, 95], ['green', 94, 95], ['green', 117, 95], 
            ['green', 140, 95], ['green', 163, 95], ['green', 186, 95], 
            ['green', 209, 95], ['green', 231, 95], ['green', 254, 95], ['green', 277, 95],
         ],
  paint: function() {
    for (var i = 0; i < this.state.length; i++) {
      ctx.beginPath();
      ctx.rect(this.state[i][1], this.state[i][2], 20, 10);
      ctx.fillStyle = this.state[i][0];
      ctx.closePath();
      ctx.fill();
    }
  },
  reactBall: function() {
    for (var i = 0; i < this.state.length; i++) {
      if (
        ball.posY <= this.state[i][2] + 15 && ball.posY + 4 > this.state[i][2] + 15 + 2 &&
        !(this.state[i][1] > ball.posX + 6) && 
        !(this.state[i][1] + 20 < ball.posX) 
      ) {
        ball.coefficientY = -ball.coefficientY;
        this.state.splice(i, 1);
      } else if (
        ball.posY + 4 >= this.state[i][2] && ball.posY + 4 < this.state[i][2] +2 &&
        !(this.state[i][1] > ball.posX + 6) && 
        !(this.state[i][1] + 20 < ball.posX)
      ) {
        ball.coefficientY = -ball.coefficientY;
        this.state.splice(i, 1);
      } else if (
        ball.posY >= this.state[i][2] && ball.posY + 4 <= this.state[i][2] +10 &&
        ball.posX <= this.state[i][1] + 24 && ball.posX > this.state[i][1] + 22
      ) {
        ball.coefficientX = -ball.coefficientX;
        this.state.splice(i, 1);
      }
      else if (
        ball.posY >= this.state[i][2] && ball.posY + 4 <= this.state[i][2] +10 &&
        ball.posX + 4 >= this.state[i][1] && ball.posX + 4 < this.state[i][1] +2
      ) {
        ball.coefficientX = -ball.coefficientX;
        this.state.splice(i, 1);
      }
    }
  },
  win: function() {
    if (this.state == '') {
      clearInterval(gameID);
      setTimeout(function() {
        alert('win');
      }, 500);
    }
  }
};


  


document.addEventListener('keydown', startGame);
var gameID = setInterval(paintGame, 30);
document.addEventListener('keydown', arkanoid.move);
document.addEventListener('keyup', arkanoid.stopMove);

document.addEventListener('keydown', function() {
  if ((event.key == 'P' && gameID) || (event.key == 'p' && gameID) || (event.key == 'з' && gameID) || (event.key == 'З' && gameID)) {
    clearInterval(gameID); 
    gameID = null;
    document.removeEventListener('keydown', arkanoid.move);
    document.removeEventListener('keyup', arkanoid.stopMove);
    clearInterval(arkanoidTimerID);
  } else if (event.key == 'P' || event.key == 'p' || event.key == 'з' || event.key == 'З') {
    gameID = setInterval(paintGame, 30);
    document.addEventListener('keydown', arkanoid.move);
    document.addEventListener('keyup', arkanoid.stopMove);
  }
});

function paintGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  arkanoid.paint();
  ball.paint();
  ball.move();
  ball.reactWall();
  arkanoid.reactBall();
  dashboard.paint();
  dashboard.reactBall();
  
  ball.restartGame();
  dashboard.win();
}

function startGame() {
  ball.coefficientX = randomise(1, 2);
  ball.coefficientY = -2;
  document.removeEventListener('keydown', startGame);
}
  
function randomise(min, max) {
  var val = Math.random() * (max - min) + min;
  return Math.round(val);
}
  
})();