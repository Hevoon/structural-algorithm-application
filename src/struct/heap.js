import {Compare, defaultCompare, reverseCompare, swap} from '../../util'

class MinHeap {
    constructor(compareFN = defaultCompare) {
        this.compareFn = compareFN
        this.heap = []
    }

    getLeftIndex(index) {
        return 2 * index + 1
    }

    getRightIndex(index) {
        return 2 * index + 2
    }

    getParentIndex(index) {
        if (index === 0) {
            return null
        }
        return Math.floor((index - 1) / 2)
    }

    insert(value) {
        if (value != null) {
            this.heap.push(value)
            this.siftUp(this.heap.length - 1)
            return true
        }
        return false
    }

    siftUp(index) {
        let parent = this.getParentIndex(index)
        while (index > 0 && this.compareFn(this.heap[index], this.heap[parent]) === Compare.LESS_THAN) {
            swap(this.heap, parent, index)
            index = parent
            parent = this.getParentIndex(index)
        }
    }


    size() {
        return this.heap.length
    }

    isEmpty() {
        return this.heap.length === 0
    }

    pop() {
        return this.isEmpty() ? undefined : this.heap[0]
    }

    extract() {
        if (this.isEmpty()) {
            return undefined
        }
        if (this.size() === 1) {
            return this.heap.shift()
        }
        swap(this.heap, 0, this.heap.length - 1)
        const removedValue = this.heap.pop()
        this.siftDown(0)
        return removedValue
    }

    siftDown(index) {
        let element = index
        const left = this.getLeftIndex(index)
        const right = this.getRightIndex(index)
        const size = this.size()
        console.log(this.heap[index], index)
        if (left < size && this.compareFn(this.heap[left], this.heap[element]) === Compare.LESS_THAN) {
            element = left
        }
        if (right < size && this.compareFn(this.heap[right], this.heap[element]) === Compare.LESS_THAN) {
            element = right
        }
        if (index !== element) {
            swap(this.heap, index, element)
            this.siftDown(element)
        }
    }
}

class MaxHeap extends MinHeap {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = reverseCompare(compareFn);
    }
}

export default {MinHeap, MaxHeap}