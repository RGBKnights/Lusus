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
    name: PropTypes.string,
    color: PropTypes.string,
    value: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';

    return (
      <g transform="scale(0.02,0.02) translate(7,30)">
        <title>{this.props.name}</title>
        <text style={{strokeWidth:0, fill: teamColor}}>{this.props.name}</text>
      </g>
    );
  }
}


export class CubitOrthogonal extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path 
           d="M256 34.47l-90.51 90.51h67.883v108.393H124.98V165.49L34.47 256l90.51 90.51v-67.883h108.393V387.02H165.49L256 477.53l90.51-90.51h-67.883V278.627H387.02v67.883L477.53 256l-90.51-90.51v67.883H278.627V124.98h67.883L256 34.47z"
          style={style}
          transform="translate(0, 0) scale(1, 1) rotate(-360, 256, 256)" />
      </g>
    );
  }
}


export class CubitDiagonal extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };

    return (
      <g transform=" scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path 
           d="M256 34.47l-90.51 90.51h67.883v108.393H124.98V165.49L34.47 256l90.51 90.51v-67.883h108.393V387.02H165.49L256 477.53l90.51-90.51h-67.883V278.627H387.02v67.883L477.53 256l-90.51-90.51v67.883H278.627V124.98h67.883L256 34.47z"
          style={style}
          transform="translate(0, 0) scale(1, 1) rotate(-315, 256, 256)" />
      </g>
    );
  }
}

export class CubitCardinal extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let altColor = this.props.color === 'b' ? '#FFFFFF' : '#000000';
    let style1 = { fill: altColor, fillOpacity: 1 };
    let style2 = { fill: teamColor, fillOpacity: 1 };

    return (
      <g transform=" scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path 
           d="M256 34.47l-90.51 90.51h67.883v108.393H124.98V165.49L34.47 256l90.51 90.51v-67.883h108.393V387.02H165.49L256 477.53l90.51-90.51h-67.883V278.627H387.02v67.883L477.53 256l-90.51-90.51v67.883H278.627V124.98h67.883L256 34.47z"
          style={style1}
          transform="translate(0, 0) scale(1, 1) rotate(-315, 256, 256)" />
        <path 
           d="M256 34.47l-90.51 90.51h67.883v108.393H124.98V165.49L34.47 256l90.51 90.51v-67.883h108.393V387.02H165.49L256 477.53l90.51-90.51h-67.883V278.627H387.02v67.883L477.53 256l-90.51-90.51v67.883H278.627V124.98h67.883L256 34.47z"
          style={style2}
          transform="translate(0, 0) scale(1, 1) rotate(-360, 256, 256)" />
      </g>
    );
  }
}

export class CubitPattern extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let altColor = this.props.color === 'b' ? '#FFFFFF' : '#000000';
    let mainStyle = { fill: teamColor, fillOpacity: 1 };
    let altStyle = { fill: altColor, fillOpacity: 1 };
    let endStyle = { fill: "#9b9b9b", fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path 
          d="M150.5 83.5C145.253 83.5 141 87.753 141 93L141 189C141 194.247 145.253 198.5 150.5 198.5C145.253 198.5 141 202.753 141 208L141 304C141 309.247 145.253 313.5 150.5 313.5C145.253 313.5 141 317.753 141 323L141 419C141 424.247 145.253 428.5 150.5 428.5L246.5 428.5C251.747 428.5 256 424.247 256 419C256 424.247 260.253 428.5 265.5 428.5L361.5 428.5C366.747 428.5 371 424.247 371 419L371 323C371 317.753 366.747 313.5 361.5 313.5L265.5 313.5C260.253 313.5 256 317.753 256 323C256 317.753 251.747 313.5 246.5 313.5C251.747 313.5 256 309.247 256 304L256 208C256 202.753 251.747 198.5 246.5 198.5C251.747 198.5 256 194.247 256 189L256 93C256 87.753 251.747 83.5 246.5 83.5L150.5 83.5Z" 
          style={mainStyle}></path>
        <path d="M160 102.5L237 102.5L237 179.5L160 179.5L160 102.5Z" style={altStyle}></path>
        <path d="M160 217.5L237 217.5L237 294.5L160 294.5L160 217.5Z" style={altStyle}></path>
        <path d="M160 332.5L237 332.5L237 409.5L160 409.5L160 332.5Z" style={altStyle}></path>
        <path d="M275 332.5L352 332.5L352 409.5L275 409.5L275 332.5Z" style={endStyle}></path>
      </g>
    );
  }
}

