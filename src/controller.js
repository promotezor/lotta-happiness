import './style.css';

import {AREA_WIDTH} from './model';
import {AREA_HEIGHT} from './model';
import {PLAYER_TWO} from './model';
import {fieldCanvas} from './main';

export function ArcanoidController() {
	let self = this;
	let myModel = null;
	let myField = null
	let myView = null
	let START_BTN;
	let PAUSE_BTN;
	let START_AGAIN
	let touchShiftX
	
	this.startController = (model, container, view) => {
		myModel = model;
		myView = view;
		myField = container;
		self.removeAllEventListeners()
		START_AGAIN = document.querySelector(".optionText");
		START_BTN = myField.querySelector('.start-button');
		PAUSE_BTN = myField.querySelector('.pause-button');
		START_BTN.addEventListener('click', this.startModuleButton);
		document.addEventListener('keydown', this.captureControls);
		window.addEventListener('keyup', this.freeControls);

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
	
	this.freeControls = (EO) => {
		if (EO.keyCode == 32) {
			console.log('hooh')
			// EO.preventDefault();
			if (myModel.game.paused) {
				console.log('resume game')
				myModel.resumeGame();
			} 
			if (!myModel.game.started) {
				myModel.startGame();
			} else if (myModel.game.started) {
				console.log('game started!')
			}
		}
	
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
		window.addEventListener('keyup', this.freeControls);
	  PAUSE_BTN.addEventListener("touchend", myModel.pauseGame);
	  document.addEventListener("mousemove", self.mouseMove);
	  document.addEventListener("touchstart", self.touchStart);
	  document.addEventListener("touchmove", self.touchMove);
	  document.addEventListener("touchend", self.touchEnd);
	};
	
	self.removeControlEventListeners = () => {
		PAUSE_BTN.removeEventListener('click', this.pauseModuleButton);
		document.removeEventListener('keydown', this.captureControls);
		window.removeEventListener('keyup', self.freeControl);
	  PAUSE_BTN.removeEventListener("touchend", myModel.pauseGame);
	  document.removeEventListener("touchstart", self.touchStart);
	  document.removeEventListener("touchmove", self.touchMove);
	  document.removeEventListener("touchend", self.touchEnd);
	};
	
	self.removeAllEventListeners = () => {
		try {
			START_AGAIN.removeEventListener('click', this.startAgainModuleButton);
			START_BTN.removeEventListener('click', this.startModuleButton);
			PAUSE_BTN.removeEventListener('click', this.pauseModuleButton);
			document.removeEventListener('keydown', this.captureControls);
			window.removeEventListener('keyup', self.freeControl)	;
			PAUSE_BTN.removeEventListener("touchend", myModel.pauseGame);
			document.removeEventListener("touchstart", self.touchStart);
			document.removeEventListener("touchmove", self.touchMove);
			document.removeEventListener("touchend", self.touchEnd);
		} catch (error) {
			
		};
		

	  // stop.removeEventListener("touchend", MyModel.stopGame);
	  // document.removeEventListener("mousemove", self.mouseMove);
	  // document.removeEventListener("touchstart", self.touchStart);
	  // document.removeEventListener("touchmove", self.touchMove);
	  // document.removeEventListener("touchend", self.touchEnd);
	};

	self.mouseMove = function(EO) {
		console.log('top of GBCR = ', fieldCanvas.getBoundingClientRect().left, 'top of clientX = ', EO.clientX)
		let relativeY = EO.clientX - fieldCanvas.getBoundingClientRect().left ;
		if (relativeY > 0 && relativeY < AREA_HEIGHT) {
				myModel.mouseMove(relativeY);
		}
	};

	self.touchStart = function (EO) {
			//e.preventDefault();
			let touchH = EO.targetTouches[0];
      touchShiftX = myModel.touchStart(touchH.pageX);
	};


	self.touchEnd = function (EO) {
			//e.preventDefault();
	};

	self.touchMove = function (EO) {
			//e.preventDefault();
			let touchH = EO.targetTouches[0];
			let relativeX = touchH.pageX - fieldCanvas.offsetLeft;
			myModel.touchMove(relativeX, touchH.pageX, touchShiftX);
	};
};