import View from './View.js'

const tag = '[TabView]'

const TabView = Object.create(View)

// tapView ul 받아옴
TabView.setup = function(el) {
    this.init(el)
    this.bindClick()
    return this
    // 메소드체이닝을 위한 return
}

// li에 active 를 걸어주고 click했을시 active를 걸어주는역할을 함
TabView.setActiveTab = function(tabName) {
    
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.className = li.innerHTML === tabName ? 'active' : ''
    })
}

// li 를 클릭했을때 당시 li의 innerHTML 을  onClick 으로 넘겨줌
TabView.bindClick = function() {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.addEventListener('click', e => this.onClick(li.innerHTML))
    })
}

// active 걸어주고 값 넘겨줌
TabView.onClick = function(tabName) {
    this.setActiveTab(tabName) // active걸어줌
    this.emit('@change', {tabName})
}



export default TabView