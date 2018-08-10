import React from 'react';
import PropTypes from 'prop-types';

class Queen extends React.Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.team === 'b' ? '#000000' : '#FFFFFF';
    let styleMain = { fill: teamColor, fillOpacity: 1 };
    let styleRank = { fill: this.props.color ? this.props.color : teamColor, fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <path style={styleMain} d="M477.518 181.966C477.553 199.964 459.131 212.1 442.608 204.966L380.318 355.226L131.398 355.226L69.158 205.036C51.413 212.484 32.259 197.929 34.682 178.837C37.104 159.745 59.286 150.435 74.609 162.079C85.854 170.625 87.793 186.783 78.888 197.746L165.888 268.946L186.808 142.546C167.859 139.183 159.656 116.568 172.043 101.84C184.43 87.111 208.116 91.315 214.678 109.406C219.128 121.675 213.392 135.303 201.508 140.696L255.818 257.696L310.238 140.396C292.832 132.187 290.84 108.213 306.652 97.243C322.465 86.274 344.223 96.535 345.816 115.714C346.9 128.756 337.743 140.426 324.818 142.476L345.748 268.896L433.008 197.596C420.974 182.577 429.712 160.164 448.735 157.252C463.874 154.934 477.519 166.651 477.518 181.966Z"></path>
        <path style={styleRank} d="M405.858 423.216L105.858 423.216L105.858 483.216L405.858 483.216L405.858 423.216Z"></path>
        <path style={styleMain} d="M378.108 371.216L133.888 371.216L133.888 407.216L378.108 407.216L378.108 371.216Z"></path>
      </g>
    );
  }
}

export default Queen;