import {defaultToString} from '../../util'

class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn
        this.table = {}
    }

    hasKey(key) {
        return this.table[this.toStrFn(key)] != null
    }

    set(key, value) {
        if (key == null || key === undefined) {
            key = this.toStrFn(key)
            this.table[key] = value
        }
    }
}