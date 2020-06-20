
import './style.css';
import {RACKET_WIDTH} from './model';
import {RACKET_HEIGHT} from './model';
import {AREA_WIDTH} from './model';
import {AREA_HEIGHT} from './model';
import {BALL_RADIUS} from './model';
import {fieldCanvas} from './main';
import {ballCanvas} from './main';

export function ArcanoidView() {
	let self = this
	let myModel = null
	let myField = null
	let myController = null
	let CANVAS
	let CANVAS_BALL
	let SCORE
	let LEVEL
	let TIMER
	let LIFES
	let POPUP_WINDOW
	let GAMEOVER_MODAL

	self.sources = {
		background: undefined,
		ball: undefined,
		
		
	};

	

	self.initView = (model, field, controller) => {
		myModel = model
		myField = field
		myController = controller
		CANVAS = myField.querySelector('#canvas-field')
		CANVAS_BALL = myField.querySelector('#canvas-ball')
    SCORE = myField.querySelector('.score')
    LEVEL = myField.querySelector('.level')
    TIMER = myField.querySelector('.timer')
		LIFES = myField.querySelector('.lifes')
		POPUP_WINDOW = document.querySelector(".popUpWindow")
		GAMEOVER_MODAL = document.getElementById("gameover-modal-window");

		this.sources.background = new Image();
		this.sources.background.src = "src/img/background.jpg";
		this.sources.ball = new Image();
		this.sources.ball.src = "src/img/ball.png";
		
		CANVAS.style.backgroundImage = this.sources.background
		CANVAS.style.backgroundSize = "450px 700px"


	};
	
	self.drawBlocks = (w, h, p, canvas, blocksArr) => {
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, AREA_WIDTH, AREA_HEIGHT);
		for (let c = 0; c < myModel.blocksH.cols; c++) {
			for (let r = 0; r < myModel.blocksH.rows; r++) {
					if (blocksArr[c][r].lifes) {
						ctx.beginPath();
						ctx.rect(blocksArr[c][r].x - p/2, blocksArr[c][r].y - p/2 + h/4, w, h);
						ctx.fillStyle = blocksArr[c][r].color;
						ctx.fill();
						ctx.closePath();
						ctx.fillStyle = '#333';
						ctx.font = 'normal 15px Arial';
						ctx.textBaseline = 'middle';
						ctx.textAlign = 'center';
						// ctx.fillText(blocksArr[c][r].lifes, blocksArr[c][r].x + p/2, blocksArr[c][r].y + h/4);
					} else {
						ctx.beginPath();
						// ctx.clearRect(0, 0, AREA_WIDTH, AREA_HEIGHT);
						ctx.rect(blocksArr[c][r].x - p/2, blocksArr[c][r].y - p/2, w, h);
						ctx.fillStyle = "rgb(146, 146, 216)";
						ctx.fill();
						ctx.closePath();
						ctx.fillStyle = 'violet';
						ctx.font = 'normal 15px Arial';
						ctx.textBaseline = 'middle';
						ctx.textAlign = 'center';
						// ctx.fillText(blocksArr[c][r].lifes, blocksArr[c][r].x , blocksArr[c][r].y);
					}
			}
		}	
	}

	self.paddleFunc = (x) => {
		if (x) {
				var ctx = fieldCanvas.getContext('2d');
				ctx.clearRect(AREA_WIDTH - myModel.racketTwo.height, 0, AREA_WIDTH, AREA_HEIGHT);
				ctx.beginPath();
				ctx.rect(AREA_WIDTH - myModel.racketTwo.width, myModel.racketTwo.posY - myModel.racketTwo.height/2, myModel.racketTwo.width, myModel.racketTwo.height);
				ctx.fillStyle = "#a6ff5d";
				ctx.fill();
				ctx.closePath();
		}
};

	self.ballFunc = (x) => {
		var ctx = ballCanvas.getContext('2d');
		ctx.clearRect(0, 0, AREA_WIDTH, AREA_HEIGHT)
		ctx.drawImage(this.sources.ball, BALL_RADIUS*2 * myModel.ballH.frame, 0, BALL_RADIUS*2, BALL_RADIUS*2, myModel.ballH.posX - BALL_RADIUS, myModel.ballH.posY - BALL_RADIUS, BALL_RADIUS*2, BALL_RADIUS*2)
	};

	this.update = () => {
		CANVAS.style.backgroundImage = this.sources.background
		CANVAS.style.backgroundSize = "450px 700px"
		self.drawBlocks(myModel.blocksH.width, myModel.blocksH.height, myModel.blocksH.padding, fieldCanvas, myModel.blocksH.levels)
		self.paddleFunc(1)
		self.ballFunc();
		self.updateInfoPanel()
	};

	self.updateInfoPanel = () => {
    SCORE.innerText = "Ваш счет: " + myModel.racketTwo.score;
    LIFES.innerText = "Осталось жизней: " + myModel.racketTwo.lifes;
	};

	self.gameOver = () => {
		GAMEOVER_MODAL.style.display = "block";
		POPUP_WINDOW.style.display = "block";
		GAMEOVER_MODAL.classList.add("messageBoxAppear");
	};

	self.removePopUp = () => {
		// убираем POPUP
		GAMEOVER_MODAL.classList.remove("messageBoxAppear");
		GAMEOVER_MODAL.style.display = "none";
		POPUP_WINDOW.style.display = "none";
	};
};


console.log("View loaded")