export class CubitSidestep extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };

    return (
      <g title="Sidestep" transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path 
           d="M233.373 387.02H165.49L256 477.53l90.51-90.51h-67.883V124.98h67.883L256 34.47l-90.51 90.51h67.883v262.04z"
          style={style}
          transform="translate(0, 0) rotate(-360, 256, 256)" />
      </g>
    );
  }
}

export class CubitSwap extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path 
          d="M241.844 28.625l-21.188 5.063L33.25 78.53l-9.594 2.282 2.813 9.47 54.718 184.03 6.156 20.782 10.875-18.75 36.624-63.125 39.344 22.655 9.375-16.188-47.47-27.312L128 187.72l-4.656 8.06-30.406 52.47-45.75-153.844 156.625-37.47-30.344 52.345-4.69 8.126 8.126 4.656L332.75 211.75l-17.594 30.344 16.22 9.312 22.25-38.375 4.687-8.124-8.125-4.656-155.844-89.688 36.594-63.093 10.906-18.845zm-28.25 176.47l-57.438 99.31 155.22 89.5 8.093 4.658-4.69 8.093-44.06 76.25 218.81-52.5-63.874-215.47-44.094 76.25-4.656 8.064-8.094-4.656-155.218-89.5z" 
          style={style}
          transform="translate(0, 0) rotate(-360, 256, 256)" />
      </g>
    );
  }
}

export class CubitDrawPlus extends React.Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path 
          d="M209.955 488.202l-121.242-46.62c-11.308-4.34-11.643-12.087-.79-17.288L204.8 469.236c15.024 5.777 37.23 4.92 51.774-1.96l161.522-76.6c10.014 4.436 9.864 11.818-.67 16.798L250.43 486.668c-10.983 5.195-29.128 5.902-40.477 1.534zm0-32.37L88.713 409.21C79.09 405.52 77.41 399.36 83.81 394.4l120.99 46.517c15.024 5.776 37.23 4.92 51.774-1.96l165.393-78.433c5.855 4.417 4.38 10.36-4.542 14.58l-166.993 79.193c-10.983 5.196-29.128 5.903-40.477 1.534zm0-28.314L88.713 380.892c-9.624-3.69-11.302-9.85-4.902-14.813l120.99 46.523c15.024 5.77 37.23 4.914 51.774-1.96l165.393-78.438c5.855 4.416 4.38 10.36-4.542 14.58l-166.993 79.2c-10.983 5.194-29.128 5.895-40.477 1.533zm0-28.32L88.713 352.572c-9.624-3.69-11.302-9.85-4.902-14.812l120.99 46.524c15.024 5.776 37.23 4.92 51.774-1.96l165.393-78.44c5.855 4.424 4.38 10.368-4.542 14.586l-166.993 79.194c-10.983 5.196-29.128 5.897-40.477 1.534zm0-28.32L88.713 324.26c-11.35-4.355-11.643-12.15-.66-17.353l87.236-41.376 34.826 18.323c15.365 8.09 37.937 7.06 52.5-2.39l65.74-42.672 88.404 34.007c11.344 4.357 11.65 12.16.665 17.354l-166.993 79.195c-10.983 5.195-29.128 5.902-40.477 1.534zm6.85-99.73L93.44 206.22c-10.767-5.67-11.217-15.647-1.018-22.268l105.11-68.228h25.845l.015 64.962h58.664v-64.962H332.2l-27.487-41.39 118.91 62.584c10.763 5.67 11.212 15.646 1.013 22.268L254.803 269.418c-10.2 6.62-27.23 7.4-37.997 1.73zm21.637-105.523V100.67h-34.845l49.13-79.74 49.12 79.74H267v64.955h-28.558z" 
          style={style}
          transform="translate(0, 0) rotate(-360, 256, 256)" />
        <g transform="translate(256,256)">
          <circle cx="128" cy="128" r="128" fill="#000"></circle>
          <circle stroke="#fff" fill="#000" strokeWidth="18" cx="128" cy="128" r="101"></circle>
          <path fill="#fff" d="M119 64v55H64v18h55v55h18v-55h55v-18h-55V64h-18z"></path>
        </g>
      </g>
      
    );
  }
}

