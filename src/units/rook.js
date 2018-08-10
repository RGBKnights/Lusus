import React from 'react';
import PropTypes from 'prop-types';

class Rook extends React.Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.team === 'b' ? '#000000' : '#FFFFFF';
    let styleMain = { fill: teamColor, fillOpacity: 1 };
    let styleRank = { fill: this.props.color ? this.props.color : teamColor, fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <path style={styleRank} d="M406 484.7L106 484.7L106 424.7L406 424.7L406 484.7Z" ></path>
        <path style={styleMain} d="M349.33 153.87L299.28 153.87L299.28 91.3L216.89 91.3L216.89 153.87L162.67 153.87L162.67 91.3L108.44 91.3L108.44 204.97L403.56 204.97L403.56 91.3L349.33 91.3L349.33 153.87Z" ></path>
        <path style={styleMain} d="M372.68 221.1L139.32 221.1L139.32 408.7L372.68 408.7L372.68 221.1Z"></path>
      </g>
    );
  }
}

export default Rook;