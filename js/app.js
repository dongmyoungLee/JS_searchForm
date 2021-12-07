import MainController from './controllers/MainController.js';
// MainContrller 라는 객체에 MainContrller.js 에서 export 한 내용을 불러온다. 

document.addEventListener('DOMContentLoaded', () => {
    MainController.init()
})