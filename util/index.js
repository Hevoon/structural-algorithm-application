export function defaultEquals(a, b) {
    return a === b;
}


export function defaultToString(item) {
    if (item == null) {
        return 'null'
    } else if (item === undefined) {
        return 'undefined'
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`
    }
    return item.toString()
}


export function defaultCompare(key, orgKey) {
    if (key === orgKey) {
        return 'equal'
    }
    if (key < orgKey) {
        return -1
    } else {
        return 1
    }
}

export function defaultCallback(e) {
    console.log(e)
}

export function reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a);
}

export function swap(array, a, b) {
    const temp = array[a]
    array[a] = array[b]
    array[b] = temp
}


export function createNonSortedArray(size) {
    const array = [];
    for (let i = size; i > 0; i--) {
        array.push(i);
    }
    return array;
}


export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}


export const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};