
import './style.css';

import {PLAYER_ONE} from './model';
import {PLAYER_TWO} from './model';

export function TennisController() {
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
		// EO.preventDefault();
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


console.log("Controller loaded")