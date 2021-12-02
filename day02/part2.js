const  input =  require("./input")

const part2 = (input) => {

    const position = {
        horizontal: 0,
        vertical: 0, 
        aim: 0
    }  
    
    const finalPosition  = input.reduce((currentPosition, instruction) => {
        handleDirection(instruction, currentPosition)
        return currentPosition
    }, position)


    const { horizontal, vertical } = finalPosition
    console.log(horizontal * vertical)
}


const handleDirection = (instruction, currentPosition) => {
    const [direction, value] = instruction.split(' ');
    
    switch(direction) {
        case "forward":
            currentPosition.vertical +=  currentPosition.aim * value
            currentPosition.horizontal += Number(value)         
            break;
        case "up":
            currentPosition.aim -= Number(value)
            break;
        case "down":
            currentPosition.aim += Number(value)
             break
        default:
            break
      }

     return currentPosition
    
}

part2(input)
