const fs = require("fs")

const main = () => {
    const input = fs.readFileSync("./input.txt", 'utf8')
    const lines = input.split("\n"); 
    let oxRatingLines = input.split("\n"); 
    let co2RatingLines = input.split("\n"); 

    let oxVal
    let co2Val

    for(let i = 0; i < lines[0].length; i++){

       const oxFrequencies = calulateFrequency(i, oxRatingLines)
       const co2Frequencies = calulateFrequency(i, co2RatingLines)

       const oxMaxNumber = oxFrequencies.zero > oxFrequencies.one ? "0" : "1"
       const co2MinNumber = co2Frequencies.zero <= co2Frequencies.one ? "0" : '1' 

        
       oxRatingLines = oxRatingLines.filter(val => val[i] === oxMaxNumber)
       co2RatingLines = co2RatingLines.filter(val => val[i] === co2MinNumber)
       if(oxRatingLines.length === 1 && !oxVal) {
        oxVal = oxRatingLines[0]
       }

       if(co2RatingLines.length === 1 && !co2Val) {
        co2Val = co2RatingLines[0]
       }
    }

    console.log(parseInt(co2Val,2) * parseInt(oxVal,2)); 

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