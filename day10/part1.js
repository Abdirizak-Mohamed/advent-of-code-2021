const fs = require("fs");

const main = () => {
    let input = fs.readFileSync("./testInput.txt", 'utf8')
    const rows = input.split("\n").map(row => row.split(""))

    const total = rows.reduce((count, row) => {
        let val = getFirstIllegalChar(row)
        return count + val
    }, 0)

    console.log({total})

}

const getFirstIllegalChar = (row) => {
    let openChunks = []
    for (const char of row){
        if (chunkOpeners[char]) {
            openChunks.push(char)
            continue
        }

        const validToClose = openChunks.pop()
        if (char !== chunkOpeners[validToClose]){
            return chunkValues[char]
        }
    }
    return 0 
}

const chunkOpeners = { '[': "]", '(': ')', '<': ">", "{": '}'}
const chunkValues = { ']': 57, ')': 3, '>': 25137, "}": 1197}


main()