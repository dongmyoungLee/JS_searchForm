import FormView from '../views/FormView.js' // formView.js에서 export 한 내용을 받아옴

const tag = '[MainController]'

// 객체 데이터를 내보냄.
export default { 
    init() {
        console.log(tag, 'init()')
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm())
        // setup 메소드로 form 태그 넣어주고, 체이닝 메서드로 on 메서드 실행, 각각 @submit, @reset 을 전달 받고, 각각의 메소드를 실행시킴.

        /*
        on(event, handler) {
        this
            .el
            .addEventListener(event, handler)
        return this
        }
        */
    },
    // submit(엔터 눌렀을 시) 받았을 시
    onSubmit(input) {
        console.log(input)
    },
    // x 버튼 눌렀을 시
    onResetForm() {
        console.log(tag, 'onResetForm()')
    }
}
