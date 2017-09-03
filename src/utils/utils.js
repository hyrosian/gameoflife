const checkEdge = function(cell, cellIndex, rowIndex, width, height) {
  if(rowIndex === 0 || rowIndex === height-1) {
    return {value: 0, birth: false}
  }
  else if(cellIndex === 0 || cellIndex === width-1) {
    return { value: 0, birth: false }
  }
  else {
    return { value: Math.round(Math.random()), birth: false }
  }
}

export const createBoard = ({width,height}) =>
Array.from({length: height}, 
  (rows, rowIndex) => 
  Array.from({length: width}, 
    (cell, cellIndex) => 
  checkEdge(cell, cellIndex, rowIndex, width, height)
  ) 
)


//////////////////////////////////////////////////////////

const getNeighborCount = function(board, row, cell) {
  const current = board[row][cell]
  let count = 0
  
  for(let i = -1; i <= 1; i++){
    for(let j = -1; j <= 1; j++){
      if(board[row + i][cell + j].value === 1) {
        count++
      }
    }
  }
  count = count - current.value
  // console.log(count)
  // console.log('row', row)
  // console.log('cell', cell)
  return count
} 

const getNextCellState = function(neighborsCount, currentCell) {
  switch(neighborsCount){
    case 0:
    return {value: 0, birth: false}
    case 1:
    return {value: 0, birth: false}
    case 2:
    return {value: currentCell.value, birth: false}
    case 3:
    return {value: 1, birth: !currentCell.birth}
    default:
    return {value: 0, birth: false}
  }
}


const createNextCell = function(nextBoard, row, cell, nextCellState){
  nextBoard[row][cell] = nextCellState
}


// loops through every cell of board.
export const nextBoard = function(board){
  let nextBoard = JSON.parse(JSON.stringify(board))

  for(var row = 1; row < board.length - 1; row++) {
    
    for(var cell = 1; cell < board[row].length - 1; cell++){
      const currentCell = board[row][cell]
      // get amount of neighbors for each cell.
      const neighborsCount = getNeighborCount(board, row, cell)
      createNextCell(nextBoard, row, cell, getNextCellState(neighborsCount, currentCell))
    }
  }
  return nextBoard
}

