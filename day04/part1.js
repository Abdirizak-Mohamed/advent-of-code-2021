const fs = require("fs")
const util = require('util')

const main = () => {
    let input = fs.readFileSync("./input.txt", 'utf8')
    input = input.split(/[\n\r]+/g)
    const commands = input.shift().split(",")

    
    const boards = createBoards(input)


    let completed = false
    commands.forEach((val, idx) => {
        if (completed) return

        markBoards(boards, val) 

        completed = checkBoardsCompleted(boards, val)
    })

    const winningBoard = boards[completed?.idx]

    const score = calculateScore(winningBoard, completed?.winningNum)

    console.log({score})

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


const checkBoardsCompleted = (boards, val) => {
    let completed 
    
    boards.forEach((board, idx) => {
        //Check Rows
        if (completed) return

        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                const square = board[i][j]
                if (square.marked === false) break
                if (j === board[i].length - 1) completed = {idx, val: "row", winningNum: val}
            }
            if (completed) break
        }

        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                const square = board[j][i]
                if (square.marked === false) break
                if (j === board[i].length - 1) completed = {idx, val: "col", winningNum: val}
            }
            if (completed) break
        }
    })

    return completed
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




[
    [1,2,3],
    [1,2,3]

]

 */