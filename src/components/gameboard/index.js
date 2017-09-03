import React, { Component } from 'react';

class Start extends Component {


  test(e){
    this.props.switchFirst(e)
    this.props.run(e)
  }

  render(){
    const { first } = this.props
    const styling = first === true ? 'start-first' : 'start'
    return(
      <div className={styling} onClick={(e) => this.test(e)}>
        <button>start <span>&#10148;</span></button>
      </div>
    )
  }
}

class Modal extends Component {
  render() {
    return (
      <div id="modal" onClick={this.props.pause}>
        <div className="modal-container">
        <span>&#10074;&#10074;</span>
        <p>pause</p>
        </div>
      </div>
    );
  }
}

class Board extends Component {

  constructor() {
    super()
    this.state = {
      active: false,
      first: true
    }
  this.showModal = this.showModal.bind(this)
  this.switchFirst = this.switchFirst.bind(this)
  }
  switchFirst() {
    // this.setState({first: false})
    this.props.switchFirst()
  }
  showModal(){
    this.setState({active: !this.state.active})
  }

  render() {
    const {board, size, pause, first} = this.props
 
    const active = this.props.running
    console.log(board)
    return (
      <div id="board"
      style={{width: size.width * 10, height: size.height * 10}}>
      {active  && <Modal onClick={this.showModal} pause={pause}/>}
      {!active && <Start onClick={this.showModal} running={this.props.running} switchFirst={this.switchFirst} first={first}
       speed={this.props.speed} run={this.props.run}/>}
       {board.map(row => row.map((cell, index) =>
       <div key={`cell-${index}`} className={`cell cell-${cell.value} cell-${cell.birth}`} />))}
      
      </div>
    );
  }
}

export default Board;