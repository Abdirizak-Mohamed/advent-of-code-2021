const fs = require("fs");


const main = () => {
    // let iinp = fs.readFileSync("./input.txt", 'utf8').split('\n').map(r => r.split('  '))
    // console.log({iinp})

    const x = [138, 184]
    const y = [-125, -71]
    // let yVelocity =  500
    // let xVelocity = 18

    // const x = [20, 30]
    // const y = [-10, -5]
    // let yVelocity =  1
    // let xVelocity = 7

    const distVals = new Set()
    for (i = 1; i <= x[1]; i++){
        for (j = 2000; j >= y[0]; j--){
            const hitsTarget = checkIfHits(i, j, {x, y})
            if (hitsTarget) distVals.add(`${i},${j}`)
        }
    }

    console.log({distVals: distVals.size})
}



const checkIfHits = (xVel, yVel, boundaries) => {
    const {x, y} = boundaries
    let currentX = 0
    let currentY = 0
    let currentXVelocity = xVel
    let currentYVelocity = yVel 

    while (!oOBX(currentX, x[0], x[1]) && !oOBY(currentY, y[0], y[1])){
        currentX += currentXVelocity
        currentY += currentYVelocity

        if (currentXVelocity != 0) currentXVelocity--
        currentYVelocity--
        
       if (inTarget(currentX, x[0], x[1]) && inTarget(currentY, y[0], y[1])) break
    }

    return inTarget(currentX, x[0], x[1]) && inTarget(currentY, y[0], y[1])

}


const inTarget = (currentVal, min, max) => {
    return currentVal <= max && currentVal >= min
}

const oOBY = (currentVal, min, max) => {
    return currentVal < min 
}

const oOBX = (currentVal, min, max) => {
    return currentVal > max 
}







main()