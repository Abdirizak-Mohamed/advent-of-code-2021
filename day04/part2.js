const fs = require("fs")
const util = require('util')

const main = () => {
    let input = fs.readFileSync("./input.txt", 'utf8')
    input = input.split(/[\n\r]+/g)
    const commands = input.shift().split(",")

    
    let boards = createBoards(input)

    let completed = false
    let lastWin = []

    commands.forEach((val, idx) => {
        if (completed) return
        markBoards(boards, val) 

        boards = checkBoardsCompleted(boards, val, lastWin)
    })

   console.log(lastWin) 

    //console.log({boards})

}


const createBoards = (input) => {
    const boards = []
    let currentBoard = []
    
    for (let i = 0; i < input.length; i++) {
       

        let curVal = ""

        for(let char = 0; char < input[i].length; char++) {
            
            if(char === 2 || char === 5 || char === 8 || char === 11){
                curVal += " "
                continue
            } 

            if (input[i][char] === " "){
                curVal += ""
                continue
            }

            curVal += input[i][char]
        }

        const row = curVal.split(" ")

        let currentRow = row.map(v => {return {val: v, marked: false}})
        currentBoard.push(currentRow)
        //console.log((i + 1) % 5 === 0)
        if ((i + 1) % 5 === 0){
            boards.push(currentBoard)
            currentBoard = []
        }
    }

    return boards


}

const markBoards = (boards, val) => {

    boards.forEach(board => {
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                const square = board[i][j]
                if (square.val === val){
                    board[i][j].marked = true
                    return
                }
            }
        }
    })
    
}


const checkBoardsCompleted = (boards, val, lastWin) => {
    let completed 
    const completedIds = []
    boards.forEach((board, idx) => {
        //Check Rows
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                const square = board[i][j]
                if (square.marked === false) break
                if (j === board[i].length - 1){
                    completedIds.push(idx)
                    completed = true
                } 
            }
            if (completed){
                completed = false
                break
            } 
        }
        //check columns
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                const square = board[j][i]
                if (square.marked === false) break
                if (j === board[i].length - 1){ 
                    completedIds.push(idx)
                    completed = true
                }
            }
            if (completed){
                completed = false
                break
            } 
        }
    })
    console.log({completedIds})
    if(!completedIds.length) return boards.filter((val, idx) => !completedIds.includes(idx))

    lastWin.splice(0, 1)
    const score = calculateScore(boards[completedIds[completedIds.length - 1]], val)
    lastWin.push(score)

    return boards.filter((val, idx) => !completedIds.includes(idx))
}

const calculateScore = (board, winningNum) => {
    
    let totalUnmarked = 0

    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            const square = board[i][j]
            if (!square.marked){
                totalUnmarked += Number(square.val)
            }
        }
    }

    return totalUnmarked * winningNum
    
}


main()

/**
 * 
 16, 46, 75, 71, 60
 
// Get all commands 

Create boards. 

Cycle through each command 
Mark each found
After 5 commands  begin to check if any are done
/
Check if done



for each command 



[
    [1,2,3],
    [1,2,3]

]

 */