export class Node {
    constructor(elem) {
        this.data = elem
        this.next = null
    }
}

export class DoublyNode extends Node {
    constructor(elem, next, prev) {
        super(elem, next)
        this.prev = prev
    }
}