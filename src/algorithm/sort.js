import {swap, defaultCompare, Compare} from "../../util"


//堆排序(大顶堆)  改变原数组
export function heapSort(array, compareFn = defaultCompare) {
    let heapSize = array.length
    buildMaxHeap(array, compareFn)

    while (heapSize > 1) {
        swap(array, 0, --heapSize)
        heapify(array, 0, heapSize, compareFn)
    }

    function buildMaxHeap(array, compareFn) {
        for (let i = Math.floor((array.length / 2) - 1); i >= 0; i -= 1) {
            heapify(array, i, array.length, compareFn);
        }
        return array;
    }

    function heapify(array, index, heapSize, compareFn) {
        let element = index
        let left = index * 2 + 1
        let right = index * 2 + 2
        if (left < heapSize && compareFn(array[left], array[element]) === Compare.BIGGER_THAN) {
            element = left
        }
        if (right < heapSize && compareFn(array[right], array[element]) === Compare.BIGGER_THAN) {
            element = right
        }
        if (index !== element) {
            swap(array, index, element)
            heapify(array, element, heapSize, compareFn)
        }
    }

    return array
}


//冒泡排序 复杂度O(n²) 改变原数组
export function bubbleSort(array, compareFn = defaultCompare) {
    const {length} = array
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j, j + 1)
            }
        }
    }
    return array
}


//选择排序  复杂度O(n²) 改变原数组
export function selectionSort(array, compareFn = defaultCompare) {
    const length = array.length
    let indexMin
    for (let i = 0; i < length - 1; i++) {
        indexMin = i
        for (let j = i + 1; j < length; j++) {
            if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
                indexMin = j
            }
        }
        if (i !== indexMin) {
            swap(array, i, indexMin)
        }
    }
    return array
}


//插入排序 复杂度O(n²) 改变原数组
export function insertSort(array, compareFn = defaultCompare) {
    const {length} = array
    let temp
    for (let i = 1; i < length; i++) {
        let j = i
        temp = array[i]
        while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
            array[j] = array[j - 1]
            j--
        }
        array[j] = temp
    }
    return array
}


//归并排序 复杂度O(n*log(n))  不改变原数组
export function mergeSort(array, compareFn = defaultCompare) {
    if (array.length > 1) {
        const {length} = array
        const middle = Math.floor(length / 2)
        const left = mergeSort(array.slice(0, middle), compareFn)
        const right = mergeSort(array.slice(middle, length), compareFn)
        array = merge(left, right, compareFn)
    }
    return array
}

function merge(a, b, compareFn) {
    let i = 0
    let j = 0
    const result = []
    while (i < a.length && j < b.length) {
        result.push(compareFn(a[i], b[j]) === Compare.LESS_THAN ? a[i++] : b[j++])
    }
    return result.concat(i < a.length ? a.splice(i) : b.splice(j))
}


//快速排序 复杂度O(n*log(n)) 改变原数组
export function quickSort(array, compareFn = defaultCompare) {
    return quick(array, 0, array.length - 1, compareFn)
}

//递归
function quick(array, left, right, compareFn) {
    let index
    console.log(array.length)
    if (array.length > 1) {
        index = partition(array, left, right, compareFn);
        if (left < index - 1) {
            quick(array, left, index - 1, compareFn);
        }
        if (index < right) {
            quick(array, index, right, compareFn);
        }
    }
    return array
}


//划分
function partition(array, left, right, compareFn) {
    const pivot = array[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;
    while (i <= j) {
        while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
            i++;
        }
        while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
            j--;
        }
        if (i <= j) {//相等很重要
            swap(array, i, j);
            i++;
            j--;
        }
    }
    return i;
}


//计数排序  O(n+k) 不改变原数组
export function countSort(array) {
    if (array.length < 2) {
        return array
    }
    const maxValue = findMaxValue(array)
    console.log(maxValue, 'max')
    const counts = new Array(maxValue + 1)
    array.forEach(elem => {
        if (!counts[elem]) {
            counts[elem] = 0
        }
        counts[elem]++
    })
    let sortIndex = 0
    counts.forEach((count, i) => {
        while (count > 0) {
            array[sortIndex++] = i
            count--
        }
    })
    return array
}

function findMaxValue(array) {
    let max = array[0]
    for (let i = 1; i < array.length; i++) {
        if (max < array[i]) {
            max = array[i]
        }
    }
    return max
}


//桶排序 O(n+c) 不改变原数组
export function bucketSort(array, bucketSize = 5) {
    if (array < 2) {
        return array
    }
    const buckets = createBuckets(array, bucketSize)
    return sortBuckets(buckets)
}

function createBuckets(array, bucketSize) {
    let min = array[0]
    let max = array[0]
    array.forEach(e => {
        if (e < min) {
            min = e
        }
        if (e > max) {
            max = e
        }
    })
    const bucketCount = Math.floor((max - min) / bucketSize) + 1
    const buckets = []
    for (let i = 0; i < bucketCount; i++) {
        buckets[i] = []
    }
    for (let i = 0; i < array.length; i++) {
        let bucketIndex = Math.floor((array[i] - min) / bucketSize)
        buckets[bucketIndex].push(array[i])
    }
    return buckets
}

function sortBuckets(buckets) {
    const sortArray = []
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] != null) {
            insertSort(buckets[i])
            sortArray.push(...buckets[i])
        }
    }
    return sortArray
}