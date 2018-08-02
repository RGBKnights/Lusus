import React from 'react';
import PropTypes from 'prop-types';

class Knight extends React.Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.team === 'b' ? '#000000' : '#FFFFFF';
    let styleMain = { fill: teamColor, fillOpacity: 1 };
    let styleRank = { fill: this.props.color , fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <path style={styleRank} d="M60.81 476.91L360.81 476.91L360.81 416.91L60.81 416.91L60.81 476.91Z" ></path>
        <path style={styleMain} d="M294.6 129.61L308.54 137C340.42 93.38 369.88 105.15 369.88 105.15L348.26 158.15L383.9 177.15L386.77 210.15L451.19 318.9L407.64 348.27C407.64 348.27 380.82 311.88 367.99 304.61C357.33 298.61 326.77 294.36 311.82 292.61L244.28 215.7L232.28 226.26L269.43 268.57C269.3 268.75 269.18 268.94 269.05 269.14C233.27 327.31 292.05 374.83 337.54 400.92L84.14 400.92C93 85 294.6 129.61 294.6 129.61Z" ></path>
      </g>
    );
  }
}

export default Knight;