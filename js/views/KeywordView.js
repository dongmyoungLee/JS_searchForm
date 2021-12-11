import FormView from './FormView.js'
import View from './View.js'

import KeywordModel from '../models/KeywordModel.js'


const tag = '[KeywordView]'

const KeywordView = Object.create(View)

KeywordView.messages = {
    NO_KEYWORDS: '추천 검색어가 없습니다'
}

KeywordView.setup = function(el) {
    this.init(el)
    return this
}

KeywordView.render = function(data = []) {
    this.el.innerHTML = data.length ? this.getKeywordHtml(data) : this.messages.NO_KEYWORDS
    this.bindClickEvent()
    this.show()
    return this
}

KeywordView.getKeywordHtml = function(data) {
    return data.reduce((html, item, index) => {
        html += `<li data-keyword="${item.keyword}">
            <span class="number">${index + 1}</span>
            ${item.keyword}
        </li>`
        return html
    }, '<ul class="list">') + '</ul>'
}

KeywordView.bindClickEvent = function() {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.addEventListener('click', e => this.onClickKeyword(e))
    })    
}


KeywordView.onClickKeyword = function(e) {
    const {keyword} = e.currentTarget.dataset
    this.emit('@click', {keyword})
    console.log({keyword})
}

export default KeywordView