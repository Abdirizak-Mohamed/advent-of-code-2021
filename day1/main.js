const  input =  require("./input1")

const countIncreases = (measurmements) => {
    const { count } = measurmements.reduce((prev, current) => {
        if (current > prev.prevValue && prev.prevValue != undefined) prev.count++
        
        prev.prevValue = current
        return prev

    }, {prevValue: undefined, count: 0})

    return count 
}

const countSlidingIncreases = (measurmements) => {
    const { count } = measurmements.reduce((prev, current) => {
        
        const newWindow = [...prev.prevValue]
        newWindow.unshift(current)
        
        if (newWindow.length < 4){
            prev.prevValue = newWindow
            return prev
        }

        newWindow.pop()
        const newWindowSum =  newWindow.reduce(reduceValues)
        const prevValueSum =  prev.prevValue.reduce(reduceValues)

        if (newWindowSum > prevValueSum ) prev.count++
        
        prev.prevValue = newWindow
        return prev

    }, {prevValue: [], count: 0})

    return count 
}

const reduceValues = (prev, curr) => prev+curr

console.log(countIncreases(input))
console.log(countSlidingIncreases(input))