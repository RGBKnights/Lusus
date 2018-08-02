import React from 'react';
import PropTypes from 'prop-types';

class Pawn extends React.Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.team === 'b' ? '#000000' : '#FFFFFF';
    let styleMain = { fill: teamColor, fillOpacity: 1 };
    let styleRank = { fill: this.props.color , fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <path style={styleMain} d="M312.07 194.46C312.07 237.623 265.345 264.599 227.965 243.018C190.585 221.437 190.585 167.483 227.965 145.902C236.489 140.981 246.158 138.39 256 138.39C286.967 138.39 312.07 163.493 312.07 194.46Z"></path>
			  <path style={styleRank} d="M406 418.01L106 418.01L106 478.01L406 478.01L406 418.01Z"></path>
			  <path style={styleMain} d="M282.33 261.52C265.586 268.119 246.974 268.191 230.18 261.72C229.45 320.63 167.83 375.78 133.43 402L378.9 402C344.81 375.67 283.46 320.22 282.33 261.52Z"></path>
      </g>
    );
  }
}

export default Pawn;