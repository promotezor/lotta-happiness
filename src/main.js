import { ArcanoidModel } from './model.js';
import { ArcanoidController } from './controller.js';
import { ArcanoidView } from './view.js';
import './style.css';

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
let model = new ArcanoidModel()
let view = new ArcanoidView()
let controller = new ArcanoidController()

// увязываем компоненты друг с другом
// указываем компонентам, в каком DOM им работать
model.setView(view)
view.initView(model, CONTAINER)
controller.startController(model, CONTAINER)

// инициируем первичное отображение Model во View
model.prepareGame()
window.onload = model.rAF()










view.update()