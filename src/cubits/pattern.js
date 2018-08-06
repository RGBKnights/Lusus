import React from 'react';
import PropTypes from 'prop-types';

class Pattern extends React.Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <path 
           d="M257.75 16.03A60 60 0 0 0 196 76a60 60 0 0 0 120 0 60 60 0 0 0-58.25-59.97zM250.72 166c-24.72.11-24.72 1.875-24.72 30v210h-60l90 90 90-90h-60V196c0-30 0-30-30-30-1.875 0-3.633-.007-5.28 0z"
          style={style}
          transform="translate(0, 0) scale(1, 1) rotate(180, 256, 256)" />
      </g>
    );
  }
}

export default Pattern;