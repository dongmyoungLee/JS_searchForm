import View from './View.js'

const tag = '[FormView]'


const FormView = Object.create(View)// View 에서 export 객체 안에 들어있는 함수

//setup 메서드 선언
FormView.setup = function(el) {
    this.init(el) // MainController에서 el 인자로 form 태그가 넘어옴
    this.inputEl = el.querySelector('[type=text]')//폼 태그 안에 있는 타입이 텍스트 인 것
    this.resetEl = el.querySelector('[type=reset]')//폼 태그 안에 있는 타입이 리셋인 것
    this.showResetBtn(false)
    this.bindEvents()
}


FormView.showResetBtn = function(show = true) {
    this.resetEl.style.display = show ? 'block' : 'none'
}

FormView.bindEvents = function() {
    this.inputEl.addEventListener('keyup', e => this.onkeyup(e))
}

FormView.onkeyup = function() {
    this.showResetBtn(this.inputEl.value.length)
}

export default FormView // FormView 라는 객체를 내보냄