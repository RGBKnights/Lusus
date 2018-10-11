import React from 'react';
import PropTypes from 'prop-types';

export class CubitLogo extends React.Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };
    
    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <path 
          d="M388.53 21.53c-38.006 30.546-63.492 66.122-83.952 103.687 12.746 7.812 25.587 14.923 38.516 21.38l88.744 34.04c13.746 3.8 27.583 6.995 41.51 9.625 13.493-42.908 19.872-85.824 19.433-128.73l-104.25-40zm-266.813 3.88l15.133 64.967 68.95 16.38-12.993-64.525-71.09-16.822zm-17.594 6.848L66.896 79.803l12.358 62.025 39.494-46.785-14.625-62.785zm27.783 76.148l-37.094 43.97 52.165 7.718c7.243-2.11 14.482-4.097 21.716-5.967l27.62-30.408-64.407-15.314zm170.57 37.346l8.776 58.912c5.91 6.06 11.636 12.256 17.13 18.615l89.024 34.157 45.317-50.218c-54.72-11.1-108.31-30.82-160.248-61.468zm-70.09 13.482c-49.324 9.35-98.335 21.9-147.224 42.645 40.825 34.878 76.848 72.364 105.988 113.538l149.204-44.686c-26.533-41.862-66.002-77.02-107.97-111.498zM65.71 209.848C45.093 260.13 28.07 311.115 24.24 367.025c24.535 52.892 70.202 90.623 110.764 119.72l42.476-158.45c-29.975-42.853-68.05-81.942-111.77-118.447zM351.07 287.03L195.39 333.66l-42.146 157.22c52.167-7.854 103.99-21.873 155.822-48.26 24.952-53.52 30.504-99.728 42.002-155.587z" 
          style={style}
          transform="translate(0, 0) rotate(-360, 256, 256)" />
      </g>
    );
  }
}

export class CubitText extends React.Component {
    static propTypes = {
      team: PropTypes.string,
      color: PropTypes.string,
      value: PropTypes.string,
    };

    getColor(rankColor) {
      if(rankColor) {
        return <g transform="translate(-20,10)">
          <rect width="40" height="3" style={{fill: rankColor}} />
        </g>;
      }
    }

    singleLine(teamColor, rankColor, value) {
      return <g transform="scale(0.016,0.016) translate(30,30)">
          <title>{this.props.value}</title>
          <text style={{strokeWidth:0, fill: teamColor}} textAnchor="middle" dominantBaseline="central">{value}</text>
          { this.getColor(rankColor) }
        </g>;
    }

    doubleLine(teamColor, rankColor, parts) {
      return <g transform="scale(0.016,0.016) translate(30,30)">
          <title>{this.props.value}</title>
          
          <g transform="translate(0,-10)">
            <text style={{strokeWidth:0, fill: teamColor}} textAnchor="middle" dominantBaseline="central">{parts[0]}</text>
          </g>
          <g transform="translate(0,10)">
            <text style={{strokeWidth:0, fill: teamColor}} textAnchor="middle" dominantBaseline="central">{parts[1]}</text>
          </g>
          { this.getColor(rankColor) }
        </g>;
    }

    tripleLine(teamColor, rankColor, parts) {
      return <g transform="scale(0.016,0.016) translate(30,30)">
          <title>{this.props.value}</title>
          <g transform="translate(0,-10)">
            <text style={{strokeWidth:0, fill: teamColor}} textAnchor="middle" dominantBaseline="central">{parts[0]}</text>
          </g>
          <g transform="translate(0,0)">
            <text style={{strokeWidth:0, fill: teamColor}} textAnchor="middle" dominantBaseline="central">{parts[1]}</text>
          </g>
          <g transform="translate(0,10)">
            <text style={{strokeWidth:0, fill: teamColor}} textAnchor="middle" dominantBaseline="central">{parts[2]}</text>
          </g>
          { this.getColor(rankColor) }
        </g>;
    }
  
    render() {
      let teamColor = this.props.team === 'b' ? '#000000' : '#FFFFFF';
      let rankColor = this.props.color;

      let parts = this.props.value.split(' ');
      if(parts.length === 2) {
        return this.doubleLine(teamColor, rankColor, parts);
      } else if(parts.length === 3) { 
        return this.tripleLine(teamColor, rankColor, parts);
      } else {
        return this.singleLine(teamColor, rankColor, this.props.value);
      }

    }
  }
  