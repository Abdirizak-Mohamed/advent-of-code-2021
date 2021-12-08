const fs = require("fs");

const main = () => {
    let input = fs.readFileSync("./input.txt", 'utf8')
    const rows = input.split("\n").map((row) => {
        const [digits, display] = row.split("|")

        return {digits: digits.split(" "), display: display.substring(1).split(" ")}
    })

    let total = 0
    rows.forEach((row) => {
        const knownDigits = getKnownDigits(row.digits)
        const configuration = deriveConfiguration(knownDigits, row.digits)

       const output = calculateDigits(row.display, configuration)

      total += Number(output)
    })

    console.log(total)
}




const deriveConfiguration = (knownDigits, digits,) => {
    const sections = {}
    sections.a = findDiff(knownDigits[7], knownDigits[1])

    const { D, B, C, F, E } = findSectionD(knownDigits, digits)
    sections.d = D
    sections.b = B  
    sections.c = C  
    sections.f = F  
    sections.e = E  

    for (const char of knownDigits[8]){
        if (!Object.values(sections).includes(char)){
            sections.g = char
            break
        }
    }

    const rosetta = {}

    for (const [key, value] of Object.entries(sections)){
        rosetta[value] = key
    }

    return rosetta
}

const calculateDigits = (digits, rosetta) => {
    let output = ""
    digits.forEach(dig => {
        let number = ""
        for (let i = 0; i < dig.length; i++) {
            number += rosetta[dig[i]]
          }

          number = number.split("").sort().join("")
          output += numbers[number]
    })

    return output
}

const numbers = {
     "abcefg": 0, 
     "cf":1,
     "acdeg":2,
     "acdfg":3,
     "bcdf":4,
     "abdfg":5,
     "abdefg":6,
     "acf":7,
     "abcdefg":8,
     "abcdfg":9,
}



const findSectionD = (knownDigits, digits) => {
    const sixCharDigits = digits.filter(d => d.length === 6)

    const bAndD = findDiff(knownDigits[4], knownDigits[1])

   const obj = sixCharDigits.reduce((count, dig) => {
        for (let i = 0; i < bAndD.length; i++){
            const letter = bAndD[i]
            if (!dig.includes(letter)){
                return { zero: dig, D: letter, B: findDiff(bAndD, letter)}
            }
        }
        return count
    }, {})

   const sixAndNine = sixCharDigits.filter(dig => dig !== obj.zero)
   sixAndNine.forEach( val => {
    let one = knownDigits[1]
    for (let i = 0; i < one.length; i++){
        const letter = one[i]
        if (!val.includes(letter)){
            obj.C = letter
            obj.F = findDiff(one, letter)
            obj.six = val
        }
    }
   })

   const nine = sixAndNine.filter(val => val !== obj.six)
   obj.E = findDiff(knownDigits[8], nine[0])



    return obj
    
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
              values[1] = digit
              break;
            case 4:
              values[4] = digit
              break;
            case 3:
              values[7] = digit
              break;
            case 7:
              values[8] = digit
              break;              
            default:
          }

          return values

    }, {})
}

const findDiff = (str1, str2) => { 
    let diff= "";
    str1.split('').forEach((val, i) => {
      if (!str2.includes(val))
        diff += val ;         
    });
    return diff;
  }


main()


/*

  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

 



1st A = Character from 1 in 7 
2nd D = Character from 4 that is missing in only 1 of the 6 digit character
3rd B = Character from 4 that isnt in 1 || D we just found. 



A = character missing from 1 and in 7
B
C
D = character missing from 8 
E
F
G


*/