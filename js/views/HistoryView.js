import KeywordView from './KeywordView.js';


const tag = '[HistroyView]'

const HistroyView = Object.create(KeywordView)

HistroyView.messages.NO_KEYWORDS = '검색 이력이 없습니다'

// 키워드 추가
HistroyView.getKeywordHtml = function(data) {
    return data.reduce((html, item) => {
        html += `<li data-keyword="${item.keyword}">
        ${item.keyword}
        <span class="date">${item.date}</span>
        <button class="btn-remove"></button>
        </li>`
        return html
    }, '<ul class="list">') + '</ul>'
}

// history 삭제
HistroyView.bindRemoveBtn = function() {
    Array.from(this.el.querySelectorAll('button.btn-remove')).forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation()
            this.onRemove(btn.parentElement.dataset.keyword)
        })
    })
}

HistroyView.onRemove = function(keyword) {
    this.emit('@remove', {keyword})
}

export default HistroyView