const fs = require("fs")

const main = () => {
    let input = fs.readFileSync("./input.txt", 'utf8')
    const lines = input.split("\n"); 

    let epsilon = ""
    let gamma = ""

    for(let i = 0; i < lines[0].length; i++){
       const frequencies = calulateFrequency(i, lines)
       const maxNumber = frequencies.zero > frequencies.one ? "0" : "1"
       const minNumber = frequencies.zero < frequencies.one ? "0" : '1' 
       epsilon += minNumber
       gamma += maxNumber
    }

    console.log(parseInt(gamma,2) * parseInt(epsilon,2)); 

}


const calulateFrequency = (idx, strings) => {
   return strings.reduce((iterable, string) => {
        if(string[idx] === "0"){
            iterable.zero += 1 
            return iterable 
        }
        iterable.one += 1 
        return iterable
    }, {zero: 0, one:0})


}

main()