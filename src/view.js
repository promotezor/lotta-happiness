
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
	let CANVAS
	let CANVAS_BALL
	let SCORE
	let AREA
	let BALL
	let RACKET_ONE
	let RACKET_TWO
	let LEVEL
	let TIMER
	let LIFES

	self.sources = {
		background: undefined,
		ball: undefined,
		
		
	};

	

	self.initView = (model, field) => {
		myModel = model
		myField = field
		CANVAS = myField.querySelector('#canvas-field')
		CANVAS_BALL = myField.querySelector('#canvas-ball')
    SCORE = myField.querySelector('.score')
    LEVEL = myField.querySelector('.level')
    TIMER = myField.querySelector('.timer')
		LIFES = myField.querySelector('.LIFES')

		this.sources.background = new Image();
		this.sources.background.src = "src/img/background.jpg";
		this.sources.ball = new Image();
		this.sources.ball.src = "src/img/ball.png";
		
		CANVAS.style.backgroundImage = this.sources.background
		CANVAS.style.backgroundSize = "450px 700px"

	};
	
	self.drawBlocks = (w, h, p, canvas, blocksArr) => {
		var ctx = canvas.getContext('2d');
		for (let c = 0; c < myModel.blocksH.cols; c++) {
			for (let r = 0; r < myModel.blocksH.rows; r++) {
						var blockPosX = (r * (w + p) + p);
						var blockPosY = (c * (h + p) + p);
						blocksArr[c][r].x = blockPosX;
						blocksArr[c][r].y = blockPosY;
						ctx.beginPath();
						ctx.rect(blockPosX, blockPosY, w, h);
						ctx.fillStyle = blocksArr[c][r].color;
						ctx.fill();
						ctx.closePath();
						ctx.fillStyle = '#333';
						ctx.font = 'normal 15px Arial';
						ctx.textBaseline = 'middle';
						ctx.textAlign = 'center';
						ctx.fillText(blocksArr[c][r].statusCur, blockPosX + w / 2, blockPosY + h / 2);
			}
		}	
	}

	self.paddleFunc = (x) => {
		if (x) {
				var ctx = fieldCanvas.getContext('2d');
				ctx.clearRect(AREA_WIDTH - myModel.racketTwo.height, 0, AREA_WIDTH, AREA_HEIGHT);
				ctx.beginPath();
				ctx.rect(AREA_WIDTH - myModel.racketTwo.width, myModel.racketTwo.posY, myModel.racketTwo.width, myModel.racketTwo.height);
				ctx.fillStyle = "#a6ff5d";
				ctx.fill();
				ctx.closePath();
		}
};

	self.ballFunc = (x) => {
		var ctx = ballCanvas.getContext('2d');
		ctx.clearRect(0, 0, AREA_WIDTH, AREA_HEIGHT)
		ctx.drawImage(this.sources.ball, BALL_RADIUS * myModel.ballH.frame, 0, BALL_RADIUS, BALL_RADIUS, myModel.ballH.posX, myModel.ballH.posY, BALL_RADIUS, BALL_RADIUS)
	};

	this.update = () => {
		CANVAS.style.backgroundImage = this.sources.background
		CANVAS.style.backgroundSize = "450px 700px"
		self.drawBlocks(myModel.blocksH.width, myModel.blocksH.height, myModel.blocksH.padding, fieldCanvas, myModel.blocksH.levels)
		self.paddleFunc(1)
		self.ballFunc()
		
	};
};

console.log("View loaded")