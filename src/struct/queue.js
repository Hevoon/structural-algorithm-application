class Queue {
    constructor() {
        this._items = {}
        this._count = 0
        this._lastCount = 0
    }

    isEmpty() {
        return this._count - this._lastCount === 0
    }

    size() {
        return this._count - this._lastCount
    }

    enqueue(elem) {
        this._items[this._count] = elem
        this._count++
    }

    dequeue() {
        if (this.isEmpty()) {
            return undefined
        }
        let result = this._items[this._lastCount]
        delete this._items[this._lastCount]
        this._lastCount++
        return result
    }

    peek() {
        if (this.isEmpty()) {
            return undefined
        }
        return this._items[this.__lastCount]
    }

    clear() {
        this._items = {}
        this._count = 0
        this._lastCount = 0
    }

    toString() {
        if (this.isEmpty()) {
            return undefined
        }
        let result = `${this._items[this._lastCount]}`
        for (let i = this._lastCount + 1; i < this._count; i++) {
            result = `${result},${this._items[i]}`
        }
        return result
    }
}

class Deque {
    constructor() {
        this._items = {}
        this._count = 0
        this._lastCount = 0
    }

    isEmpty() {
        return this._count - this._lastCount === 0
    }

    size() {
        return this._count - this._lastCount
    }

    addFront(elem) {
        if (this.isEmpty()) {
            this.addBack(elem)
        } else if (this._lastCount > 0) {
            this._lastCount--
            this._items[this._lastCount] = elem
        } else {
            for (let i = this._count; i > 0; i--) {
                this._items[i] = this._items[i - 1]
            }
            this._count++
            this._lastCount = 0
            this._items[0] = elem
        }

    }

    addBack(elem) {
        this._items[this._count] = elem
        this._count++
    }

    removeFront() {
        if (this.isEmpty()) {
            return undefined
        }
        let result = this._items[this._lastCount]
        delete this._items[this._lastCount]
        this._lastCount++
        return result
    }

    removeBack() {
        if (this.isEmpty()) {
            return undefined
        }
        this._count--
        let result = this._items[this._count]
        delete this._items[this._count]
        return result
    }

    peekFront() {
        if (this.isEmpty()) {
            return undefined
        }
        return this._items[this._lastCount]
    }

    peekBack() {
        if (this.isEmpty()) {
            return undefined
        }
        return this._items[this._count - 1]
    }

    clear() {
        this._items = {}
        this._count = 0
        this._lastCount = 0
    }

    toString() {
        if (this.isEmpty()) {
            return undefined
        }
        let result = `${this._items[this._lastCount]}`
        for (let i = this._lastCount + 1; i < this._count; i++) {
            result = `${result},${this._items[i]}`
        }
        return result
    }
}

export default {
    Queue,
    Deque
}