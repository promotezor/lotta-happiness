//Контроль SHIFT CTRL / ARROWUP ARROWDOWN


const CONTAINER = document.getElementById('tennis-container')
const RACKET_WIDTH = 8
const RACKET_HEIGHT = 44
const AREA_WIDTH = 400
const AREA_HEIGHT = 250
const BALL_RADIUS = 8
const BALL_SPEEDX = 3.4
const BALL_SPEEDY	= 1.9
const PLAYER_ONE = 1
const PLAYER_TWO = 2
const RACKET_SPEED = 5



function TennisModel() {
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


function TennisView() {
	let myModel = null
	let myField = null
	let SCORE
	let AREA
	let BALL
	let RACKET_ONE
	let RACKET_TWO

	this.initView = (model, field) => {
		myModel = model
		myField = field
		SCORE = myField.querySelector('.score')
		AREA = myField.querySelector('.area')
		BALL = myField.querySelector('.ball')
		RACKET_ONE = myField.querySelector('.racket-one')
		RACKET_TWO = myField.querySelector('.racket-two')
	};
	
	this.update = () => {
		AREA.style.width = AREA_WIDTH + 'px'
		AREA.style.height = AREA_HEIGHT + 'px'

		RACKET_ONE.style.width = RACKET_WIDTH + 'px'
		RACKET_ONE.style.height = RACKET_HEIGHT + 'px'
		RACKET_ONE.style.left = myModel.racketOne.posX - RACKET_WIDTH / 2  + 'px'
		RACKET_ONE.style.top = myModel.racketOne.posY - RACKET_HEIGHT / 2 + "px"

		RACKET_TWO.style.width = RACKET_WIDTH + 'px'
		RACKET_TWO.style.height = RACKET_HEIGHT + 'px'
		RACKET_TWO.style.left = myModel.racketTwo.posX - RACKET_WIDTH / 2 + 'px'
		RACKET_TWO.style.top = myModel.racketTwo.posY - RACKET_HEIGHT / 2 + "px"

		BALL.style.top = myModel.ballH.posY - BALL_RADIUS + "px"
		BALL.style.left = myModel.ballH.posX - BALL_RADIUS + "px"
		BALL.style.width = BALL_RADIUS * 2 + "px"
		BALL.style.height = BALL_RADIUS * 2 + "px"

		SCORE.innerText = myModel.racketOne.score + ":" + myModel.racketTwo.score
		SCORE.style.position = "absolute"
		SCORE.style.left = AREA_WIDTH/2 - SCORE.offsetWidth/2 + "px"
		SCORE.style.bottom = AREA_HEIGHT + "px"
	};
};

function TennisController() {
	let myModel = null
	let myField = null
	let START_BTN
	
	this.startController = (model, container) => {
		myModel = model
		myField = container
		START_BTN = myField.querySelector('.start-button')
		START_BTN.addEventListener('click', this.startModuleButton)
		document.addEventListener('keydown', this.captureControls)
		window.addEventListener('keyup', this.resetRacketSpeed)		
	};
	
	this.startModuleButton = (EO) => {
		myModel.startGame()
	}

	this.captureControls = (EO) => {
		if (EO.keyCode == 16) {
			myModel.setRacketUpSpeed(PLAYER_ONE)
		}
	
		if (EO.keyCode == 17) {
			myModel.setRacketDownSpeed(PLAYER_ONE)
		}
	
		if (EO.key == "ArrowUp") {
			myModel.setRacketUpSpeed(PLAYER_TWO)
		}
	
		if (EO.key == "ArrowDown") {
			myModel.setRacketDownSpeed(PLAYER_TWO)
		}
	}
	
	this.resetRacketSpeed = (EO) => {
		if (EO.keyCode == 16) {
			myModel.resetRacketSpeed(PLAYER_ONE)
		}
	
		if (EO.keyCode == 17) {
			myModel.resetRacketSpeed(PLAYER_ONE)
		}
	
		if (EO.key == "ArrowUp") {
			myModel.resetRacketSpeed(PLAYER_TWO)
		}
	
		if (EO.key == "ArrowDown") {
			myModel.resetRacketSpeed(PLAYER_TWO)
		}

	}
};




  // настройка, инициализаци
// создаём все три компонента
let model = new TennisModel()
let view = new TennisView()
let controller = new TennisController()

// увязываем компоненты друг с другом
// указываем компонентам, в каком DOM им работать
model.setView(view)
view.initView(model, CONTAINER)
controller.startController(model, CONTAINER)
// инициируем первичное отображение Model во View
model.init()

window.onload = model.rAF