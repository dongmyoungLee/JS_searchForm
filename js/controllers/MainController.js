import FormView from '../views/FormView.js' // formView.js에서 export 한 내용을 받아옴

const tag = '[MainController]'

export default { // 데이터를 내보냄.
    init() {
        console.log(tag, 'init()')
        FormView.setup(document.querySelector('form'))
    }
}
