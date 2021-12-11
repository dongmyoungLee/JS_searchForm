import View from './View.js'

const tag = '[FormView]'


const FormView = Object.create(View)// View 에서 export 객체 안에 들어있는 함수

//setup 메서드 선언
FormView.setup = function(el) {
    this.init(el) 
    // MainController에서 el 인자로 form 태그가 넘어옴
    this.inputEl = el.querySelector('[type=text]')
    //폼 태그 안에 있는 타입이 텍스트 인 것
    this.resetEl = el.querySelector('[type=reset]')
    //폼 태그 안에 있는 타입이 리셋인 것
    this.showResetBtn(false)
    // 버튼을 사라지게 하는 함수 인자로 false를줘서 default parameter부분에 걸리지 않게 한다. 
    this.bindEvents()
    // 이벤트를 바인딩해놓는 부분
    return this
    // 메소드 체이닝 하기 위해 리턴해줌
}


// x 버튼 사라지게 하는 메소드
FormView.showResetBtn = function(show = true) {
    this.resetEl.style.display = show ? 'block' : 'none'
}

// 이벤트 바인딩 해놓은 메소드
FormView.bindEvents = function() {
    this.on("submit", (e) => e.preventDefault());
    /* on(event, handler) {
        this
            .el
            .addEventListener(event, handler)
        return this
    } => submit 이벤트할때 새로고침 안되게 함*/

    this.inputEl.addEventListener('keyup', e => this.onkeyup(e))
    // FormView 에 keyup 이벤트랑 인자로 onkeyup 메소드 실행함
    this.resetEl.addEventListener('click', e => this.onClickReset())
    //FormView 에 click 이벤트랑 인자로 onclickreset 실행
}

// onkeyup 메소드
FormView.onkeyup = function(e) {
    const enter = 13
    const esc = 27
    this.showResetBtn(this.inputEl.value.length)
    // showResetBtn 메소드에 인풋태그 내용의 글자 수 넣고 실행
    if(!this.inputEl.value.length) this.emit('@reset')
    /*
    emit(event, data) {
        const evt = new CustomEvent(event, {detail: data})
        this
            .el
            .dispatchEvent(evt)
        return this
    } -> input 태그에 내용이 없다면 emit 으로 @reset 을 전달
    */
    // esc 누르면 내용 및 x 버튼 사라짐
    if(e.keyCode === esc) {
        this.emit('@reset')
        this.inputEl.value = ''
        this.showResetBtn(false)
    }
    if(e.keyCode !== enter) return
    // keyCode가 엔터가 아니라면 종료
    this.emit('@submit', {input: this.inputEl.value})
    // @submit 을 전달하고 객체를 전달함
    
}

// click 메소드
FormView.onClickReset = function() {
    this.emit('@reset')
    // @reset 전달.
    this.showResetBtn(false)
    // false 전달로 버튼 사라지게 함 
}

FormView.setValue = function(value='') {
    this.inputEl.value = value;
    this.showResetBtn(this.inputEl.value.length)
}

export default FormView // FormView 라q는 객체를 내보냄