import { TennisModel } from './model.js';
import { TennisController } from './controller.js';
import { TennisView } from './view.js';
import './style.css';
const CONTAINER = document.getElementById('tennis-container')


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
view.update()

window.onload = model.rAF