class SetPlus {
    constructor() {
        this._items = {}
    }

    has(elem = {}) {
        return Object.prototype.hasOwnProperty.call(this._items, elem)
    }

    add(elem) {
        if (this.has(elem)) {
            return false
        }
        this._items[elem] = elem
    }

    delete(elem) {
        if (this.has(elem)) {
            delete this._items[elem]
            return true
        }
        return false
    }

    clear() {
        this._items = {}
    }

    size() {
        if (Object.keys) {
            return Object.keys(this._items).length
        } else {
            let count = 0
            for (let key in this._items) {
                if (this._items.hasOwnProperty(key)) {
                    count++
                }
            }
            return count
        }
    }

    values() {
        if (Object.values) {
            return Object.values(this._items)
        } else {
            let values = []
            for (let key in this._items) {
                if (this._items.hasOwnProperty(key)) {
                    values.push(key)
                }
            }
            return values
        }

    }

    union(otherSet) {
        const unionSet = new SetPlus()
        this.values().forEach(e => unionSet.add(e))
        otherSet.values().forEach(e => unionSet.add(e))
        return unionSet
    }

    intersection(otherSet) {
        const intersection = new SetPlus()
        let baseSet = this.values()
        let compareSet = otherSet.values()
        if (this.values().length > otherSet.values().length) {
            let baseSet = compareSet
            let compareSet = this.values()
        }
        baseSet.forEach(e => {
            if (compareSet.includes(value)) {
                intersection.add(e)
            }
        })
        return intersection
    }


    difference(otherSet) {
        const differenceSet = new SetPlus()
        let compare = this.values()
        compare.forEach(e => {
            if (!otherSet.has(e)) {
                differenceSet.add(e)
            }
        })
        return differenceSet
    }

    isSubsetOf(otherSet) {
        if (this.size() > otherSet.size()) {
            return false
        }
        let isSubset = true
        this.values().every(e => {
            if (!otherSet.has(e)) {
                isSubset = false
                return false
            }
            return true
        })
        return isSubset
    }

}

