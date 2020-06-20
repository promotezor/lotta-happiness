
import './style.css';

import {PLAYER_ONE} from './model';
import {PLAYER_TWO} from './model';

export function ArcanoidController() {
	let self = this;
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
		START_BTN.addEventListener('click', this.startModuleButton);

	  // stop.addEventListener("touchend", MyModel.stopGame);
	  // document.addEventListener("mousemove", self.mouseMove);
	  // document.addEventListener("touchstart", self.touchStart);
	  // document.addEventListener("touchmove", self.touchMove);
	  // document.addEventListener("touchend", self.touchEnd);
	};
	
	this.startModuleButton = (EO) => {
		self.addBasicEventListeners();
		!myModel.game.paused ? myModel.startGame() : myModel.resumeGame();
	};

	// после согласия играть снова после проигрыша, запускает игру
	this.startAgainModuleButton = (EO) => {
		self.addBasicEventListeners();
		myView.removePopUp();
		myModel.prepareGame();
		myModel.startGame();
	};

	this.pauseModuleButton = (EO) => {
		self.removeControlEventListeners()
		myModel.pauseGame();
	};


	this.captureControls = (EO) => {
		// EO.preventDefault();
		
		if (EO.keyCode == 39) {
			// EO.preventDefault();
			myModel.setRacketUpSpeed(PLAYER_TWO)
		}
	
		if (EO.keyCode == 37) {
			// EO.preventDefault();
			myModel.setRacketDownSpeed(PLAYER_TWO)
		};
	}
	
	this.resetRacketSpeed = (EO) => {
	
		if (EO.keyCode == 39) {
			EO.preventDefault();
			myModel.resetRacketSpeed(PLAYER_TWO)
		}
	
		if (EO.keyCode == 37) {
			EO.preventDefault();
			myModel.resetRacketSpeed(PLAYER_TWO)
		}
	};

	self.addBasicEventListeners = () => {
		START_AGAIN.addEventListener('click', this.startAgainModuleButton);
		START_BTN.addEventListener('click', this.startModuleButton);
		PAUSE_BTN.addEventListener('click', this.pauseModuleButton);
		document.addEventListener('keydown', this.captureControls);
		window.addEventListener('keyup', this.resetRacketSpeed);

	  // stop.removeEventListener("touchend", MyModel.stopGame);
	  // document.removeEventListener("mousemove", self.mouseMove);
	  // document.removeEventListener("touchstart", self.touchStart);
	  // document.removeEventListener("touchmove", self.touchMove);
	  // document.removeEventListener("touchend", self.touchEnd);
	};
	
	self.removeControlEventListeners = () => {
		PAUSE_BTN.removeEventListener('click', this.pauseModuleButton);
		document.removeEventListener('keydown', this.captureControls);
		window.removeEventListener('keyup', this.resetRacketSpeed);

	  // stop.removeEventListener("touchend", MyModel.stopGame);
	  // document.removeEventListener("mousemove", self.mouseMove);
	  // document.removeEventListener("touchstart", self.touchStart);
	  // document.removeEventListener("touchmove", self.touchMove);
	  // document.removeEventListener("touchend", self.touchEnd);
	};
	
	self.removeAllEventListeners = () => {
		START_AGAIN.removeEventListener('click', this.startAgainModuleButton);
		START_BTN.removeEventListener('click', this.startModuleButton);
		PAUSE_BTN.removeEventListener('click', this.pauseModuleButton);
		document.removeEventListener('keydown', this.captureControls);
		window.removeEventListener('keyup', this.resetRacketSpeed)	;

	  // stop.removeEventListener("touchend", MyModel.stopGame);
	  // document.removeEventListener("mousemove", self.mouseMove);
	  // document.removeEventListener("touchstart", self.touchStart);
	  // document.removeEventListener("touchmove", self.touchMove);
	  // document.removeEventListener("touchend", self.touchEnd);
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