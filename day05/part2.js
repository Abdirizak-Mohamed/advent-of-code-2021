const fs = require("fs");

const main = () => {
    let input = fs.readFileSync("./testInput.txt", 'utf8')
    const vents = input.split("\n"); 
    const mapValues = getMapMaxMin(vents)

    const map = createMap(mapValues)

    markMap(map, mapValues.instructions)

    const count = countMap(map)
    console.log(count)

}



const createMap = (values) => {
    const map = []
    
    for (let i = 0;  i <= values.maxY; i++){
        map.push([])
        for (let j = 0; j <= values.maxX; j++){
            map[i].push({marked: false, markedCount: 0})
        }
    }

    return map
}


const getMapMaxMin = (vents) => {
    return vents.reduce((coords, value) => {
        const ventCoOrds  = value.split(" -> ")
        const instruction = {from: [], to: []}
        ventCoOrds.forEach((element, idx) => {
            let values =  element.split(",")
            const x = Number(values[0])
            const y = Number(values[1])


            if(coords.minX === ""|| x < coords.minX) coords.minX = x 
            if(coords.minY === ""|| y < coords.minY) coords.minY = y
            if(coords.maxX === ""|| x > coords.maxX) coords.maxX = x
            if(coords.maxY === ""|| y > coords.maxY) coords.maxY = y


           if  (idx === 0) {
            instruction.from = [x, y]
            return
           }
                
            instruction.to = [x, y]
            
        });

        coords.instructions.push(instruction)
        return coords


    }, {maxX: "", maxY: "", minX:"", minY: "", instructions: []})
}

const markMap = (map, instructions) => {
    
    instructions.forEach(inst => {

        if (inst.from[0] !== inst.to[0] && inst.from[1] !== inst.to[1]){
            handleDiagonal(inst, map)
            return
        }  

        if (inst.from[0] !== inst.to[0]){
            handleX(inst, map)
            return
        }

        handleY(inst, map)

        
    })


    return map
}

const handleX = (inst, map) => {
    let startX = inst.from[0] 

    if (inst.from[0] < inst.to[0]){
        while (startX <= inst.to[0]){
            map[inst.from[1]][startX].markedCount++
            startX++
        }
        return
    }

    if (inst.from[0] > inst.to[0]){
        while (startX >= inst.to[0]){
            map[inst.from[1]][startX].markedCount++
            startX--
        }
    }
}

const handleY = (inst, map) => {
    let startY = inst.from[1] 

    if (inst.from[1] < inst.to[1]){
        while (startY <= inst.to[1]){
            map[startY][inst.from[0]].markedCount++
            startY++
        }
        return
    }

    if (inst.from[1] > inst.to[1]){
        while (startY >= inst.to[1]){
            map[startY][inst.from[0]].markedCount++
            startY--
        }
    }
}

const handleDiagonal = (inst, map) => {
    let startY = inst.from[1] 
    let startX = inst.from[0] 

    if (inst.from[0] > inst.to[0] && inst.from[1] > inst.to[1] ){
        while (startY >= inst.to[1]){
            map[startY][startX].markedCount++
            startY--
            startX--
        }
        return
    }

    if (inst.from[0] > inst.to[0] && inst.from[1] < inst.to[1] ){
        while (startY <= inst.to[1]){
            map[startY][startX].markedCount++
            startY++
            startX--
        }
        return

    }

    if (inst.from[0] < inst.to[0] && inst.from[1] < inst.to[1] ){
        while (startY <= inst.to[1]){
            map[startY][startX].markedCount++
            startY++
            startX++
        }
        return
    }

    while (startX <= inst.to[0]){
        map[startY][startX].markedCount++
        startY--
        startX++
    }
    return

}

const countMap = (map) => {
    let count = 0
    for (let i = 0;  i < map.length; i++){
        for (let j = 0; j < map[i].length; j++){
            if (map[i][j].markedCount > 1) count++
        }
    }

    return count

}

main()

/*



Up Right 



Up Left 


Down Right 


Down Left 


[
    y
    X[ ]
]
[0, 1] [10, 2]
Cycle through input  Get Max X max Y
So I am going to create the full graph of max X max Y 

Then I am going to paint instructions onto map
Then Count number counted above 1

instructions
[
 {from: [], to: []}
]

*/