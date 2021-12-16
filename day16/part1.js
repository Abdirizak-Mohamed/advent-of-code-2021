const fs = require("fs");


const main = () => {
    const hexString = fs.readFileSync("./input.txt", 'utf8')

    const bitString = convertToBits(hexString)

    const {packetVersion} = calculateOperatorValue(bitString) 
    console.log({packetVersion})

}


const calculateOperatorValue = (string) => {
    const packetVersion = parseInt(string.slice(0, 3), 2)
    console.log({packetVersion})
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

           if (currentTypeId === 4){
            const val = calculateLiteralValue(string.slice(currentIdx))
            packetVersion = val.packetVersion
            length = val.length
           }
           if (currentTypeId !== 4){
            const val = calculateOperatorValue(string.slice(currentIdx))
            packetVersion = val.packetVersion
            length = val.length
           }

           totalPacketVersion += packetVersion
           currentIdx += length
           currentPackets++
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

           if (currentTypeId === 4){
            const val = calculateLiteralValue(string.slice(currentIdx))
            packetVersion = val.packetVersion
            length = val.length
           }
           if (currentTypeId !== 4){
            const val = calculateOperatorValue(string.slice(currentIdx))
            packetVersion = val.packetVersion
            length = val.length
           }

           totalPacketVersion += packetVersion
           currentIdx += length
           currentTotalLength += length
        }
        totalLength = currentIdx
    }

    // while (totalLength % 4 !== 0){
    //     totalLength++
    // }

    // console.log({totalPacketVersion})
    return {packetVersion: totalPacketVersion, length: totalLength}

}


const calculateLiteralValue = (string) => {
    const packetVersion = parseInt(string.slice(0, 3), 2)
    console.log({lit: packetVersion})

    let index = 6
    let isLast = (Number(string[index]) === 0)
    let length = 6

    while(!isLast){
        
        index += 5
        length += 5

        isLast = (Number(string[index]) === 0)
    }

    length += 5


    // while (length % 4 !== 0){
    //     length++
    // }
    
    return {packetVersion, length}
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
const bitMap = {
 0000 : 0,
 0001 : 1,
 0010 : 2,
 0011 : 3,
 0100 : 4,
 0101 : 5,
 0110 : 6,
 0111 : 7,
 1000 : 8,
 1001 : 9,
 1010 : "A",
 1011 : "B",
 1100 : "C",
 1101 : "D",
 1110 : "E",
 1111 : "F"
}

main()
/*




*/