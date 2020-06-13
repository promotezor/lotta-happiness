
import './style.css';
import {RACKET_WIDTH} from './model';
import {RACKET_HEIGHT} from './model';
import {AREA_WIDTH} from './model';
import {AREA_HEIGHT} from './model';
import {BALL_RADIUS} from './model';

export function TennisView() {
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
		myField.style.top = RACKET_HEIGHT*2 + 'px'
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

console.log("View loaded")