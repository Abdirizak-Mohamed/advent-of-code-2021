const fs = require("fs");

const main = () => {
    let input = fs.readFileSync("./input.txt", 'utf8')
    const rows = input.split("\n").map(row => row.split("").map(v => Number(v)))

    let total = 0
    
    for (let i = 0; i < 100; i++){
        total += getNumberFlashed(rows)
    }

    console.log({total})

}

const getNumberFlashed = (map) => {
    let newFlashes = []
    let flashCount = 0
    for (let y = 0; y < map.length; y++){
        for (let x = 0; x < map[y].length; x++){
            map[y][x]++
            if (map[y][x] === 10) newFlashes.push({x, y})
        }
    }

    while (newFlashes.length){
        let flash = newFlashes.shift()
        flashCount++

        const additionalFlashes = handleFlash(flash, map)
        newFlashes = [...newFlashes, ...additionalFlashes]
    }

    for (let y = 0; y < map.length; y++){
        for (let x = 0; x < map[y].length; x++){
            if(map[y][x] > 9) map[y][x] = 0
        }
    }
    
    
    return flashCount
}


const handleFlash = (flash, map) => {
    const newFlashes = []
    const adjacent = getAdj(flash, map)

    adjacent.forEach(val => {
        const { x, y } = val
        if (!map[y]?.[x]) return

        map[y][x]++

        if (map[y][x] === 10){
            newFlashes.push({x, y})
        }
    })

    return newFlashes
}


const getAdj = (flash, map) => {

    const {x, y} = flash
    const up = {val: map[y-1]?.[x], x , y: y-1 }
    const upRight = {val: map[y-1]?.[x+1], x: x+1, y: y-1 }
    const upLeft = {val: map[y-1]?.[x-1], x: x-1 , y: y-1 }
    const right = {val: map[y]?.[x + 1], x: x+1 , y }
    const left = {val: map[y]?.[x-1], x: x - 1 , y }
    const down = {val: map[y+1]?.[x], x , y: y+1 }
    const downRight = {val: map[y+1]?.[x+1], x: x + 1, y: y + 1 }
    const downLeft = {val: map[y+1]?.[x-1], x: x-1 , y: y+1}

    const adjacent = [up, upRight, upLeft, right, left, down, downRight, downLeft]

    return adjacent
}

main()