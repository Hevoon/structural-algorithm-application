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

export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}


export const  BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};