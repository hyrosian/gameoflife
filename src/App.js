import React, { Component } from 'react';
import './App.css';

/* ========
Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
===========*/


// returns starting board with L,R,T,B edge cells 0 and rest of cells with value 1 or 0.
const createBoard = function(width, height) {
  let board = []
  for(var x = 0; x < width; x++){
    board.push([])
    for(var y = 0; y < height; y++){
      if(x === 0 || y === 0) {
        board[x].push({value: 0})
      } 
      else if (x === width-1 || y === height-1){
        board[x].push({value: 0})
      }
      else {
        let number = Math.round(Math.random())
        board[x].push({value: number})
      }
    }
  }
  return board
}

const evaluateCell = function(x, cell){
  let value = x
  if(x < 2){
    value = 0
  }
  else if(x === 2){
    value = cell
  }
  else if(x === 3){
    value = 1
  }
  else if(x > 3){
    value = 0
  }
  else {
    console.log('error: default case evaluateCell()')
    value = 0
  }
  return value
}


const evaluateGen = function(board){
  let nextGen = JSON.parse(JSON.stringify(board));
  
  for(let y = 1; y < board.length - 1; y++){
    for(let x = 1; x < board[y].length - 1; x++){
      
      let neighbors = 0
      
      for(let i=-1; i <= 1; i++){
        for(let j=-1; j<= 1; j++){
          neighbors+=board[x+i][y+j].value
        }
      }
      neighbors-=board[x][y].value
      let nextvalue = evaluateCell(neighbors, board[x][y].value)
      nextGen[x][y].value = nextvalue
    }
  }

  return nextGen
}





const board = createBoard(50, 50)

class App extends Component {
  
  constructor(){
    super()
    this.state = {
      board
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const nextState = evaluateGen(this.state.board)
      this.setState({board: nextState})
    }, 50)
  }


  componentWillUnmount() {
    clearInterval(this.interval)
  }


  render() {
    const board = this.state.board
    return (
      <div className="App">
        {board.map(x => x.map(item => {
          return (
            <div className={`state-${item.value}`}></div>
          )
        }))}
      </div>
    );
  }
}

export default App;
