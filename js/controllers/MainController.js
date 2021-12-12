import FormView from '../views/FormView.js' 
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'
import HistoryView from '../views/HistoryView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'
import HistoryModel from '../models/HistoryModel.js'


const tag = '[MainController]'

// 객체 데이터를 내보냄.
export default { 
    init() {
        // setup 메소드로 태그 넣어주고, 체이닝 메서드로 on 메서드 실행 (체이닝 메서드를 쓰기 위해선 return 값으로 this를 꼭 줘야함), 각각의 값을 전달 받고, 각각의 메소드를 실행시킴.
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm())

        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.tabName))

        KeywordView.setup(document.querySelector('#search-keyword'))
            .on('@click', e => this.onClickKeyword(e.detail.keyword))

        HistoryView.setup(document.querySelector('#search-history'))
            .on('@click', e => this.onClickHistory(e.detail.keyword))
            .on('@remove', e => this.onRemoveHistory(e.detail.keyword))
        
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

    // 화면 그리기
    renderView() {
        TabView.setActiveTab(this.selectedTab)

        if(this.selectedTab === '추천 검색어') {
            this.fetchSearchKeyword()
            HistoryView.hide()
        } else {
            this.fetchSearchHistory()
            KeywordView.hide()
        }
        
        ResultView.hide()
    },
    
    // 탭 변경시 추천 검색어 그리기
    fetchSearchKeyword() {
        KeywordModel.list().then(data => {
            KeywordView.render(data)
        })
    },
    // 탭 변경시 최근 검색어 그리기
    fetchSearchHistory() {
        HistoryModel.list().then(data => {
            HistoryView.render(data).bindRemoveBtn()
        })
    },
    // 검색 , model 에서 data 불러오기
    search(query) {
        // 검색어를 input value로 저장
        FormView.setValue(query)
        
        // searcModel API
        HistoryModel.add(query)

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
        this.search(input)
    },
    // x 버튼 눌렀을 시
    onResetForm() {
        ResultView.hide()
        this.renderView()
        TabView.show()
    },
    // 검색 시
    onSearchResult(data) {
        TabView.hide()
        KeywordView.hide()
        ResultView.render(data)
    },
    // 탭 변경시
    onChangeTab(tabName) {
        this.selectedTab = tabName
        this.renderView()
    },
    // 추천검색어 키워드 클릭시
    onClickKeyword(keyword) {
        this.search(keyword)
    },
    // 최근검색어 키워드 클릭시
    onClickHistory(keyword) {
        this.search(keyword)
    },
    // 최근검색어 x버튼 누를시
    onRemoveHistory(keyword) {
        HistoryModel.remove(keyword)
        this.renderView()
    }

}
