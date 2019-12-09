class StackArr {
    constructor() {
        this._items = []
    }

    push(elem) {
        this._items.push(elem)
    }

    pop() {
        return this._items.pop()
    }

    peek() {
        return this._items[this._items.length - 1]
    }

    isEmpty() {
        return this._items.length === 0
    }

    clear() {
        this._items = []
    }

    size() {
        return this._items.length
    }
}


class StackObj {
    constructor() {
        this._items = {}
        this._count = 0
    }

    push(elem) {
        this._items[this._count] = elem
        this._count++
    }

    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this._count--
        let result = this._items[this._count]
        delete this._items[this._count]
        return result
    }

    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this._items[this._count - 1]
    }

    isEmpty() {
        return this._count === 0
    }

    clear() {
        this._items = {}
        this._count = 0
    }

    size() {
        return this._count
    }

    toString() {
        if (this.isEmpty()) {
            return ''
        }
        let elemString = `${this._items[0]}`
        for (let i = 1; i < this._count; i++) {
            elemString = `${elemString},${this._items[i]}`
        }
        return elemString
    }
}

export default {
    StackArr,
    StackObj
}