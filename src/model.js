//Контроль SHIFT CTRL / ARROWUP ARROWDOWN

export const RACKET_WIDTH = 8;
export const RACKET_HEIGHT = 44;
export const AREA_WIDTH = 400;
export const AREA_HEIGHT = 360;
export const BALL_RADIUS = 14;
export const BALL_SPEEDX = 2.8;
export const BALL_SPEEDY = 1.9;
export const PLAYER_ONE = 1;
export const PLAYER_TWO = 2;
export const RACKET_SPEED = 5;
export const BRICK_WIDTH = 15;
export const BRICK_HEIGHT = 25;

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
    rows: 4,
    cols: 8,
    life: 0,
    levels: [],
    padding: BRICK_WIDTH*1.27,
  };

  this.createBlocks = () => {
    for (let cols = 0; cols < this.blocksH.cols; cols++) {
      self.blocksH.levels[cols] = [];
      for (let rows = 0; rows < this.blocksH.rows; rows++) {
        self.blocksH.levels[cols][rows] = {
          x: (BRICK_WIDTH + self.blocksH.padding) * rows + self.blocksH.padding,
          y: (BRICK_HEIGHT + self.blocksH.padding) * cols + self.blocksH.padding,
          // var blockPosX = (r * (BRICK_WIDTH + p) + p);
          // var blockPosY = (c * (BRICK_HEIGHT + p) + p);
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
    this.racketTwo.lifes = 1;
    this.racketTwo.score = 0;
    self.createBlocks();
    this.updateView();
  };

  this.randSide = () => {
    let rndX = Math.random();
    let rndY = Math.random();

    //рандомизируем вертикаль скорости мяча
    rndY > 0.5
      ? (this.ballH.speedY = this.ballH.speedY = Math.abs(-this.ballH.speedY))
      : (this.ballH.speedY = -this.ballH.speedY);

    //рандомизируем горизонталь скорости мяча
    rndX < 0.5
      ? (this.ballH.speedX = this.ballH.speedX = Math.abs(-this.ballH.speedX))
      : (this.ballH.speedX = -this.ballH.speedX);

    //рандомизируем угол старта мяча
    rndY > 0.5 ? (this.ballH.speedX += rndY) : (this.ballH.speedX -= rndY);
    rndX > 0.5 ? (this.ballH.speedY -= rndX) : (this.ballH.speedY += rndX);

    console.log("randomSide!", this.ballH.speedX, this.ballH.speedY);
    this.updateView();
    return rndX;
  };

  this.setRacketUpSpeed = (playerNumberN) => {
    // if (playerNumberN === PLAYER_ONE) {
    // 	this.racketOne.speed = -RACKET_SPEED
    // }
    if (
      playerNumberN === PLAYER_TWO &&
      this.racketTwo.posY <= AREA_WIDTH - RACKET_HEIGHT / 2
    ) {
      this.racketTwo.speed = -RACKET_SPEED;
    }
    this.updateView();
  };

  this.setRacketDownSpeed = (playerNumberN) => {
    // if (playerNumberN === PLAYER_ONE) {
    // 	this.racketOne.speed = RACKET_SPEED
    // }
    if (playerNumberN === PLAYER_TWO) {
      this.racketTwo.speed = RACKET_SPEED;
    }
    this.updateView();
  };

  this.resetRacketSpeed = (playerNumberN) => {
    // if (playerNumberN === PLAYER_ONE) {
    // 	this.racketOne.speed = 0
    // }
    if (playerNumberN === PLAYER_TWO) {
      this.racketTwo.speed = 0;
    }
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
    if (
      this.ballH.posX >= AREA_WIDTH - BALL_RADIUS - RACKET_WIDTH &&
      this.ballH.posY <= this.racketTwo.posY + RACKET_HEIGHT / 2 &&
      this.ballH.posY >= this.racketTwo.posY - RACKET_HEIGHT / 2
    ) {
      this.ballH.speedX = -this.ballH.speedX;
      this.ballH.posX = AREA_WIDTH - RACKET_WIDTH - BALL_RADIUS;
    } else if (
      this.ballH.speedX &&
      this.ballH.speedX &&
      this.ballH.posX + BALL_RADIUS >= AREA_WIDTH
    ) {
      //Если ракетка не словила мячик, останавливаем фрейм анимацию и снимаем жизни
      self.lifeDecrease(1);
      self.stopGame();
      this.ballH.posX = AREA_WIDTH - BALL_RADIUS;
      this.ballH.speedX = 0;
      this.ballH.speedY = 0;
      // вылетел ли мяч правее стены?
    }
    // вылетел ли мяч левее стены?
    if (
      this.ballH.speedX &&
      this.ballH.speedX &&
      this.ballH.posX <= BALL_RADIUS
    ) {
      this.ballH.speedX = -this.ballH.speedX;
      this.ballH.posX = RACKET_WIDTH + BALL_RADIUS;
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
    let x = self.ballH.posX + self.ballH.speedX;
    let y = self.ballH.posY + self.ballH.speedY;
    if (x + BALL_RADIUS > elem.x &&
    		x < elem.x + BRICK_WIDTH &&
    		y + BALL_RADIUS > elem.y &&
    		y < elem.y + BRICK_HEIGHT && elem.lifes) {
    			console.log("После этого у блоков отнимутся жизни")
					self.ballH.speedX = -self.ballH.speedX
          elem.lifes--
          self.racketTwo.score++
    		}
  };


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
    if (!self.racketTwo.lifes) {
      self.racketTwo.lifes
    }
    if  (!self.game.started) {
      self.game.started = 1;
      this.ballH.speedX = BALL_SPEEDX;
      this.ballH.speedY = BALL_SPEEDY;
      self.ballFrameIterator();
      // this.randSide();
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
    if (self.racketTwo.lifes) {
    self.racketTwo.lifes -= val;
    console.log("Вы потеряли " + val + " life(s)")
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
    self.game.paused = 0;
    self.game.started = 1;
    this.ballH.speedX = this.ballH.cacheSpeedX;
    this.ballH.speedY = this.ballH.cacheSpeedY;
    self.ballFrameIterator();
    // this.randSide();
    this.updateView();
  };

  self.pauseGame = () => {
    self.game.paused = 1;
    self.game.started = 0;
    this.ballH.cacheSpeedX = this.ballH.speedX;
    this.ballH.cacheSpeedY = this.ballH.speedY;
    this.ballH.speedX = 0;
    this.ballH.speedY = 0;
    this.racketTwo.speed = 0;
    // myController.removeEventListeners();
    clearInterval(self.ballH.intervalLink);
    self.ballH.intervalLink = 0;
    cancelAnimationFrame(timerID);
    this.updateView();
  };
}

console.log("Model loaded");
