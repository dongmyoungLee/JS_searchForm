const tag = '[View]'

export default {
    init(el) {
        if (!el) 
            throw el
        this.el = el
        return this
    }
}