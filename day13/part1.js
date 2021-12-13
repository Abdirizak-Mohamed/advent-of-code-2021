const fs = require("fs");


const main = () => {
    let [coOrds, instructions] = fs.readFileSync("./input.txt", 'utf8').split('\n\n').map(c => c.split('\n'))
    
    let map = createMap(coOrds)
    let { foldedMap, count } = foldMap(map, instructions[0])
    console.log(count)


}


const foldMap = (map, inst) => {
    const [axis, lineNumber] = inst.split(" ")[2].split("=")
    if (axis === 'x') return foldMapX(lineNumber, map)
    return foldMapY(lineNumber, map)

}


const foldMapX = (lineNumber, map) => {
     const newMap = []
     let count = 0
    for (let i = 0; i < map.length; i++){
        newMap.push([])
        for  (let j = 0; j < lineNumber; j++){
            const currValue = map[i][j]
            if (currValue === '#' || map[i][map[i].length -1 - j] === '#'){
                newMap[i].unshift('#')
                count++
                continue
            }
            newMap[i].unshift('.')
        }
    }
    return {foldedMap: newMap, count}

}

const foldMapY = (lineNumber, map) => {
    const newMap = []
    let count = 0

    for (let i = 0; i < lineNumber; i++){
        newMap.push([])
        for  (let j = 0; j < map[i].length; j++){
            const currValue = map[i][j]
            if (currValue === '#' || map[map.length -1 - i][j] === '#'){
                newMap[i].push('#')
                count++
                continue
            }

            newMap[i].push('.')
        }
    }
    return {foldedMap: newMap, count}
}



const createMap = (coOrds) => {
    const [maxX, maxY] =  getMax(coOrds)
    
    const paper =  Array(maxY + 1).fill().map(y =>  Array(maxX + 1).fill().map(() => "."))
    coOrds.forEach((c) => {
    const [x, y] = c.split(',')
        paper[Number(y)][Number(x)] = '#'
    })

    return paper
}


const getMax = (coOrds) => {
    return coOrds.reduce((maxes, c) => {
        const [x, y] = c.split(',')
        if (Number(x) > Number(maxes[0])) maxes[0] = Number(x)
        if (Number(y) > Number(maxes[1])) maxes[1] = Number(y)
        return maxes
    }, [0, 0])
}

main()