export class CubitDrawMinus extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path 
          d="M209.955 488.202l-121.242-46.62c-11.308-4.34-11.643-12.087-.79-17.288L204.8 469.236c15.024 5.777 37.23 4.92 51.774-1.96l161.522-76.6c10.014 4.436 9.864 11.818-.67 16.798L250.43 486.668c-10.983 5.195-29.128 5.902-40.477 1.534zm0-32.37L88.713 409.21C79.09 405.52 77.41 399.36 83.81 394.4l120.99 46.517c15.024 5.776 37.23 4.92 51.774-1.96l165.393-78.433c5.855 4.417 4.38 10.36-4.542 14.58l-166.993 79.193c-10.983 5.196-29.128 5.903-40.477 1.534zm0-28.314L88.713 380.892c-9.624-3.69-11.302-9.85-4.902-14.813l120.99 46.523c15.024 5.77 37.23 4.914 51.774-1.96l165.393-78.438c5.855 4.416 4.38 10.36-4.542 14.58l-166.993 79.2c-10.983 5.194-29.128 5.895-40.477 1.533zm0-28.32L88.713 352.572c-9.624-3.69-11.302-9.85-4.902-14.812l120.99 46.524c15.024 5.776 37.23 4.92 51.774-1.96l165.393-78.44c5.855 4.424 4.38 10.368-4.542 14.586l-166.993 79.194c-10.983 5.196-29.128 5.897-40.477 1.534zm0-28.32L88.713 324.26c-11.35-4.355-11.643-12.15-.66-17.353l87.236-41.376 34.826 18.323c15.365 8.09 37.937 7.06 52.5-2.39l65.74-42.672 88.404 34.007c11.344 4.357 11.65 12.16.665 17.354l-166.993 79.195c-10.983 5.195-29.128 5.902-40.477 1.534zm6.85-99.73L93.44 206.22c-10.767-5.67-11.217-15.647-1.018-22.268l105.11-68.228h25.845l.015 64.962h58.664v-64.962H332.2l-27.487-41.39 118.91 62.584c10.763 5.67 11.212 15.646 1.013 22.268L254.803 269.418c-10.2 6.62-27.23 7.4-37.997 1.73zm21.637-105.523V100.67h-34.845l49.13-79.74 49.12 79.74H267v64.955h-28.558z" 
          style={style}
          transform="translate(0, 0) rotate(-360, 256, 256)" />
        <g transform="translate(256,256)">
          <circle cx="128" cy="128" r="128" fill="#000"></circle>
          <circle stroke="#fff" fill="#000" strokeWidth="18" cx="128" cy="128" r="101"></circle>
          <path fill="#fff" d="M64 119v18h128v-18z"></path>
        </g>
      </g>
      
    );
  }
}

export class CubitDoubleAction extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path 
          d="M272.824 24.318c-14.929.312-25.66 3.246-32.767 8.446L142.898 84.91l-54.105 73.514C77.42 175.98 85.517 210 121.111 188.197l38.9-51.351c49.476-42.711 150.485-23.032 102.587 62.591-23.53 49.582-12.457 73.79 17.76 83.95l13.812-46.381c23.949-53.825 68.502-63.51 66.684-106.904l107.302 7.724-.865-112.045-194.467-1.463zm-54.09 103.338c-17.41-.3-34.486 6.898-46.92 17.375l-39.044 51.33c10.713 8.506 21.413 3.96 32.125-6.363 12.626 6.394 22.365-3.522 30.365-23.297 3.317-13.489 8.21-23.037 23.474-39.045zm-32.617 88.324a13.49 13.49 0 0 0-5.232 1.235L51.72 276.725c-6.784 3.13-9.763 11.202-6.633 17.992l85.27 185.08c3.131 6.783 11.204 9.779 18 6.635l129.15-59.504c6.796-3.137 9.776-11.198 6.646-18L198.871 223.86c-2.344-5.097-7.474-8.043-12.754-7.88z" 
          style={style}
          transform="translate(0, 0) rotate(-360, 256, 256)" />
        <g transform="translate(256,256)">
          <circle cx="128" cy="128" r="128" fill="#000"></circle>
          <circle stroke="#fff" fill="#000" strokeWidth="18" cx="128" cy="128" r="101"></circle>
          <path fill="#fff" d="M119 64v55H64v18h55v55h18v-55h55v-18h-55V64h-18z"></path>
        </g>
      </g>
    );
  }
}

