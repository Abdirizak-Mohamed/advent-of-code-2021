const fs = require("fs");
const util = require('util')


const main = () => {
     let [coOrds, instructions] = fs.readFileSync("./input.txt", 'utf8').split('\n\n').map(c => c.split('\n'))

    
    let map = createMap(coOrds)
    let foldedMap

    instructions.forEach(inst => {
        if (!foldedMap) foldedMap = map
        foldedMap = foldMap(foldedMap, inst).foldedMap
    })

    foldedMap.forEach(r => console.log(r.join('')))
}


const foldMap = (map, inst) => {
    const [axis, lineNumber] = inst.split(" ")[2].split("=")
    if (axis === 'x') return foldMapX(lineNumber, map)
    return foldMapY(lineNumber, map, lineNumber)

}


const foldMapX = (lineNumber, map) => {
    const newMap = []
    for (let i = 0; i < map.length; i++){
        newMap.push([])
        for  (let j = 0; j < lineNumber; j++){
            const currValue = map[i][j]
            if (currValue === '#' || map[i][((Number(lineNumber) + Number(lineNumber))) -j] === '#'){
                newMap[i].push('#')
                continue
            }
            newMap[i].push('.')
        }
    }
    return {foldedMap: newMap}

}

const foldMapY = (lineNumber, map) => {

    const newMap = []
    for (let i = 0; i < lineNumber; i++){
        newMap.push([])
        for  (let j = 0; j < map[i].length; j++){
            const currValue = map[i][j]
            if (currValue === '#' || map[(Number(lineNumber) + Number(lineNumber)) - i]?.[j] === '#'){
                newMap[i].push('#')
                continue
            }

            newMap[i].push('.')
        }
    }
    return {foldedMap: newMap}
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


/*

#.##.|#..
#...#|...
.....|#..
#...#|...
.#.#.|#.#
.....|...
.....|...

...#..#..#.
....#......
-----------
...........
#..........
...#....#.#
...........
...........
...........
...........
.#....#.##.
....#......
......#...#

fold y=2
[x]

Cant use length
use distance from


lineNumber + lineNumber - i 
*/