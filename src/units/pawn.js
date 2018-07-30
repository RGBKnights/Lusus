import React from 'react';
import PropTypes from 'prop-types';

class Pawn extends React.Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';

    return (
      <g transform="scale(0.0015,0.0015) translate(50,50)">
        <path d="M312.07 194.46A56.07 56.07 0 1 1 256 138.39a56.07 56.07 0 0 1 56.07 56.07zM406 418.01H106v60h300v-60zM282.33 261.52a71.81 71.81 0 0 1-52.15.2c-.73 58.91-62.35 114.06-96.75 140.28H378.9c-34.09-26.33-95.44-81.78-96.57-140.48z" style={{fill: teamColor, fillOpacity: 1, strokeWidth:1, stroke:'#fff'}} transform="translate(0, 0) scale(1, 1) rotate(-360, 256, 256)"></path>
      </g>
    );
  }
}

export default Pawn;