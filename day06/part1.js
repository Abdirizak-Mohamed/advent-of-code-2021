const fs = require("fs");

const main = () => {
    let input = fs.readFileSync("./input.txt", 'utf8')
    const startFish = input.split(",")
    let fish = startFish.map((val) => {return {days: Number(val), newBorn: false }})

    for (let i = 0; i < 256; i++){
        const newFish = []
        fish.forEach(fish => {
            if (fish.days !== 0 ){
                fish.days-- 
                return 
            }

        newFish.push({
            days: 8, 
            newBorn: true
        })

        fish.days = 6

        })
    
        fish = [...fish, ...newFish]


    }

    console.log(fish.length)

}


main()