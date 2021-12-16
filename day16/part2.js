const fs = require("fs");


const main = () => {
    const hexString = fs.readFileSync("./input.txt", 'utf8')

    const bitString = convertToBits(hexString)

    calculateLiteralValue(bitString)
    const {val} = calculateOperatorValue(bitString) 
    console.log({val})

}


const calculateOperatorValue = (string) => {
    const packetVersion = parseInt(string.slice(0, 3), 2)
    const values = []
    let totalPacketVersion = packetVersion
    const typeId = parseInt(string.slice(3, 6), 2)

    const lengthTypeId = parseInt(string.slice(6, 7), 2)
    let length
    if (lengthTypeId === 0) length = 15
    if (lengthTypeId === 1) length = 11

    let packetsTotalLength
    let numberPackets
    if (length === 15){
        packetsTotalLength = parseInt(string.slice(7, 22), 2)
    }

    if (length === 11){
        numberPackets = parseInt(string.slice(7, 18), 2)
    }

    let totalLength = 0

    if (numberPackets){
        let currentIdx = 18
        let currentPackets = 0
        while (currentPackets < numberPackets){
           const currentTypeId =  parseInt(string.slice(currentIdx + 3, currentIdx + 6), 2)
           let packetVersion
           let length
           let value

           if (currentTypeId === 4){
            const val = calculateLiteralValue(string.slice(currentIdx))
            packetVersion = val.packetVersion
            length = val.length
            value = val.val
           }
           if (currentTypeId !== 4){
            const val = calculateOperatorValue(string.slice(currentIdx))
            packetVersion = val.packetVersion
            length = val.length
            value = val.val
           }

           totalPacketVersion += packetVersion
           currentIdx += length
           currentPackets++
           values.push(value)
        }
        totalLength = currentIdx
    }

    if(packetsTotalLength){
        let currentIdx = 22
        let currentTotalLength = 0
        while (currentTotalLength < packetsTotalLength){
           const currentTypeId =  parseInt(string.slice(currentIdx + 3, currentIdx + 6), 2)
           let packetVersion
           let length
           let value

           if (currentTypeId === 4){
            const val = calculateLiteralValue(string.slice(currentIdx))
            packetVersion = val.packetVersion
            length = val.length
            value = val.val
           }
           if (currentTypeId !== 4){
            const val = calculateOperatorValue(string.slice(currentIdx))
            packetVersion = val.packetVersion
            length = val.length
            value = val.val
           }

           totalPacketVersion += packetVersion
           currentIdx += length
           currentTotalLength += length
           values.push(value)
        }
        totalLength = currentIdx
    }

    // while (totalLength % 4 !== 0){
    //     totalLength++
    // }

    // console.log({totalPacketVersion})
    return {packetVersion: totalPacketVersion, length: totalLength, val: returnVal(typeId, values)}

}


const returnVal = (typeId, values) => {
    let value
    switch(typeId) {
        case 0:
          value = values.reduce((a, b) => a + b, 0)
          break;
        case 1:
          value = values.reduce((a, b) => a * b, 1)
          break;
        case 2:
          value = values.reduce((a, b) => Math.min(a, b), Infinity)
          break;
        case 3:
          value = values.reduce((a, b) => Math.max(a, b), Number.NEGATIVE_INFINITY)
          break;
        case 5:
          value = values[0] > values[1] ? 1 : 0 
          break;
        case 6:
          value = values[0] < values[1] ? 1 : 0 
          break;
        default:
            value = values[0] === values[1] ? 1 : 0 
      }


      return value
}


const calculateLiteralValue = (string) => {
    const packetVersion = parseInt(string.slice(0, 3), 2)

    let index = 6
    let isLast = (Number(string[index]) === 0)
    let length = 6
    let value = string.slice(index + 1,index + 5)

    while(!isLast){
        
        index += 5
        value += string.slice(index + 1,index + 5)
        length += 5

        isLast = (Number(string[index]) === 0)
    }

    length += 5
    
    return {packetVersion, length, val: parseInt(value, 2)}
}



const convertToBits = (hex) => {
    let bitString = ""

    for (let i = 0; i < hex.length; i++){
        bitString += hexMap[hex[i]]
    }

    return bitString
}


const hexMap = {
"0" : "0000",
"1" : "0001",
"2" : "0010",
"3" : "0011",
"4" : "0100",
"5" : "0101",
"6" : "0110",
"7" : "0111",
"8" : "1000",
"9" : "1001",
"A" : "1010",
"B" : "1011",
"C" : "1100",
"D" : "1101",
"E" : "1110",
"F" : "1111"
}

main()
/*




*/