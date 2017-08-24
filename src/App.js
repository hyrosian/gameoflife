import React, { Component } from 'react';
import './App.css';

const array = new Array(100)
const cells = array.fill('')
class App extends Component {
  constructor(){
    super()
    this.hover = this.hover.bind(this)
  }
  hover(e){
    
    const id = e.target.id
    const color = e.target.style.backgroundColor === 'red' ? 'blue' : 'red'
    e.target.style.backgroundColor = color


    const array = [id-1, id+1, id-10, id+10]
    const elements = array.forEach(x => {
      if(document.getElementById(x)) {
        return document.getElementById(x)
      }
    })
    console.log(elements)
  }
  render() {
    return (
      <div className="App">
        {cells.map( (x, i) => <div id={i + 1} 
        onMouseLeave={this.hover} onMouseEnter={this.hover}
        style={{backgroundColor: 'blue'}} 
        key={i + 1}>{x}</div>)}
      </div>
    );
  }
}

export default App;
