import React, { Component } from 'react';
import Speed from './speed/Speed.js'
import Boardcontrols from './boardcontrols/Boardcontrols.js'
import './controls.css'

class Controls extends Component {
  constructor(props){
    super(props)
    this.handleSpeed = this.handleSpeed.bind(this)
    this.handleSize = this.handleSize.bind(this)
  }

  handleSpeed(e) {
    this.props.handleSpeed(e)
  }

  handleSize(e) {
    this.props.handleSize(e)
  }

  render() {
    return (
      <div id="con-controls">
        <Speed handleSpeed={this.handleSpeed} >simulation speed</Speed>
        <Boardcontrols handleSize={this.handleSize}>board options</Boardcontrols>
      </div>
    );
  }
}

export default Controls;