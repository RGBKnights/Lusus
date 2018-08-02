import React from 'react';
import PropTypes from 'prop-types';

class King extends React.Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.team === 'b' ? '#000000' : '#FFFFFF';
    let styleMain = { fill: teamColor, fillOpacity: 1 };
    let styleRank = { fill: this.props.color , fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <path style={styleRank} d="M405.995 477.15L105.995 477.15L105.995 417.15L405.995 417.15L405.995 477.15Z"></path>
        <path style={styleMain} d="M395.695 370.02L116.295 370.02C120.212 379.956 122.459 390.471 122.945 401.14L389.045 401.14C389.531 390.471 391.778 379.956 395.695 370.02Z" ></path>
        <path style={styleMain} d="M255.995 128.96C236.245 128.96 220.235 144.97 220.235 164.72C220.235 214.88 255.995 264.06 255.995 264.06C255.995 264.06 291.755 214.88 291.755 164.72C291.755 144.97 275.745 128.96 255.995 128.96Z"></path>
        <path style={styleMain} d="M263.995 113.58L263.995 94.24L282.355 94.24L282.355 78.24L263.995 78.24L263.995 54.85L247.995 54.85L247.995 78.24L229.635 78.24L229.635 94.24L247.995 94.24L247.995 113.62C253.294 112.78 258.692 112.766 263.995 113.58Z"></path>
        <path style={styleMain} d="M345.635 164.94C332.546 164.924 319.585 167.511 307.505 172.55C304.275 224.3 270.435 271.4 268.925 273.48L263.995 280.24L263.995 354L403.995 354C420.565 327.85 444.775 311.59 444.775 264C444.742 209.272 400.363 164.925 345.635 164.93Z"></path>
        <path style={styleMain} d="M204.475 172.55C139.183 145.385 67.255 193.342 67.225 264.06C67.225 311.61 91.435 327.88 108.005 354.06L247.995 354.06L247.995 280.24L243.055 273.45C241.545 271.4 207.715 224.3 204.475 172.55Z"></path>
      </g>
    );
  }
}

export default King;