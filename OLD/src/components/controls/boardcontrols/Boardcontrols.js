import React, { Component } from 'react';


class Boardcontrols extends Component {

  handleSize(e) {
    this.props.handleSize(e)
  }

  render() {
    return (
      <div id="con-boardcontrols">
        <h4>{this.props.children}</h4>
        <div className="controls-buttons">
          <button onClick={(e) => this.handleSize(e)}>50x50</button>
          <button onClick={(e) => this.handleSize(e)}>70x50</button>
          <button onClick={(e) => this.handleSize(e)}>30x30</button>
          <button onClick={(e) => this.handleSize(e)}>70x70</button>
          <button onClick={(e) => this.handleSize(e)}>reset</button>
        </div>
      </div>
    );
  }
}

export default Boardcontrols;