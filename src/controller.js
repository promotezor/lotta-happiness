
import './style.css';

import {PLAYER_ONE} from './model';
import {PLAYER_TWO} from './model';

export function ArcanoidController() {
	let myModel = null;
	let myField = null
	let myView = null
	let START_BTN;
	let PAUSE_BTN;
	let START_AGAIN
	
	this.startController = (model, container, view) => {
		myModel = model;
		myView = view;
		myField = container;

		START_AGAIN = document.querySelector(".optionText");
		START_BTN = myField.querySelector('.start-button');
		PAUSE_BTN = myField.querySelector('.pause-button');

		START_AGAIN.addEventListener('click', this.startAgainModuleButton);
		START_BTN.addEventListener('click', this.startModuleButton);
		PAUSE_BTN.addEventListener('click', this.pauseModuleButton);
		document.addEventListener('keydown', this.captureControls);
		window.addEventListener('keyup', this.resetRacketSpeed)	;	
	};
	
	this.startModuleButton = (EO) => {
		!myModel.game.paused ? myModel.startGame() : myModel.resumeGame();
	};

	this.startAgainModuleButton = (EO) => {
		myView.removePopUp();
		myModel.prepareGame();
		myModel.startGame();
	};

	this.pauseModuleButton = (EO) => {
		myModel.pauseGame();
	};

	this.stopModuleButton = (EO) => {
		myModel.stopGame();
	};

	this.captureControls = (EO) => {
		EO.preventDefault();
		if (EO.keyCode == 16) {
			myModel.setRacketUpSpeed(PLAYER_ONE)
		}
	
		if (EO.keyCode == 17) {
			EO.preventDefault();
			myModel.setRacketDownSpeed(PLAYER_ONE)
		}
	
		if (EO.key == "ArrowUp") {
			EO.preventDefault();
			myModel.setRacketUpSpeed(PLAYER_TWO)
		}
	
		if (EO.key == "ArrowDown") {
			EO.preventDefault();
			myModel.setRacketDownSpeed(PLAYER_TWO)
		};
	}
	
	this.resetRacketSpeed = (EO) => {
		if (EO.keyCode == 16) {
			EO.preventDefault();
			myModel.resetRacketSpeed(PLAYER_ONE)
		}
	
		if (EO.keyCode == 17) {
			EO.preventDefault();
			myModel.resetRacketSpeed(PLAYER_ONE)
		}
	
		if (EO.key == "ArrowUp") {
			EO.preventDefault();
			myModel.resetRacketSpeed(PLAYER_TWO)
		}
	
		if (EO.key == "ArrowDown") {
			EO.preventDefault();
			myModel.resetRacketSpeed(PLAYER_TWO)
		}
	};
	
	function addControlEventListeners() {
	  stop.addEventListener("touchend", MyModel.stopGame, false);
	  document.addEventListener("mousemove", self.mouseMove, false);
	  document.addEventListener("touchstart", self.touchStart, false);
	  document.addEventListener("touchmove", self.touchMove, false);
	  document.addEventListener("touchend", self.touchEnd, false);
	};
	

	self.mouseMove = function (EO) {
		var relativeX = EO.clientX - MyCanvas.getBoundingClientRect().left;
		if (relativeX > 0 && relativeX < MyCanvas.width) {
				MyModel.PaddleH.mouseMove(relativeX);
		}
	};


	self.touchStart = function (EO) {
			//e.preventDefault();
		if (EO.target) {

		}
	};


	self.touchEnd = function (EO) {
			//e.preventDefault();
	};

	self.touchMove = function (EO) {
			//e.preventDefault();
			var TouchH = EO.targetTouches[0];
			var relativeX = TouchH.pageX - MyCanvas.offsetLeft;
			MyModel.PaddleH.TouchMove(relativeX, TouchH.pageX, TouchShiftX);
	};
};


console.log("Controller loaded")