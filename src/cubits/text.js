import React from 'react';
import PropTypes from 'prop-types';

class Text extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    value: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';

    return (
      <g transform="scale(0.02,0.02) translate(7,30)">
        <title>{this.props.name}</title>
        <text style={{strokeWidth:0, fill: teamColor}}>{this.props.name}</text>
      </g>
    );
  }
}

export default Text;