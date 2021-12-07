const fs = require("fs");

const main = () => {
    let input = fs.readFileSync("./input.txt", 'utf8')
    const startFish = input.split(",")
    let collapsedFish = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0
    }
    startFish.forEach((val) => collapsedFish[Number(val)]++)


    for (let i = 0; i < 256; i++){
        
        const newCollapsedFish = {}
        for(let j = 8; j > -1; j-- ){
            if (j !== 0 ){
                newCollapsedFish[j - 1] = collapsedFish[j]
                continue
            }

            newCollapsedFish[8] = collapsedFish[0]
            newCollapsedFish[6] += collapsedFish[0]

        }
        collapsedFish = newCollapsedFish
    
    }

    let total = 0
    for(let j = 8; j > -1; j-- ){
        total += collapsedFish[j]
    }

     console.log(total)
}


main()