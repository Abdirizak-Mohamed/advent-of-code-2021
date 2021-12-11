const fs = require("fs");

const main = () => {
    let input = fs.readFileSync("./input.txt", 'utf8')
    const rows = input.split("\n")
    const map = rows.map(row => row.split(""))
    const lows = findLows(map)

    
    const sizes = lows.map((low) => {
        const newMap = rows.map(row => row.split("").map(r => {return { val: r, isVisited:false}}))
        newMap[low.y][low.x].isVisited = true
        let size = findBasinSize(low, newMap)
        return size
    })

    console.log(sizes.sort((a, b) => b - a).filter((v, idx ) => idx < 3))

}


const findBasinSize = (low, map) => {
    const validNeighbours = getNeigbours(low, map)

    let count = validNeighbours.length + 1
     while (validNeighbours.length){
         let min = validNeighbours.shift()

         map[min.y][min.x].isVisited = true
         const neighbours = getNeigbours(min, map)

        count += neighbours.length
        neighbours.forEach(n => validNeighbours.push(n))
     }
    
     return count
}


const getNeigbours = (point, map) => {
    const right = { value: map[point.y]?.[point.x + 1]?.val, y: point.y, x: point.x + 1}
    const left = { value: map[point.y]?.[point.x-1]?.val, y: point.y, x: point.x - 1}
    const up = { value: map[point.y-1]?.[point.x]?.val, y: point.y - 1, x: point.x}
    const down = { value: map[point.y+1]?.[point.x]?.val, y: point.y + 1, x: point.x}
    
    return [right, left, up, down].filter(neighbour =>{ 
        if (!compareNeighours(point.value, neighbour.value) || map[neighbour.y][neighbour.x].isVisited) return false 
        map[neighbour.y][neighbour.x].isVisited = true
        return true
    })
}

const findLows = (map) => {
    const lows = []

    for (let i = 0; i < map.length; i++){
        for (let j = 0; j < map[i].length; j++){
            const right = map[i][j+1]
            const left = map[i][j-1]
            const up = map[i-1]?.[j]
            const down = map[i+1]?.[j]
            const point = map[i][j]

            if (comparePoints(point, right) && comparePoints(point, left) 
            && comparePoints(point, up) && comparePoints(point, down)) lows.push({ value: Number(point), y: i, x: j}) 
        }
    }

    return lows
}

const comparePoints = (point, pointTwo) => {
    return !pointTwo || Number(point) < Number(pointTwo)
}

const compareNeighours = (point, pointTwo) => {
    return pointTwo && Number(point) < Number(pointTwo) && Number(pointTwo) !== 9
}

main()