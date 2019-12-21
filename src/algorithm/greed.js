//通过每个阶段的局部最优选择，从而达到全局最优解,但是可能为近似最优解。这样没有动态规划那么大的格局


//最少硬币找零
function minCoinChange(coins, amount) {
    const change = []
    let total = 0
    //从最大的面额开始，大的占得少
    for (let i = coins.length; i >= 0; i--) {
        const coin = coins[i]

        while (total + coin <= amount) {
            change.push(coin)
            total += coin
        }
    }
    return change
}


//装满背包
export function knapSack(capacity, weights, values) {
    const n = values.length;
    let load = 0;
    let val = 0;
    for (let i = 0; i < n && load < capacity; i++) {
        if (weights[i] <= capacity - load) {
            val += values[i];
            load += weights[i];
        } else {
            const r = (capacity - load) / weights[i];
            val += r * values[i];
            load += capacity - load
        }
    }
    return val;
}