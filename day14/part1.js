const fs = require("fs");


const main = () => {
    let [startString, instructions] = fs.readFileSync("./input.txt", 'utf8').split('\n\n').map(c => c.split('\n'))
    startString =  startString[0].split("")
    
    for (let i = 0; i < 10; i++ ){
        const indexes = []
        instructions.forEach(inst => {
            const [pair, charToInsert] = inst.split(" -> ")
            for (let i = 0; i < startString.length; i++){
                if (startString[i]+startString[i+1] === pair){
                    indexes.push({i, charToInsert})
                }
            }
        })

        indexes.sort((a, b) => b.i - a.i)

        indexes.forEach(({i, charToInsert}) => {
            startString.splice(i + 1, 0, charToInsert)
        })

        //console.log(startString.join(''))
    }

    const map = startString.reduce((map, char) => {
        if (!map[char]){
            map[char] = 0
        }

        map[char]++
        return map
    }, {})


    console.log(map)

}

main()