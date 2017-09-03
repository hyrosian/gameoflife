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
  for(var x = 0; x < height; x++){
    board.push([])
    for(var y = 0; y < width; y++){
      if(x === 0 || y === 0) {
        board[x].push({value: 0})
      } 
      else if (x === width || y === height){
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
  for(let x = 1; x < board.length - 2; x++){
    for(let y = 1; y < board[x].length - 2; y++){
      
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






class App extends Component {
  
  constructor(){
    super()
    this.state = {
      width: 50,
      height: 50,
      board: createBoard(50, 50),
      paused: false,
      generation: 0
    }
  }

  generateBoard(width, height) {
    this.pause()
    const board = createBoard(width, height)
    this.setState({board, generation: 0, width, height })
  }
  
  pause(){
    clearInterval(this.interval)
    this.setState({paused: true})
  }

  run(){
    this.interval = setInterval(() => {
        const nextState = evaluateGen(this.state.board)
        this.setState({paused: false, generation: this.state.generation + 1, board: nextState})
      }, 50)
  }

  componentDidMount() {
    // this.run()
  }


  componentWillUnmount() {
    clearInterval(this.interval)
  }


  render() {
    
    let {board, generation, width, height} = this.state
    return (
      <div className="App">
        <h3>generation:{generation}</h3>
        <div className="board">
        {board.map(x => x.map(item => {
          return (
            <div className={`state-${item.value}`}></div>
          )
        }))}
        </div>
        <button onClick={()=> this.run()}>run</button>
        <button onClick={()=> this.pause()}>pause </button>
        <button onClick={()=> this.generateBoard(50, 70)}>generate</button>
        <button onClick={()=> this.generateBoard(50, 70)}>50 x 70</button>
      </div>
    );
  }
}

export default App;
