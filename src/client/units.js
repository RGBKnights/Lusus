import React from 'react';
import PropTypes from 'prop-types';

import { CubitText } from './cubits';
import { UNIT_TYPES, UNIT_FILE } from '../game/common';

export class UnitBishop extends React.Component {
  static propTypes = {
    team: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string
  };

  render() {
    let teamColor = this.props.team === 'b' ? '#000000' : '#FFFFFF';
    let styleMain = { fill: teamColor };
    let styleRank = { fill: this.props.color };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path style={styleRank} d="M406.02 476.915L106.02 476.915L106.02 416.915L406.02 416.915L406.02 476.915Z"></path>
        <path style={styleMain} d="M322.56 295.915L189.48 295.915L189.48 313.565L322.56 313.565L322.56 295.915Z"></path>
        <path style={styleMain} d="M334.34 218.225C334.457 239.153 331.288 259.97 324.95 279.915L187.09 279.915C180.752 259.97 177.583 239.153 177.7 218.225C177.7 159.135 201.52 109.225 234.11 93.555C214.765 76.689 220.933 45.206 245.212 36.886C269.491 28.566 293.672 49.649 288.738 74.835C287.314 82.102 283.512 88.688 277.93 93.555C310.52 109.265 334.34 159.135 334.34 218.225Z"></path>
        <path style={styleMain} d="M283.27 169.315L264.02 169.315L264.02 145.395L248.02 145.395L248.02 169.315L228.76 169.315L228.76 185.315L248.02 185.315L248.02 236.855L264.02 236.855L264.02 185.315L283.27 185.315L283.27 169.315Z"></path>
        <path style={styleMain} d="M321.42 350.005L321.42 329.565L190.62 329.565L190.62 350.005L93.29 350.005L93.29 350.115L142.75 399.575L224.83 399.575L255.98 363.575L287.13 399.575L369.57 399.575L418.44 350.705L418.71 350.015L321.42 350.015Z"></path>
      </g>
    );
  }
}

export class UnitKing extends React.Component {
  static propTypes = {
    team: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string
  };

  render() {
    let teamColor = this.props.team === 'b' ? '#000000' : '#FFFFFF';
    let styleMain = { fill: teamColor };
    let styleRank = { fill: this.props.color };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
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

export class UnitKnight extends React.Component {
  static propTypes = {
    team: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string
  };

  render() {
    let teamColor = this.props.team === 'b' ? '#000000' : '#FFFFFF';
    let styleMain = { fill: teamColor };
    let styleRank = { fill: this.props.color };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path style={styleRank} d="M60.81 476.91L360.81 476.91L360.81 416.91L60.81 416.91L60.81 476.91Z" ></path>
        <path style={styleMain} d="M294.6 129.61L308.54 137C340.42 93.38 369.88 105.15 369.88 105.15L348.26 158.15L383.9 177.15L386.77 210.15L451.19 318.9L407.64 348.27C407.64 348.27 380.82 311.88 367.99 304.61C357.33 298.61 326.77 294.36 311.82 292.61L244.28 215.7L232.28 226.26L269.43 268.57C269.3 268.75 269.18 268.94 269.05 269.14C233.27 327.31 292.05 374.83 337.54 400.92L84.14 400.92C93 85 294.6 129.61 294.6 129.61Z" ></path>
      </g>
    );
  }
}

export class UnitPawn extends React.Component {
  static propTypes = {
    team: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string
  };

  render() {
    let teamColor = this.props.team === 'b' ? '#000000' : '#FFFFFF';
    let styleMain = { fill: teamColor };
    let styleRank = { fill: this.props.color };
    // style={{opacity: 0.4}}

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path style={styleMain} d="M312.07 194.46C312.07 237.623 265.345 264.599 227.965 243.018C190.585 221.437 190.585 167.483 227.965 145.902C236.489 140.981 246.158 138.39 256 138.39C286.967 138.39 312.07 163.493 312.07 194.46Z"></path>
			  <path style={styleRank} d="M406 418.01L106 418.01L106 478.01L406 478.01L406 418.01Z"></path>
			  <path style={styleMain} d="M282.33 261.52C265.586 268.119 246.974 268.191 230.18 261.72C229.45 320.63 167.83 375.78 133.43 402L378.9 402C344.81 375.67 283.46 320.22 282.33 261.52Z"></path>
      </g>
    );
  }
}

