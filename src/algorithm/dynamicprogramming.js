//寻找子问题的最优解，然后解决父问题

//最少找零硬币问题
function minConChange(coins, amounts) {
    //存放最小的价值对应的硬币面额及数量
    const cache = []

    //递归子问题，得到最优解
    function makeChange(value) {
        //钱数小于等于0无解
        if (!value) {
            return []
        }
        //缓存器中有，则返回缓存器中的最优解
        if (cache[value]) {
            return cache[value]
        }
        //当前最优子问题的解
        let min = []
        let newMin
        //递归需要传入的值
        let newValue
        //遍历四种面额，找到该问题对应的最优解，因为cache中没有包含此问题的最优解，所以需要计算
        for (let i = 0; i < coins.length; i++) {
            let coin = coins[i]
            newValue = value - coin
            if (newValue >= 0) {
                //找到了newValue对应的最优解,即newValue对应的最优
                newMin = makeChange(newValue)
            }
            if (
                //newValue是满足条件的,即说明了value至少为1
                newValue >= 0 &&
                //min为空，说明是第一次循环或者第一次满足条件,不为空，则比较当面额的子问题最优解长度与之前的面额的子问题的最优解长度，小的时候才选当前面额
                (newMin.length < min.length - 1 || !min.length) &&
                //newMin必须合法，不合法时只有newValue为1（即value为1)时才进行min的赋值，不然是没有意义的
                (newMin.length || !newValue)
            ) {
                //添加上这次的硬币面额，也可以理解为在newValue最优解上加上此次面额，构成这一个循环的暂时最优解，用来与后续循环比较
                min = [coin].concat(newMin)
            }

        }
        //将此面额的最优解缓存起来，并且返回最优解
        cache[value] = min
        return cache[value]
    }

    return makeChange(amounts)
}

//01背包问题，动态规划
function KnapSack(capacity, weights, values, n) {
    //ks矩阵，根据物品数量构造
    const KS = []
    for (let i = 0; i <= n; i++) {
        KS[i] = []
    }
    for (let i = 0; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            //第一排第一列不需要
            if (i === 0 || w === 0) {
                KS[i][w] = 0;
            } else {
                //这个物品的质量小于背包的空间
                if (weights[i - 1] <= w) {
                    //不装这个物品的价值
                    let a = KS[i - 1][w]
                    //装这个物品的价值,加上不装它但是减去它重量的背包价值
                    let b = KS[i - 1][w - weights[i - 1]] + values[i - 1]
                    //我要最大的
                    KS[i][w] = a > b ? a : b
                } else {
                    //装不下，肯定不装了
                    KS[i][w] = KS[i - 1][w]
                }
            }
        }
    }

}


//最长公共子序列
function lcs(wordA, wordB) {
    const m = wordA.length
    const n = wordB.length
    const LCSTable = []
    for (let i = 0; i <= m; i++) {
        LCSTable[i] = []
    }
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            LCSTable[i][j] = 0
        }
    }
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0 || j === 0) {
                LCSTable[i][j] = 0
            } else if (wordA[i - 1] === wordB[j - 1]) {
                LCSTable[i][j] = LCSTable[i - 1][j - 1] + 1
            } else {
                //判断添加这个不相同字符时的最大长度，按列来，如果列上变大了，则这个长度也变大。
                //列上不变大，则跟左边的，也就是不扩大m的长度一样大
                const a = LCSTable[i - 1][j]
                const b = LCSTable[i][j - 1]
                LCSTable[i][j] = a > b ? a : b
            }
        }
    }
    return LCSTable[m][n]
}


//矩阵链相乘,矩阵链是给好了的
//这类题目体现了DP的实质，也是经典问题。(•̀˓◞•́)
//
// 假设我们要用标准的矩阵乘法计算M1M1、M2M2、M3M3的乘积M1M2M3M1M2M3，这三个矩阵的维数分别是2x10，10x2，2x10。
//
// 如果我们先把M1M1和M2M2相乘，然后把结果和M3M3相乘，即（（M1M2）M3）（（M1M2）M3）。那么要进行2x10x2+2x2x10=80次乘法；
// 如果我们先乘M2M2M3M3，结果再与M1M1相乘，即（M1（M2M3））（M1（M2M3））。那么数量乘法的次数就变成了：10x2x10+2x10x10=400。
// 可见，矩阵链相乘时的顺序不同，运算量也不同。而我们的目的是找到一种乘法顺序使得运算量最小。
//
// 我们注意到，对于矩阵链M1M2...MiM1M2...Mi，矩阵MiMi的列数一定等于矩阵Mi+1Mi+1的行数（1≤i<n1≤i<n），这是由矩阵乘法的定义决定的。
// 因此，对于一个矩阵链，我们指定每个矩阵的行数和最右面矩阵MnMn的列数就可以了。假设有n+1维数r1,r2,...,rn+1r1,r2,...,rn+1,这里riri表示矩阵MiMi的行数（1≤i≤n1≤i≤n），rn+1rn+1表示最矩阵MnMn的列数。
// 以后，我们用Mi,jMi,j来记MiMi+1...MjMiMi+1...Mj的乘积。用C[i][j]C[i][j]来记录链Mi,jMi,j数量乘法的次数。
// 对于给定的一对索引ii和j，1≤i<j≤nj，1≤i<j≤n，Mi,jMi,j可用如下方法计算：
//
// 设kk是i+1i+1和jj之间的一个索引，索引kk把矩阵链Mi,jMi,j分成了两部分：Mi,k−1=MiMi+1...Mk−1Mi,k−1=MiMi+1...Mk−1和Mk,j=MkMk+1...MjMk,j=MkMk+1...Mj。所以Mi,j=Mi,k−1Mk,jMi,j=Mi,k−1Mk,j。
//
// 用这种方法计算Mi,jMi,j的耗费（即数量乘法的次数），是计算Mi,k−1Mi,k−1的耗费加上计算Mk,jMk,j的耗费再加上Mi,k−1Mi,k−1乘以Mk,jMk,j的耗费（它是ri*rk*rj+1）。
//
// 我们需要遍历kk，找到使乘法MiMi+1...MjMiMi+1...Mj所需的数量乘法最小的kk值，我们有以下递推式：
//
// C[i][j]=C[i][j]=Mini<k≤jMini<k≤j{C[i][k−1]+C[k][j]+rirkrj+1}{C[i][k−1]+C[k][j]+rirkrj+1}
// 为了找出M1M2..MnM1M2..Mn的乘法次数，我们只需要解递推式：
//
// C[1][n]=C[1][n]=Min1<k≤nMin1<k≤n{C[1][k−1]+C[k][n]+rirkrn+1}
export function matrixChainOrder(p) {
    //最后一位为列
    const n = p.length - 1
    const m = []
    //对角线填充,因为自己不和自己相乘
    for (let i = 0; i <= n; i++) {
        m[i] = []
        m[i][i] = 0
    }
    console.log(m, "whatc")
    //填充d1到dn-1的对角线,下标从0开始
    for (let i = 2; i <= n; i++) {
        //填充di的对角线,每次都对角线上的一个元素
        for (let j = 1; j <= n - i + 1; j++) {
            //对角线上的结尾坐标
            let w = (i + j) - 1

            //k循环的次数跟对角线的顺序有关，随着i增大递增，为i—1
            for (let k = j; k <= w - 1; k++) {

                //从子问题出发
                const q = m[j][k] + m[k + 1][w] + ((p[j - 1] * p[k]) * p[w])

                if (q < m[j][w] || !m[j][w]) {
                    m[j][w] = q
                }

            }
        }
    }
    console.log(m)
    return m[1][n]
}