const fs = require("fs");


const main = () => {
    let [startString, instructions] = fs.readFileSync("./input.txt", 'utf8').split('\n\n').map(c => c.split('\n'))
    startString =  startString[0].split("")


    const instMap = instructions.reduce((map, inst ) =>{
        const [pair, charToInsert] = inst.split(" -> ")

        map[pair] = charToInsert

        return map
    }, {})

    let pairs  = {}
    for (let i = 0; i < startString.length - 1; i++){
        const currentPair = startString[i]+startString[i+1]
        
        if (!pairs[currentPair]) pairs[currentPair] = 0
        pairs[currentPair]++
    }

    console.log({pairs})
    
    for (let i = 0; i < 40; i++ ){
        const newPairs = {}
        console.log({i}) 

        for (const [currentPair, val] of Object.entries(pairs)){
            //console.log(1, currentPair)
            if (instMap[currentPair]){
                const firstExtPair = currentPair.charAt(0) + instMap[currentPair]
                const sexondtExtPair = instMap[currentPair] + currentPair.charAt(1)
    
                if (!newPairs[firstExtPair]){
                    newPairs[firstExtPair] = pairs[currentPair] || 0
                } else{
                    newPairs[firstExtPair] += pairs[currentPair]
                }


                if (!newPairs[sexondtExtPair]){
                    newPairs[sexondtExtPair] = pairs[currentPair] || 0
                }  else {
                    newPairs[sexondtExtPair] += pairs[currentPair] || 0
                }
                continue
            }
        }
        pairs = newPairs
    }

    const charMap = {}

    for (const [currentPair, val] of Object.entries(pairs)){
        const firstChar = currentPair[0]
        const secondChar = currentPair[1]

        if (!charMap[firstChar]) charMap[firstChar] = 0
        if (!charMap[secondChar]) charMap[secondChar] = 0

        charMap[firstChar] += val
        charMap[secondChar] += val
    } 

    for (const [char, val] of Object.entries(charMap)){
        charMap[char] = Math.ceil(val / 2)
    }


   const [max, min] =  Object.entries(charMap).reduce(([max, min], [key, value]) => {
    
    if (value > max) max = value 
    if (value < min) min = value 
    return [max, min]
    }, [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY])









    console.log(max, min)
    console.log(max - min)


}

main()

/*

NNCB

if (inst)



2188189693529
2188189693529

*/