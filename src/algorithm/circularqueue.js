import queue from '../struct/queue.js'

function hotPotato(elementList, num) {
    const queue = new queue.Queue()
    const eliminatedList = []

    for (let i = 0; i < elementList.length; i++) {
        queue.enqueue(elementList[i])
    }

    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue())
        }
        eliminatedList.push(queue.dequeue())
    }

    return {
        eliminated: eliminatedList,
        winner: queue.dequeue()
    }
}


function palindromeChecker(string) {
    if (string === undefined || string == null || string.length === 0) {
        return false
    }
    const deque = new queue.Deque()
    const lowerSting = string.toLocaleLowerCase().split(' ').join('')
    let isEqual = true
    let firstChar, lastChar
    for (let i = 0; i < string.length; i++) {
        deque.addBack(lowerSting.charAt(i))
    }
    while (deque.size() > 1 && isEqual) {
        firstChar = deque.removeFront()
        lastChar = deque.removeBack()
        if (firstChar !== lastChar) {
            isEqual = false
        }
    }
    return isEqual
}