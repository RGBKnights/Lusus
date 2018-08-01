import React from 'react';
import PropTypes from 'prop-types';

class Queen extends React.Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <path 
          d="M477.518 181.966a25 25 0 0 1-34.91 23l-62.29 150.26h-248.92l-62.24-150.19a25 25 0 1 1 9.73-7.29l87 71.2 20.92-126.4a25 25 0 1 1 14.7-1.85l54.31 117 54.42-117.3a25 25 0 1 1 14.58 2.08l20.93 126.42 87.26-71.3a25 25 0 1 1 44.51-15.63zm-71.66 241.25h-300v60h300v-60zm-27.75-52h-244.22v36h244.22v-36z" 
          style={style} 
          transform="translate(0, 0) scale(1, 1) rotate(-360, 256, 256)" />
      </g>
    );
  }
}

export default Queen;