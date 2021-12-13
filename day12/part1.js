const fs = require("fs");
const util = require('util')


const main = () => {
    let input = fs.readFileSync("./testInput.txt", 'utf8')
    const directions = input.split("\n").map(row => row.split("-"))
    const map = createMap(directions)

    let count = 0
    const stacks = []


    const getPaths = (map, val, curPath) => {
        if (val === 'end'){
            stacks.push([...curPath])
            count++
            return
        }

        const validNeighbours = getNeighbours(map[val].neighbours, curPath)

        validNeighbours.forEach((val) => {
            getPaths(map, val, [...curPath, val])
        })

    }

    const paths = getPaths(map, 'start', ['start'])

    console.log({count})

}


const getNeighbours = (array, stack) => {
    const valid = []
    array.forEach(val => {
        if (val.toUpperCase() === val){
            valid.push(val)
            return 
        }
        
        if (handleDuplicate(stack, val)) return 
        valid.push(val)

    })

    return valid
}

const handleDuplicate = (stack, val) => {
    if(!stack.includes(val)) return false
    const lowers = stack.filter(c => c.toUpperCase() != c)
     if (checkIfDuplicateExists(lowers)) return true
     if (stack.includes('start') && val === 'start') return true

}

function checkIfDuplicateExists(arr) {
    return new Set(arr).size !== arr.length
}

const createMap = (directions) => {
    const map = {}
    directions.forEach(dir => {
        const [a, b] = dir

        if (!map[b]){
            map[b] = {neighbours: []}
        }

        
        
        if (!map[a]){
            map[a] = {neighbours: []}
        }


        map[b].neighbours.push(a)
        map[a].neighbours.push(b)



    })    
    return map
}


main()

/*


a => b C


    start
    /   \
c--A-----b--d
    \   /
     end

    A 
{
  A: { neighbours: ['c', 'b', 'end' ] },
  start: { neighbours: [ 'A', 'b' ], isVisited: true },
  b: { neighbours: ['A', 'd', 'end' ], isVisited: true },
  c: { neighbours: [ 'A' ], isVisited: true },
  d: { neighbours: [ 'b' ], isVisited: true },
  end: { neighbours: [ 'A', 'b' ] }
}




AcA

*/