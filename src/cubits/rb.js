import React from 'react';
import PropTypes from 'prop-types';

class RnB extends React.Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <path 
          d="M304.833 16c-261.69 0-320.71 387.657-62.343 387.657 86.284 0 86.955-129.375 0-129.375-139.947 0-99.134-202.896 62.343-258.282zm-30.938 92.343c-86.283 0-86.955 129.375 0 129.375 139.95 0 88.353 202.896-73.125 258.282 261.69 0 331.49-387.657 73.125-387.657z"
          style={style}
          transform="translate(0, 0) rotate(-360, 256, 256)" />
      </g>
    );
  }
}

export default RnB;