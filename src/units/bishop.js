import React from 'react';
import PropTypes from 'prop-types';

class Bishop extends React.Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.team === 'b' ? '#000000' : '#FFFFFF';
    let styleMain = { fill: teamColor, fillOpacity: 1 };
    let styleRank = { fill: this.props.color , fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <path style={styleRank} d="M406.02 476.915L106.02 476.915L106.02 416.915L406.02 416.915L406.02 476.915Z"></path>
        <path style={styleMain} d="M322.56 295.915L189.48 295.915L189.48 313.565L322.56 313.565L322.56 295.915Z"></path>
        <path style={styleMain} d="M334.34 218.225C334.457 239.153 331.288 259.97 324.95 279.915L187.09 279.915C180.752 259.97 177.583 239.153 177.7 218.225C177.7 159.135 201.52 109.225 234.11 93.555C214.765 76.689 220.933 45.206 245.212 36.886C269.491 28.566 293.672 49.649 288.738 74.835C287.314 82.102 283.512 88.688 277.93 93.555C310.52 109.265 334.34 159.135 334.34 218.225Z"></path>
        <path style={styleMain} d="M283.27 169.315L264.02 169.315L264.02 145.395L248.02 145.395L248.02 169.315L228.76 169.315L228.76 185.315L248.02 185.315L248.02 236.855L264.02 236.855L264.02 185.315L283.27 185.315L283.27 169.315Z"></path>
        <path style={styleMain} d="M321.42 350.005L321.42 329.565L190.62 329.565L190.62 350.005L93.29 350.005L93.29 350.115L142.75 399.575L224.83 399.575L255.98 363.575L287.13 399.575L369.57 399.575L418.44 350.705L418.71 350.015L321.42 350.015Z"></path>
      </g>
    );
  }
}

export default Bishop;