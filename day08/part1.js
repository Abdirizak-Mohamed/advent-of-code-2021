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

main()