const fs = require("fs");


const main = () => {
    let iinp = fs.readFileSync("./testInput.txt", 'utf8').split(' ')

    const x = [138, 184]
    const y = [-125, -71]
    let yVelocity =  100
    let xVelocity = 18

    // const x = [20, 30]
    // const y = [-10, -5]
    // let yVelocity =  1
    // let xVelocity = 7

    let fallsInGap = true
    let maxY = Number.NEGATIVE_INFINITY
    while (fallsInGap){
    yVelocity++
    let currentYVelocity = yVelocity
    let currentXVelocity = xVelocity

    let currentX = 0
    let currentY = 0
    let currentMaxY = Number.NEGATIVE_INFINITY

    while (!oOBX(currentX, x[0], x[1]) && !oOBY(currentY, y[0], y[1])){
        currentX += currentXVelocity
        currentY += currentYVelocity

        if (currentXVelocity != 0) currentXVelocity--
        currentYVelocity--
        

       if (currentY > currentMaxY) currentMaxY = currentY
       if (inTarget(currentX, x[0], x[1]) && inTarget(currentY, y[0], y[1])) break
    }
    // console.log({currentMaxY, fallsInGap})
    
    fallsInGap = inTarget(currentX, x[0], x[1]) && inTarget(currentY, y[0], y[1])
    console.log({currentMaxY, fallsInGap, yVelocity})

    if (fallsInGap) maxY = currentMaxY
    }
    console.log({currentY: yVelocity, maxY})
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