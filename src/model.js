//Контроль SHIFT CTRL / ARROWUP ARROWDOWN

export const RACKET_WIDTH = 12;
export const RACKET_HEIGHT = 76;
export const AREA_WIDTH = 400;
export const AREA_HEIGHT = 560;
export const BALL_RADIUS = 14;
export const BALL_SPEEDX = 2.8;
export const BALL_SPEEDY = 1.9;
export const PLAYER_ONE = 1;
export const PLAYER_TWO = 2;
export const RACKET_SPEED = 6;
export const BRICK_WIDTH = 16;
export const BRICK_HEIGHT = 26;

export function ArcanoidModel() {

  let self = this;
  let timerID = null;
  let myView = null;
  let myController = null;

  this.game = {
    started: 0,
    paused: 0,
  };

  this.ballH = {
		intervalLink: 0,
    radius: BALL_RADIUS,
    frame: 0,
    posX: 0,
    posY: 0,
    speedX: 0,
    speedY: 0,
    velocityX: 0,
    velocityY: 0,
    cacheSpeedX: 0,
    cacheSpeedY: 0,
  };

  this.racketTwo = {
    width: RACKET_WIDTH,
    height: RACKET_HEIGHT,
    posX: 0,
    posY: 0,
    speed: 0,
    score: 0,
    lifes: 0,
  };

  this.areaH = {
    width: AREA_WIDTH,
    height: AREA_HEIGHT,
    posX: AREA_WIDTH / 2,
    posY: AREA_HEIGHT / 2,
  };

  this.blocksH = {
    width: BRICK_WIDTH,
    height: BRICK_HEIGHT,
    rows: 5,
    cols: 11,
    life: 0,
    levels: [],
    padding: BRICK_WIDTH*1.58,
  };

  this.createBlocks = () => {
    for (let cols = 0; cols < this.blocksH.cols; cols++) {
      self.blocksH.levels[cols] = [];
      for (let rows = 0; rows < this.blocksH.rows; rows++) {
        self.blocksH.levels[cols][rows] = {
          x: (BRICK_WIDTH + self.blocksH.padding) * rows + self.blocksH.padding,
          y: (BRICK_HEIGHT + self.blocksH.padding) * cols + self.blocksH.padding,
          lifes: 1,
          status: 0,
          statusCur: 2,
          color: "tomato",
        };
      }
    }
    self.updateView();
  };

  self.prepareGame = () => {
    this.init();
    this.updateView();
	};
	
  this.init = () => {
    this.ballH.posX = AREA_WIDTH - RACKET_WIDTH - BALL_RADIUS;
    this.ballH.posY = AREA_HEIGHT / 2;
    this.racketTwo.posX = AREA_WIDTH - RACKET_WIDTH / 2;
    this.racketTwo.posY = AREA_HEIGHT / 2;
    this.racketTwo.lifes = 3;
    this.racketTwo.score = 0;
    self.createBlocks();
    this.updateView();
  };

  this.randSide = () => {
    let rndX = Math.random();
    let rndY = Math.random();

    rndY > 0.5
      ? (this.ballH.speedY = Math.abs(-this.ballH.speedY))
      : (this.ballH.speedY = -this.ballH.speedY);

    rndX < 0.5
      ? (this.ballH.speedX = Math.abs(-this.ballH.speedX))
      : (this.ballH.speedX = -this.ballH.speedX);

    rndY > 0.5 ? (this.ballH.speedX += rndY) : (this.ballH.speedX -= rndY);
    rndX > 0.5 ? (this.ballH.speedY -= rndX) : (this.ballH.speedY += rndX);

    console.log("randomSide!", this.ballH.speedX, this.ballH.speedY);
    this.updateView();
    return rndX;
  };

  this.setRacketUpSpeed = (playerNumberN) => {
      this.racketTwo.speed = -RACKET_SPEED;
    this.updateView();
  };

  this.setRacketDownSpeed = (playerNumberN) => {
      this.racketTwo.speed = RACKET_SPEED;
    this.updateView();
  };

  this.resetRacketSpeed = (playerNumberN) => {
      this.racketTwo.speed = 0;
    this.updateView();
  };

  this.rAF = () => {
    this.moveElements();
    window.requestAnimationFrame(this.rAF);
  };

  this.moveElements = () => {
    this.ballH.posX += this.ballH.speedX;
    this.ballH.posY += this.ballH.speedY;

    // проверки на касемость ракеток, стен, при выигрыше - обновление счета

    // вылетел ли мяч правее ракетки?
    if 
    (
      this.ballH.posX >= AREA_WIDTH - BALL_RADIUS - RACKET_WIDTH &&
      this.ballH.posY <= this.racketTwo.posY + RACKET_HEIGHT / 2 &&
      this.ballH.posY >= this.racketTwo.posY - RACKET_HEIGHT / 2
    ) {
      this.ballH.speedX = -this.ballH.speedX;
      this.ballH.posX = AREA_WIDTH - RACKET_WIDTH - BALL_RADIUS;
      // вылетел ли мяч правее стены?
    } else if 
    (
      this.ballH.posX + BALL_RADIUS >= AREA_WIDTH
    ) {
      //Если ракетка не словила мячик, останавливаем фрейм анимацию и снимаем жизни
      // console.log("Я тут")
      self.lifeDecrease(1);
      self.stopGame();
      this.ballH.posX = AREA_WIDTH - BALL_RADIUS;
      // this.ballH.speedX *= -1; // test
      this.ballH.speedX = 0;
      this.ballH.speedY = 0;
      
    }
    // вылетел ли мяч левее стены?
    if 
    (
      this.ballH.posX - BALL_RADIUS <= 0
    ) {
      this.ballH.speedX = -this.ballH.speedX;
      this.ballH.posX = BALL_RADIUS;
    }
    // this.updateScore(0, 1)

    // вылетел ли мяч ниже пола?
    if (this.ballH.posY + BALL_RADIUS > AREA_HEIGHT) {
      this.ballH.speedY = -this.ballH.speedY;
      this.ballH.posY = AREA_HEIGHT - BALL_RADIUS;
    }
    // вылетел ли мяч выше потолка?
    if (this.ballH.posY - BALL_RADIUS < 0) {
      this.ballH.speedY = -this.ballH.speedY;
      this.ballH.posY = BALL_RADIUS;
    }

    // Двигаем ракетку и не даем выйти за поле
    if (
      this.racketTwo.posY > AREA_HEIGHT - RACKET_HEIGHT / 2 ||
      this.racketTwo.posY < RACKET_HEIGHT / 2
    ) {
      this.racketTwo.posY < AREA_HEIGHT / 2
        ? (this.racketTwo.posY = RACKET_HEIGHT / 2)
        : (this.racketTwo.posY = AREA_HEIGHT - RACKET_HEIGHT / 2);
      this.racketTwo.speed = 0;
    } else {
      this.racketTwo.posY += this.racketTwo.speed;
    }

    // проверка на коллизию с блоками
    for (let rows = 0; rows < this.blocksH.cols; rows++) {
			let x = self.ballH.posX + self.ballH.speedX;
      for (let cols = 0; cols < this.blocksH.rows; cols++) {
				self.ballCollide(this.blocksH.levels[rows][cols])
      }
		}
		
    self.updateView();
  };

  self.ballCollide = (elem) => {
    let x = self.ballH.posX // + self.ballH.speedX;
    let y = self.ballH.posY // + self.ballH.speedY;

    if (x + BALL_RADIUS > elem.x - BRICK_WIDTH/2 &&
    		x - BALL_RADIUS < elem.x + BRICK_WIDTH/2 &&
    		y + BALL_RADIUS > elem.y - BRICK_HEIGHT/2  &&
    		y - BALL_RADIUS < elem.y + BRICK_HEIGHT/2 && elem.lifes) {
          // debugger;
    			console.log("После этого у блоков отнимутся жизни")
					self.ballH.speedX *= -1
          elem.lifes--
          self.racketTwo.score++
          self.checkMeWin();
        } 
  };

  self.checkMeWin = () => {
    if (self.racketTwo.score === self.blocksH.rows * self.blocksH.cols) {
      self.stopGame();
      console.log('you won')
    }
  }

  self.ballFrameIterator = () => {
    if (self.ballH.intervalLink === 0) {
      self.ballH.intervalLink = setInterval(() => {
        ++self.ballH.frame;
        if (self.ballH.frame > 3) {
        self.ballH.frame = 0;
        }
      }, 150)
    }
  };

  this.startGame = () => {
    if (!self.game.started) {
      self.game.started = 1;
      this.ballH.posX = AREA_WIDTH - RACKET_WIDTH - BALL_RADIUS;
      this.ballH.posY = AREA_HEIGHT / 2;
      this.ballH.speedX = BALL_SPEEDX;
      this.ballH.speedY = BALL_SPEEDY;
      self.ballFrameIterator();
      this.randSide();
      this.updateView();
    }
  };

  this.stopGame = () => {
    self.game.started = 0;
    this.ballH.speedX = 0;
    this.ballH.speedY = 0;
    this.racketTwo.speed = 0;
    // myController.removeEventListeners();
    clearInterval(self.ballH.intervalLink);
    self.ballH.intervalLink = 0;
    cancelAnimationFrame(timerID);
  };

  this.updateView = () => {
    if (myView) myView.update();
  };

  this.setViewContr = (view, controller) => {
    if (view) {
      myView = view;
    }
    if (controller) {
      myController = controller
    }
  };

  this.updateScore = (racketOne, racketTwo) => {
    if (racketOne) this.racketOne.score++;
    else this.racketTwo.score++;
    this.updateView();
  };
  
  self.lifeDecrease = (val) => {
    if (self.racketTwo.lifes && self.game.started != 0) {
    self.racketTwo.lifes -= val;
    }
     if (!self.racketTwo.lifes) {
      myView.gameOver()
		  if (myController) {
		  	myController.removeControlEventListeners();
		  }
    }
    this.updateView();
  };

  self.resumeGame = () => {
    if (!self.game.paused) {
      this.randSide();
      this.ballH.posX = AREA_WIDTH - RACKET_WIDTH - BALL_RADIUS;
      this.ballH.posY = AREA_HEIGHT / 2;
      this.ballH.speedX = BALL_SPEEDX;
      this.ballH.speedY = BALL_SPEEDY;
    }
    self.game.paused = 0;
    self.game.started = 1;
    if (this.ballH.cacheSpeedX) {
      this.ballH.speedX = this.ballH.cacheSpeedX;
      this.ballH.speedY = this.ballH.cacheSpeedY;
    }
    this.ballH.cacheSpeedX = 0;
    this.ballH.cacheSpeedY = 0;
    self.ballFrameIterator();
    this.updateView();
  };

  self.pauseGame = () => {
    if (self.game.started) {
      // console.log('pauseGame() in MODEL');
      self.game.paused = 1;
      self.game.started = 0;
      self.ballH.cacheSpeedX = self.ballH.speedX;
      self.ballH.cacheSpeedY = self.ballH.speedY;
      self.ballH.speedX = 0;
      self.ballH.speedY = 0;
      self.racketTwo.speed = 0;
      // myController.removeEventListeners();
      clearInterval(self.ballH.intervalLink);
      self.ballH.intervalLink = 0;
      cancelAnimationFrame(timerID);}
    this.updateView();
  };
}

console.log("Model loaded");
