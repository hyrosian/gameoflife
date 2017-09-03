import React, { Component } from 'react';
import './App.css';
import Controls from './components/controls'
import Gameboard from './components/gameboard'
import {createBoard, nextBoard} from './utils/utils.js'

const  board = createBoard({width: 50, height: 50})

const createWidthAndHeight = function(str){
  
  const [width, height] = str.split('x')
  return { width, height }
}

class App extends Component {
  constructor(){
    super()
    this.state={
      board,
      size: {width: 50, height: 50},
      running: false,
      speed: 300,
      first: true
    }
    this.run = this.run.bind(this)
    this.clear = this.clear.bind(this)
    this.handleSpeed = this.handleSpeed.bind(this)
    this.handleSize = this.handleSize.bind(this)
    this.switchFirst = this.switchFirst.bind(this)
  }

  componentDidMount() {
    this.clear()
  }

  run(speed = 300){
    if(this.state.speed) {
      speed = this.state.speed
    }
    this.clear()
    this.interval = setInterval(() => {
      const nextState = nextBoard(this.state.board)
      this.setState({
        board: nextState,
        running: true,
        speed
      })
    }, speed)
  }
  
  clear() {
    clearInterval(this.interval)
    this.setState({running: false})
    console.log('clicked')
  }

  handleSpeed(e) {
    console.log(e.target.value)
    const speed = (600 / 100) * e.target.value + 20
    this.clear()
    this.setState({speed: speed})
    this.run(speed)
  }

  handleSize(e) {
    this.clear()
    console.log(e.target.innerText)
    const text = e.target.innerText
    // console.log(text.indexOf('x'))
    if(text.indexOf('x')){
      const {width, height} = createWidthAndHeight(e.target.innerText)
      this.setState({
        first: true,
        board: createBoard({width, height}),
        size: {width, height}
      })
    }

    else if (text === 'reset') {
      const {width, height} = this.state.size
      this.setState({
        first: true,
        board: createBoard({width, height})
      })
    }
    
  }

  switchFirst() {
    this.setState({first: false})
  }

  render() {
    const {board, size} = this.state
    return (
      <div className="App">
        <div className="container">
        <h1 className="main-header">Conward's Game of Life</h1>
        <Controls handleSpeed={this.handleSpeed} handleSize={this.handleSize}/>
        <Gameboard board={board} size={size} run={this.run}
        running={this.state.running} switchFirst={this.switchFirst} first={this.state.first}
        speed={this.state.speed} pause={this.clear}/>
        </div>
      </div>
    );
  }
}

export default App;
