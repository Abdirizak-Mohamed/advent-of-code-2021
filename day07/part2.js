const fs = require("fs");

const main = () => {
    let input = fs.readFileSync("./input.txt", 'utf8')
    const startFish = input.split(",")

    const {max, min} = getMaxMin(startFish)

    let smallDiff = null

    for (let i = min; i <= max; i++){
        const diff = getDiff(startFish, i)
        if (smallDiff === null || diff < smallDiff) smallDiff = diff
    }

    console.log({smallDiff})
}


const getMaxMin = (fish) => {
    return fish.reduce((count, val) => {
        if (count.max === null || Number(val) > count.max) count.max = Number(val)
        if (count.min === null || Number(val) < count.min) count.min = Number(val)
        return count
    }, {max: null, min: null })

}


const getDiff = (fish, mode) => {
    return fish.reduce((count, val) => {
        const diff = Math.abs(mode - val)

        let diffCount = 0
        
        for(let i = 0; i <= diff; i++){
            diffCount += i
        }
        
        return count + diffCount
    }, 0)
}


main()