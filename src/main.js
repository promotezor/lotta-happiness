import { ArcanoidModel } from './model.js';
import { ArcanoidController } from './controller.js';
import { ArcanoidView } from './view.js';
import './style.css';
import { switchToStateFromURLHash } from './SPA.js';


// отслеживаем изменение закладки в УРЛе
// оно происходит при любом виде навигации
// в т.ч. при нажатии кнопок браузера ВПЕРЁД/НАЗАД
const CONTAINER = document.getElementById('tennis-container')

// Определение контекста для canvas:

//это главный контекст
export var fieldCanvas = document.getElementById("canvas-field");
// var ctx = fieldCanvas.getContext("2d");

// это контекст для поля, где будет прыгать мяч
export var ballCanvas = document.getElementById('canvas-ball');
// export var ballContext = ballCanvas.getContext('2d');

// это контекст для кэша мяча
var ballCache = document.getElementById('canvas-cache');
// var ballCacheContext = myBallCache.getContext('2d');

// настройка, инициализация
// создаём все три компонента
export let model = new ArcanoidModel()
export let view = new ArcanoidView()
export let controller = new ArcanoidController()


document.addEventListener('DOMContentLoaded', () => {

// увязываем компоненты друг с другом
// указываем компонентам, в каком DOM им работать
  model.setViewContr(view, controller)
  view.initView(model, CONTAINER, controller)
  controller.startController(model, CONTAINER, view)
  
  // инициируем первичное отображение Model во View
  model.prepareGame()
  window.onload = model.rAF()

  view.update()
  switchToStateFromURLHash();
});






