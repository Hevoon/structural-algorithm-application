import {defaultEquals} from '../../util'
import {Node, DoublyNode} from './models/linked-list-models'

class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this._count = 0
        this._head = null
        this.equalsFn = equalsFn
    }

    push(elem) {
        const node = new Node(elem)
        let current
        if (this._head === null) {
            this._head = node
        } else {
            current = this._head
            while (current.next != null) {
                current = current.next
            }
            current.next = node
        }
        this._count++
    }

    insert(elem, index) {
        if (index >= 0 && index <= this._count) {
            const node = new Node(elem)
            if (index === 0) {
                node.next = this._head
                this._head = node
            } else {
                let previous = this.getElementAt(index - 1)
                node.next = previous.next
                previous.next = node
            }
            this._count++
            return true
        }
        return false
    }

    getElementAt(index) {
        if (index >= 0 && index < this._count) {
            let node = this._head
            for (let i = 0; i < index && node != null; i++) {
                node = node.next
            }
            return node
        }
        return undefined
    }

    remove(elem) {
        const index = this.indexOf(elem)
        return this.removeAt(index)
    }

    removeAt(index) {
        if (index >= 0 && index < this._count) {
            let current
            if (index === 0) {
                current = this._head
                this._head = current.next
            } else {
                let previous = this.getElementAt(index - 1)
                current = previous.next
                previous.next = current.next
            }
            this._count--
            return current.data
        }
        return undefined
    }

    indexOf(elem) {
        let current = this._head
        for (let i = 0; i < this._count && current != null; i++) {
            if (this.equalsFn(elem, current.data)) {
                return i
            }
            current = current.next
        }
        return -1
    }

    isEmpty() {
        return this._count === 0
    }

    size() {
        return this._count
    }

    getHead() {
        return this._head
    }

    toString() {
        if (this.isEmpty()) {
            return ''
        }
        let result = `${this._head.data}`
        let current = this._head.next
        for (let i = 1; i < this._count && current != null; i++) {
            result = `${result},${current.data}`
        }
        return result
    }
}

class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn)
        this._tail = null
    }

    push(elem) {
        const node = new DoublyNode(elem)
        let current
        if (this._head === null) {
            this._head = node
            this._tail = node
        } else {
            current = this._head
            while (current.next != null) {
                current = current.next
            }
            current.next = node
            node.prev = current
            this._tail = node
        }
        this._count++
    }

    insert(elem, index) {
        if (index >= 0 && index <= this._count) {
            const node = new DoublyNode(elem)
            let current
            if (index === 0) {
                if (this._head === null) {
                    this._tail = node
                    this._head = node
                } else {
                    node.next = this._head
                    this._head.prev = node
                    this._head = node
                }
            } else if (index === this.count) {
                current = this._tail
                current.next = node
                node.prev = current
                this._tail = node
            } else {
                let previous = this.getElementAt(index - 1)
                current = previous.next
                current.prev = node
                node.prev = previous
                node.next = current
                previous.next = node
            }
            this._count++
            return true
        }
        return false
    }

    removeAt(index) {
        if (index >= 0 && index < this._count) {
            let current = this._head
            if (index === 0) {
                this._head = current.next
                if (this._count === 1) {
                    this._tail = current.next
                } else {
                    this._head.prev = null
                }
            } else if (index === this.count - 1) {
                current = this._tail
                this._tail = current.prev
                this._tail.next = null
            } else {
                current = this.getElementAt(index)
                const previous = current.prev
                previous.next = current.next
                current.next.prev = previous
            }
            this._count--
            return true
        }
        return undefined
    }

    getTial() {
        return this._tail
    }
}

class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn)
    }

    push(elem) {
        const node = new Node(elem)
        let current
        if (this._head === null) {
            this._head = node
            node.next = this._head
        } else {
            current = this._head
            while (current.next != null) {
                current = current.next
            }
            current.next = node
            node.next = this._head
        }
        this._count++
    }

    insert(elem, index) {
        if (index >= 0 && index <= this._count) {
            const node = new DoublyNode(elem)
            let current
            if (index === 0) {
                if (this._head === null) {
                    this._head = node
                    node.next = this._head
                } else {
                    node.next = this._head
                    current = this.getElementAt(this.size())
                    this._head = node
                    current.next = this._head
                }
            } else {
                let previous = this.getElementAt(index - 1)
                node.next = previous.next
                previous.next = node
            }
            this._count++
            return true
        }
        return false
    }

    removeAt(index) {
        if (index >= 0 && index < this._count) {
            let current = this._head
            if (index === 0) {
                if (this._count === 1) {
                    this._head = null
                } else {
                    const removed = this._head
                    current = this.getElementAt(this.size())
                    this._head = this._head.next
                    current.next = this._head
                    current = removed
                }
            } else {
                const previous = this.getElementAt(index - 1)
                current = previous.next
                previous.next = current.next
            }
            this._count--
            return current.data
        }
        return undefined
    }
}

export default {
    LinkedList,
    DoublyLinkedList,
    CircularLinkedList
}