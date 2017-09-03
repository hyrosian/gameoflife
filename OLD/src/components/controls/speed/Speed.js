import React, { Component } from 'react';

class Speed extends Component {

  handleSpeed(e) {
    // console.log(e.target.value)
    this.props.handleSpeed(e)
  }
  render() {
    return (
      <div>
        <h4>{this.props.children}</h4>
        <div className="slider">
          <label>min</label>
          <input type="range" 
          style={{direction: 'rtl'}}
          onChange={(e) => this.handleSpeed(e)}/>
          <label>max</label>
        </div>
      </div>
    );
  }
}

export default Speed;