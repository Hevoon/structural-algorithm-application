import {defaultEquals, defaultCompare, Compare} from "../../util"
import {mergeSort} from './sort'

const DOSE_NOT_EXIST = -1

//顺序搜索
function sequentialSearch(array, value, equalsFn = defaultEquals) {
    for (let i = 0; i < array.length; i++) {
        if (equalsFn(array[i], value)) {
            return i
        }
    }
    return DOSE_NOT_EXIST
}


//二分搜索 迭代法  递归法也就是分而治之
function binarySearch(array, value, compareFn = defaultCompare) {
    const sortedArray = mergeSort(array)
    let low = 0
    let high = sortedArray.length - 1
    while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        const elem = sortedArray(mid)
        if (compareFn(elem, value) === Compare.LESS_THAN) {
            low = mid + 1
        } else if (compareFn(elem, value) === Compare.BIGGER_THAN) {
            high = mid - 1
        } else {
            return mid
        }
    }
    return DOSE_NOT_EXIST
}


function binarySearchRe(array, low, high, value, compareFn) {
    if (low <= high) {
        let mid = Math.floor(low + high / 2)
        let elem = array[mid]
        if (compareFn(elem, value) === Compare.LESS_THAN) {
            binarySearchRe(array, mid, high, value, compareFn)
        } else if (compareFn(elem, value) === Compare.BIGGER_THAN) {
            binarySearchRe(array, low, mid - 1, value, compareFn)
        } else {
            return mid
        }
    }
    return DOSE_NOT_EXIST
}

function binarySearchD(array, value, compareFn = defaultCompare) {
    const sortedArray = mergeSort(array)
    return binarySearchRe(sortedArray, 0, sortedArray.length - 1, value, compareFn)
}


//内插搜索
function interpolationSearch(array, value, compareFn = defaultCompare) {
    const {length} = array
    let low = 0
    let high = length - 1
    let position = -1
    let delta = -1
    array = mergeSort(array)
    while (low <= high && value > array[low] && value < array[high]) {
        delta = (value - array[low]) / (array[high] - array[low])
        position = low + Math.floor((high - low) * delta)
        if (array[position] === value) {
            return position
        }
        if (compareFn(array[position], value) === Compare.LESS_THAN) {
            low = position + 1
        } else {
            high = position - 1
        }
    }
    return DOSE_NOT_EXIST
}