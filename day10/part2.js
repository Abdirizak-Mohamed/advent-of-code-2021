const fs = require("fs");

const main = () => {
    let input = fs.readFileSync("./input.txt", 'utf8')
    const rows = input.split("\n").map(row => row.split(""))


    const remainders = rows.reduce((remainders, row) => {
        let chunks = getFirstIllegalChar(row)
        if (chunks) {
            remainders.push(chunks)
        return remainders
    }
        return remainders
    }, [])

    const remainderValue = getRemValue(remainders) 
    remainderValue.sort((a, b) => b - a)
    console.log(remainderValue[((remainderValue.length + 1) / 2) - 1])


}


const getRemValue = (remainders) => {
    return remainders.map((remainder, idx) => {
        remainder.reverse()
        const total = remainder.reduce((count, val, idx) => {
            const multiplier = count * 5
            return multiplier + chunkValues[val]
        }, 0)
        
        return total
    })
     
}





const getFirstIllegalChar = (row) => {
    let openChunks = []

    for (const char of row ){
        if (chunkOpeners[char]) {
            openChunks.push(char)
            continue
        }

        const validToClose = openChunks.pop()
        if (char !== chunkOpeners[validToClose]){
            return false
        }
    }

    
    return openChunks 
}

const chunkOpeners = { '[': "]", '(': ')', '<': ">", "{": '}'}
const chunkValues = { '[': 2, '(': 1, '<': 4, "{": 3}


main()