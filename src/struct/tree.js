import {Node} from './models/tree-models'
import {Compare, defaultCompare, defaultCallback, BalanceFactor} from '../../util'

class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.root = null
    }

    insert(key) {
        if (this.root == null) {
            this.root = new Node(key)
        } else {
            this.insertNode(this.root, key)
        }
    }

    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }

    inOrderTraverse(callback = defaultCallback) {
        this.inOrderTraverseNode(this.root, callback)
    }

    preOrderTraverse(callback = defaultCallback) {
        this.preOrderTraverseNode(this.root, callback)
    }

    postOrderTraverse(callback = defaultCallback) {
        this.postOrderTraverseNode(this.root, callback)
    }

    inOrderTraverseNode(node, callback) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback)
            callback(node.key)
            this.inOrderTraverseNode(node.right, callback)

        }
    }

    preOrderTraverseNode(node, callback) {
        if (node != null) {
            callback(node.key)
            this.preOrderTraverseNode(node.left, callback)
            this.preOrderTraverseNode(node.right, callback)

        }
    }

    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }

    min() {
        return this.minNode(this.root)
    }

    minNode(node) {
        let current = node
        while (current != null && current.left != null) {
            current = current.left
        }
        return current
    }

    max() {
        return this.maxNode(this.root)
    }

    maxNode(node) {
        let current = node
        while (current != null && current.right != null) {
            current = current.right
        }
        return current
    }

    search(key) {
        return this.searchNode(this.root, key)
    }

    searchNode(node, key) {
        if (node == null) {
            return false
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key)
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key)
        } else {
            return true
        }
    }

    remove(key) {
        this.root = this.removeNode(this.root, key)
    }

    removeNode(node, key) {
        if (node == null) {
            return null
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key)
            return node
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key)
            return node
        } else {
            if (node.left == null && node.right == null) {
                node = null
                return node
            }
            if (node.left == null) {
                node = node.right
                return node
            } else if (node.right == null) {
                node = node.left
                return node
            }

            const aux = this.minNode(node.right)
            node.key = aux.key
            node.right = this.removeNode(node.right, aux)
            return node
        }
    }

}

class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = compareFn
        this.root = null
    }

    getNodeHeight(node) {
        if (node == null) {
            return -1
        }
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
    }


    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
        switch (heightDifference) {
            case -2 :
                return BalanceFactor.UNBALANCED_RIGHT
            case -1 :
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            case 1 :
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            case 2 :
                return BalanceFactor.UNBALANCED_LEFT
            default:
                return BalanceFactor.BALANCED
        }
    }

    rotationLL(node) {
        const tmp = node.left
        node.left = tmp.right
        tmp.right = node
        return tmp
    }

    rotationRR(node) {
        const tmp = node.right
        node.right = tmp.left
        tmp.left = node
        return tmp
    }

    rotationLR(node) {
        node.left = this.rotationRR(node.left)
        return this.rotationLL(node)
    }

    rotationRL(node) {
        node.left = this.rotationLL(node.left)
        return this.rotationRR(node)
    }

    insert(key) {
        this.root = this.insertNode(this.root, key)
    }

    remove(key) {
        this.root = this.removeNode(this.root, key)
    }

    insertNode(node, key) {
        if (node == null) {
            return new Node(key)
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key)
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key)
        } else {
            return node
        }

        const balanceFactor = this.getBalanceFactor(node)
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            //如果在向左侧子树插入节点后树不平衡，我们需要比较是否插入的键小于左侧子节点的键。
            //如果是，我们要进行 LL 旋转。否则，要进行 LR 旋转
            if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
                return this.rotationLL(node)
            } else {
                return this.rotationLR(node)
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            //如果在向左侧子树插入节点后树不平衡，我们需要比较是否插入的键小于左侧子节点的键。
            //如果是，我们要进行 LL 旋转。否则，要进行 LR 旋转
            if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
                return this.rotationRR(node)
            } else {
                return this.rotationRL(node)
            }
        }
        return node
    }


    removeNode(node, key) {
        //super中this指向子类，所以递归的时候调用的是本函数
        node = super.removeNode(node, key)
        if (node == null) {
            return node
        }
        const balanceFactor = this.getBalanceFactor(node)
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            //移除后的子树肯定是个平衡的，因为移除之前是平衡的
            const balanceFactorLeft = this.getBalanceFactor(node.left)
            if (balanceFactorLeft === BalanceFactor.BALANCED || BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationLL(node)
            }
            if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationLR(node)
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            const balanceFactorRight = this.getBalanceFactor(node.right);
            if (balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationRR(node);
            }
            if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationRL(node.right);
            }
        }
        return node;

    }
}

export default {BinarySearchTree, AVLTree}