export class UnitQueen extends React.Component {
  static propTypes = {
    team: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string
  };

  render() {
    let teamColor = this.props.team === 'b' ? '#000000' : '#FFFFFF';
    let styleMain = { fill: teamColor };
    let styleRank = { fill: this.props.color };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path style={styleMain} d="M477.518 181.966C477.553 199.964 459.131 212.1 442.608 204.966L380.318 355.226L131.398 355.226L69.158 205.036C51.413 212.484 32.259 197.929 34.682 178.837C37.104 159.745 59.286 150.435 74.609 162.079C85.854 170.625 87.793 186.783 78.888 197.746L165.888 268.946L186.808 142.546C167.859 139.183 159.656 116.568 172.043 101.84C184.43 87.111 208.116 91.315 214.678 109.406C219.128 121.675 213.392 135.303 201.508 140.696L255.818 257.696L310.238 140.396C292.832 132.187 290.84 108.213 306.652 97.243C322.465 86.274 344.223 96.535 345.816 115.714C346.9 128.756 337.743 140.426 324.818 142.476L345.748 268.896L433.008 197.596C420.974 182.577 429.712 160.164 448.735 157.252C463.874 154.934 477.519 166.651 477.518 181.966Z"></path>
        <path style={styleRank} d="M405.858 423.216L105.858 423.216L105.858 483.216L405.858 483.216L405.858 423.216Z"></path>
        <path style={styleMain} d="M378.108 371.216L133.888 371.216L133.888 407.216L378.108 407.216L378.108 371.216Z"></path>
      </g>
    );
  }
}

export class UnitRook extends React.Component {
  static propTypes = {
    team: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string
  };

  render() {
    let teamColor = this.props.team === 'b' ? '#000000' : '#FFFFFF';
    let styleMain = { fill: teamColor, fillOpacity: 1 };
    let styleRank = { fill: this.props.color, fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path style={styleRank} d="M406 484.7L106 484.7L106 424.7L406 424.7L406 484.7Z" ></path>
        <path style={styleMain} d="M349.33 153.87L299.28 153.87L299.28 91.3L216.89 91.3L216.89 153.87L162.67 153.87L162.67 91.3L108.44 91.3L108.44 204.97L403.56 204.97L403.56 91.3L349.33 91.3L349.33 153.87Z" ></path>
        <path style={styleMain} d="M372.68 221.1L139.32 221.1L139.32 408.7L372.68 408.7L372.68 221.1Z"></path>
      </g>
    );
  }
}

export function getUnitElement(unit) {
  let teamColors = {'0': 'w', '1': 'b'};

  let unitColors = {};
  unitColors[UNIT_FILE.A] = '#FF5733';
  unitColors[UNIT_FILE.B] = '#F9FF33';
  unitColors[UNIT_FILE.C] = '#008000';
  unitColors[UNIT_FILE.D] = '#33FFA8';
  unitColors[UNIT_FILE.E] = '#33F6FF';
  unitColors[UNIT_FILE.F] = '#3346FF';
  unitColors[UNIT_FILE.G] = '#800080';
  unitColors[UNIT_FILE.H] = '#FF0000';

  let team =  teamColors[unit.ownership];
  let color = unitColors[unit.file];

  let type = CubitText;
  let params = { name: unit.name, team: team, color: color };

  switch (unit.type) {
    case UNIT_TYPES.Bishop:
    {
      type = UnitBishop;
      break;
    }
    case UNIT_TYPES.King:
    {
      type = UnitKing;
      break;
    }
    case UNIT_TYPES.Knight:
    {
      type = UnitKnight;
      break;
    }
    case UNIT_TYPES.Pawn:
    {
      type = UnitPawn;
      break;
    }
    case UNIT_TYPES.Queen:
    {
      type = UnitQueen;
      break;
    }
    case UNIT_TYPES.Rook:
    {
      type = UnitRook;
      break;
    }
    default:
      break;
  }

 
  let element =  React.createElement(type, params);
  return element;
}