export class CubitCondemn extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path 
          d="M256.22 24.594C174.977 24.444 95.923 66.54 52.374 141.97c-64.817 112.266-26.36 255.744 85.906 320.56 112.268 64.818 255.747 26.362 320.564-85.905 64.817-112.267 26.36-255.745-85.906-320.563-36.838-21.268-77.044-31.395-116.72-31.468zm-.126 45.562c31.98.056 64.38 8.237 94.062 25.375 82.963 47.9 115.894 149.142 80.5 235.376L184 84.25c22.816-9.31 47.322-14.137 72.094-14.094zm-117.125 40.22l265.53 265.53c-9.55 12.227-20.382 23.04-32.22 32.313L106.69 142.624c9.556-12.224 20.435-22.984 32.28-32.25zm-58.407 77.28L327.25 434.344c-52.287 21.37-113.55 19.208-166.25-11.22-82.987-47.912-115.88-149.212-80.438-235.468z"
          style={style}
          transform="translate(0, 0) scale(1, 1) rotate(-360, 256, 256)" />
      </g>
    );
  }
}

export class CubitKnowledge extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path 
          d="M254.563 20.75c-42.96 0-85.918 16.387-118.688 49.156-65.54 65.54-65.852 172.15-.313 237.688 65.54 65.54 172.15 65.226 237.688-.313 65.54-65.538 65.54-171.835 0-237.374-32.77-32.77-75.728-49.156-118.688-49.156zm-.157 18.47c25.68.053 51.363 6.724 74.313 19.968-13.573-3.984-26.266-2.455-34.22 5.5-14.437 14.437-7.796 44.485 14.813 67.093 22.608 22.61 52.625 29.22 67.062 14.782 8.523-8.522 9.706-22.468 4.594-37.125 36.352 57.684 29.586 134.6-20.69 184.875-29.158 29.16-67.353 43.773-105.56 43.813 9.436-2.3 17.762-6.732 24.436-13.406 28.885-28.886 15.64-88.954-29.594-134.19-45.234-45.233-105.302-58.51-134.187-29.624-4.052 4.052-7.266 8.723-9.688 13.875 3.092-33.537 17.473-66.222 43.157-91.905 29.198-29.2 67.384-43.737 105.562-43.656zM386.97 319.28c-.205.206-.39.422-.595.626-72.78 72.78-191.252 73.155-264.03.375-.278-.275-.54-.565-.814-.842-11.987 9.483-18.81 20.384-18.81 32 0 36.523 67.315 66.125 151.343 66.125 84.027 0 152.093-29.6 152.093-66.125 0-11.68-6.97-22.637-19.187-32.157zm39.717 54.564c-22.225 32.29-91.192 55.906-172.625 55.906-81.172 0-149.954-23.46-172.406-55.594-12.638 11.3-19.72 24.052-19.72 37.563.002 46.928 85.546 85.03 192.064 85.03 106.518 0 192.97-38.1 192.97-85.03 0-13.637-7.313-26.498-20.283-37.876z"
          style={style}
          transform="translate(0, 0) scale(1, 1) rotate(-360, 256, 256)" />
      </g>
    );
  }
}

export class CubitKingOfHill extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
  };

  render() {
    let teamColor = this.props.color === 'b' ? '#000000' : '#FFFFFF';
    let style = { fill: teamColor, fillOpacity: 1 };

    return (
      <g transform="scale(0.0018,0.0018) translate(20,20)">
        <title>{this.props.name}</title>
        <path 
          d="M247 55v203.248c-3.565-.103-7.126-.164-10.68-.154-62.774.18-123.48 18.017-170.16 55.783-18.406 14.89-34.696 32.91-48.16 54.28V494h208.92c43.583-100.15 136.274-151 230.414-151 2.962 0 5.926.056 8.89.156-1.515-1.36-3.045-2.705-4.59-4.035-53.44-45.953-125.055-74.07-196.634-79.884v-99.66c27.09-2.53 46.44-15.576 71-15.576 27.195 0 48 16 80 16V80c-32 0-48-16-80-16-28.854 0-44.703 13.005-71 15.563V55zm210.334 306c-85.44 0-168.606 43.956-210.47 133H494V363.73c-12.176-1.816-24.436-2.73-36.666-2.73z"
          style={style}
          transform="translate(0, 0) rotate(-360, 256, 256)" />
      </g>
    );
  }
}