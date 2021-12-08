const fs = require("fs");

const main = () => {
    let input = fs.readFileSync("./input.txt", 'utf8')
    const rows = input.split("\n").map((row) => {
        const [digits, display] = row.split("|")

        return {digits: digits.split(" "), display: display.substring(1).split(" ")}
    })

    let count = 0
    rows.forEach((row) => {
        const knownDigits = getKnownDigits(row.digits)
        const rowCount = getDisplayedDigits(row.display, knownDigits)
        count += rowCount
    })
    console.log({count})






}

const getDisplayedDigits = (display, knownDigits) => {
    const  knownLengths = [2, 4, 3, 7]
    return display.reduce((count, digit) => {
        if (knownLengths.includes(digit.length)) count++
        return count
    }, 0)
}


const getKnownDigits = (digits) => {
    return digits.reduce((values, digit) => {
        let uniqueChars = {}
        let charCount = 0
        for (let i = 0; i < digit.length; i++){
            const char = digit[i]
            if (!uniqueChars[char]){
                uniqueChars[char] = 1
                charCount++
                continue
            }
        }

        switch(charCount) {
            case 2:
              values[digit] = true
              break;
            case 4:
              values[digit] = true
              break;
            case 3:
              values[digit] = true
              break;
            case 7:
              values[digit] = true
              break;              
            default:
          }

          return values

    }, {})
}


main()