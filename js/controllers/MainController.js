import FormView from '../views/FormView.js' 
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'


import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'

const tag = '[MainController]'

// 객체 데이터를 내보냄.
export default { 
    init() {
        console.log(tag, 'init()')
        
        // setup 메소드로 form 태그 넣어주고, 체이닝 메서드로 on 메서드 실행, 각각 @submit, @reset 을 전달 받고, 각각의 메소드를 실행시킴.
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm())
        
        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.tabName))

        KeywordView.setup(document.querySelector('#search-keyword'))
            .on('@click', e => this.onClickKeyword(e.detail.keyword))

        ResultView.setup(document.querySelector('#search-result'))
        /*
        on(event, handler) {
        this
            .el
            .addEventListener(event, handler)
        return this
        }
        */
        this.selectedTab = '추천 검색어'
        this.renderView()
    },

    renderView() {
        console.log(tag, 'renderView()')
        TabView.setActiveTab(this.selectedTab)
        
        if(this.selectedTab === '추천 검색어') {
            this.fetchSearchKeyword()
        } else {

        }
        
        ResultView.hide()
    },

    fetchSearchKeyword() {
        KeywordModel.list().then(data => {
            KeywordView.render(data)
        })
    },

    search(query) {
        console.log(tag, 'search()', query)
        // search api
        SearchModel.list(query).then(data => {
            this.onSearchResult(data)
        })
        /*
        list(query) {
        return new Promise(res => {
            setTimeout(() => {
                res(data)
            }, 200);
        })
        }
        */
    },

    // submit(엔터 눌렀을 시) 받았을 시
    onSubmit(input) {
        console.log(input)
        this.search(input)
    },
    // x 버튼 눌렀을 시
    onResetForm() {
        console.log(tag, 'onResetForm()')
        ResultView.hide()
    },
    onSearchResult(data) {
        TabView.hide()
        KeywordView.hide()
        ResultView.render(data)
    },
    onChangeTab(tabName) {
        console.log(tabName)
    },
    onClickKeyword(keyword) {
        this.search(keyword)
    }

}
