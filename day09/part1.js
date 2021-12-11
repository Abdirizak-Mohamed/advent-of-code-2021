const fs = require("fs");

const main = () => {
    let input = fs.readFileSync("./testInput.txt", 'utf8')
    const rows = input.split("\n")
    const map = rows.map(row => row.split(""))
    const lows = []

    for (let i = 0; i < map.length; i++){
        for (let j = 0; j < map[i].length; j++){
            const right = map[i][j+1]
            const left = map[i][j-1]
            const up = map[i-1]?.[j]
            const down = map[i+1]?.[j]
            const point = map[i][j]

            //console.log({left, right, up, down, point})
            if (comparePoints(point, right) && comparePoints(point, left) 
            && comparePoints(point, up) && comparePoints(point, down)) lows.push(Number(point) + 1) 
        }
    }
    //console.log(lows)
    console.log(lows.reduce((count, low) => count + low))

}

const comparePoints = (point, pointTwo) => {
    return !pointTwo || Number(point) < Number(pointTwo)
}

main()