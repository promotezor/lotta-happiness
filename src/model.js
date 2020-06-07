//Контроль SHIFT CTRL / ARROWUP ARROWDOWN


export const RACKET_WIDTH = 8;
export const RACKET_HEIGHT = 44;
export const AREA_WIDTH = 400;
export const AREA_HEIGHT = 250;
export const BALL_RADIUS = 8;
export const BALL_SPEEDX = 3.4;
export const BALL_SPEEDY	= 1.9;
export const PLAYER_ONE = 1;
export const PLAYER_TWO = 2;
export const RACKET_SPEED = 5;



export function TennisModel() {
	this.ballH = {
		radius: BALL_RADIUS,
		posX: 0,
		posY: 0,
		speedX: 0,
		speedY: 0,
	};

	this.randSide = () => {
		let rndX = Math.random()
		let rndY = Math.random()

		//рандомизируем eвертикаль скорости мяча
		rndY > 0.5 ? this.ballH.speedY = 
		this.ballH.speedY = Math.abs(this.ballH.speedY) 
		: this.ballH.speedY =-this.ballH.speedY

		//рандомизируем горизонталь скорости мяча
		rndX < 0.5 ? this.ballH.speedX = 
		this.ballH.speedX = Math.abs(this.ballH.speedX) 
		: this.ballH.speedX =-this.ballH.speedX

		//рандомизируем угол старта мяча
		rndY > 0.5 ? this.ballH.speedX += rndY : this.ballH.speedX -= rndY
		rndX > 0.5 ? this.ballH.speedY -= rndX : this.ballH.speedY += rndX
		
		console.log("randomSide!", this.ballH.speedX,this.ballH.speedY)
    this.updateView()
		return rndX
	};

	this.racketOne = {
		width: RACKET_WIDTH,
		height: RACKET_HEIGHT,
		posX: 0,
		posY: 0,
		speed: 0,
		score: 0,
	};

	this.racketTwo = {
		width: RACKET_WIDTH,
		height: RACKET_HEIGHT,
		posX: 0,
		posY: 0,
		speed: 0,
		score: 0,
	};

	this.areaH = {
		width: AREA_WIDTH,
		height: AREA_HEIGHT,
		posX: AREA_WIDTH/2,
		posY: AREA_HEIGHT/2,
	};

	this.init = () => {
		this.ballH.posX = AREA_WIDTH/2
		this.ballH.posY = AREA_HEIGHT/2
		this.racketOne.posX = RACKET_WIDTH/2
		this.racketOne.posY = AREA_HEIGHT/2 
		this.racketTwo.posX = AREA_WIDTH - RACKET_WIDTH/2
		this.racketTwo.posY = AREA_HEIGHT/2
    this.updateView()
	};

	this.setRacketUpSpeed = (playerNumberN) => {

		if (playerNumberN === PLAYER_ONE) {
			this.racketOne.speed = -RACKET_SPEED
		} 
		if (playerNumberN === PLAYER_TWO && this.racketOne.posY <= AREA_WIDTH - RACKET_HEIGHT/2) {
			this.racketTwo.speed = -RACKET_SPEED
		} 
    this.updateView()

	};
	
	this.setRacketDownSpeed = (playerNumberN) => {
		if (playerNumberN === PLAYER_ONE) {
			this.racketOne.speed = RACKET_SPEED
		} 
		if (playerNumberN === PLAYER_TWO) {
			this.racketTwo.speed = RACKET_SPEED
		} 
    this.updateView()
	};

	this.resetRacketSpeed = (playerNumberN) => {
		if (playerNumberN === PLAYER_ONE) {
			this.racketOne.speed = 0
		} 
		if (playerNumberN === PLAYER_TWO) {
			this.racketTwo.speed = 0
		} 
    this.updateView()
	}

	this.rAF = () => {
		this.moveElements()
		window.requestAnimationFrame(this.rAF)
	}

	this.moveElements = () => {
		this.ballH.posX += this.ballH.speedX
    this.ballH.posY += this.ballH.speedY

		// проверки на касемость ракеток, стен, при выигрыше - обновление счета
		
    // вылетел ли мяч правее ракетки?
		if ((this.ballH.posX >= AREA_WIDTH - BALL_RADIUS - RACKET_WIDTH) 
		&& (this.ballH.posY <= this.racketTwo.posY + RACKET_HEIGHT/2) 
		&& (this.ballH.posY >= this.racketTwo.posY - RACKET_HEIGHT/2)) {
      this.ballH.speedX = -this.ballH.speedX
      this.ballH.posX = AREA_WIDTH - RACKET_WIDTH - BALL_RADIUS
    } else if (this.ballH.speedX && this.ballH.speedX && this.ballH.posX + BALL_RADIUS >= AREA_WIDTH) {
			this.ballH.posX = AREA_WIDTH - BALL_RADIUS
      this.ballH.speedX = 0
      this.ballH.speedY = 0
    // вылетел ли мяч правее стены?
				this.updateScore(1, 0)
		};
    // вылетел ли мяч левее ракетки?
    if ((this.ballH.posX <= RACKET_WIDTH + BALL_RADIUS) 
		&& (this.ballH.posY >= this.racketOne.posY - RACKET_HEIGHT/2) 
		&& (this.ballH.posY <= this.racketOne.posY + RACKET_HEIGHT/2)) {
      this.ballH.speedX = -this.ballH.speedX 
      this.ballH.posX = RACKET_WIDTH + BALL_RADIUS
    } else if (this.ballH.speedX && this.ballH.speedX &&this.ballH.posX <= BALL_RADIUS) {	this.ballH.posX = BALL_RADIUS
      this.ballH.speedX = 0
      this.ballH.speedY = 0
    // вылетел ли мяч левее стены?
			this.updateScore(0, 1)
		};

    // вылетел ли мяч ниже пола?
    if ( this.ballH.posY + BALL_RADIUS > AREA_HEIGHT ) {
      this.ballH.speedY = -this.ballH.speedY
      this.ballH.posY = AREA_HEIGHT - BALL_RADIUS
    };
    // вылетел ли мяч выше потолка?
    if ( this.ballH.posY - BALL_RADIUS < 0 ) {
      this.ballH.speedY = -this.ballH.speedY
      this.ballH.posY = BALL_RADIUS
    };

		// Двигаем ракетки и не даем выйти за поле
		if ((this.racketOne.posY > AREA_HEIGHT - RACKET_HEIGHT/2) || (this.racketOne.posY < RACKET_HEIGHT/2)) {
			this.racketOne.posY < AREA_HEIGHT/2 ? this.racketOne.posY = RACKET_HEIGHT/2 : this.racketOne.posY = AREA_HEIGHT - RACKET_HEIGHT/2
			this.racketOne.speed = 0
		} else {
			this.racketOne.posY += this.racketOne.speed
		}
		if ((this.racketTwo.posY > AREA_HEIGHT - RACKET_HEIGHT/2) || (this.racketTwo.posY < RACKET_HEIGHT/2)) {
			this.racketTwo.posY < AREA_HEIGHT/2 ? this.racketTwo.posY = RACKET_HEIGHT/2 : this.racketTwo.posY = AREA_HEIGHT - RACKET_HEIGHT/2
			this.racketTwo.speed = 0
		}	else {
			this.racketTwo.posY += this.racketTwo.speed
		}

    this.updateView()
	};

	let timerID
	let myView = null;

	this.startGame = () => {
		this.init()
		this.ballH.speedX = BALL_SPEEDX
		this.ballH.speedY = BALL_SPEEDY
		this.randSide()
    this.updateView()
		this.moveElements()
	};

	this.stopGame = () => {
		cancelAnimationFrame(timerID)
	};

	this.updateView = () => {
  	if ( myView )
  	  myView.update();
  };

	this.setView = (view) => {
		myView = view
	};

	this.updateScore = (racketOne, racketTwo) => {
		if (racketOne)
			this.racketOne.score++
		else 
			this.racketTwo.score++
	};
} 

console.log("Model loaded")