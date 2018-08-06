import React from 'react';
import PropTypes from 'prop-types';

class Sidestep extends React.Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };

    return (
      <g title="Sidestep" transform="scale(0.0018,0.0018) translate(20,20)">
        <path 
           d="M233.373 387.02H165.49L256 477.53l90.51-90.51h-67.883V124.98h67.883L256 34.47l-90.51 90.51h67.883v262.04z"
          style={style}
          transform="translate(0, 0) rotate(-360, 256, 256)" />
      </g>
    );
  }
}

export default Sidestep;