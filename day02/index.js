const  input =  require("./input")

const part1 = (input) => {
    const position = {
        horizontal: 0,
        vertical: 0
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
            currentPosition.horizontal += Number(value)
            break;
        case "up":
            currentPosition.vertical -= Number(value)
            break;
        case "down":
            currentPosition.vertical += Number(value)
             break
        default:
            break
      }

     return currentPosition
    
}


part1(input)