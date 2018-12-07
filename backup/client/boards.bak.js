
/*
class FieldVertical extends React.Component {
  static propTypes = {
    rows: PropTypes.number,
    cols: PropTypes.number,
    onClick: PropTypes.func,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    highlightedSquares: PropTypes.array,
    style: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
  };

  static defaultProps = {
    rows: 26,
    cols: 8,
    onClick: () => {},
    baseColor: '#000000',
    primaryColor: '#817F7F',
    secondaryColor: '#ADAAAA',
    highlights: [],
    style: { strokeWidth: 0.02, stroke: '#000000' },
  };

  onClick = ({ x, y }) => {
    this.props.onClick({ x, y });
  };

  render() {
    const tokens = this.props.children;

    // Fill board with base color
    let colorMap = {};
    for (let x = 0; x < this.props.cols; x++) {
      for (let y = 0; y < this.props.rows; y++) {
        const key = `${x},${y}`;
        if(y < 8)  {
          colorMap[key] = this.props.primaryColor
        } else if(y > 8 && y < 17) {
          colorMap[key] = ((x + y) % 2 === 0) ?  this.props.secondaryColor : this.props.primaryColor;
        } else if(y > 17)  {
          colorMap[key] = this.props.secondaryColor
        } else {
          colorMap[key] = this.props.baseColor
        }
      }
    }

    // Build colorMap with checkerboard pattern.

    // Add highlighted squares.
    for (const square of this.props.highlights) {
      const key = `${square.x},${square.y}`;
      colorMap[key] = square.color;
    }

    return (
      <Grid
        rows={this.props.rows}
        cols={this.props.cols}
        onClick={this.onClick}
        colorMap={colorMap}
        style={this.props.style}
      >
        {tokens}
      </Grid>
    );
  }
}

class FieldHorizontal extends React.Component {
  static propTypes = {
    rows: PropTypes.number,
    cols: PropTypes.number,
    onClick: PropTypes.func,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    highlightedSquares: PropTypes.array,
    style: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
  };

  static defaultProps = {
    rows: 8,
    cols: 26,
    onClick: () => {},
    baseColor: '#000000',
    primaryColor: '#817F7F',
    secondaryColor: '#ADAAAA',
    highlights: [],
    style: { strokeWidth: 0.02, stroke: '#000000' },
  };

  onClick = ({ x, y }) => {
    this.props.onClick({ x, y });
  };

  render() {
    const tokens = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { x:child.props.y, y:child.props.x });
    });

    // Fill board with base color
    let colorMap = {};
    for (let x = 0; x < this.props.cols; x++) {
      for (let y = 0; y < this.props.rows; y++) {
        const key = `${x},${y}`;
        if(x < 8)  {
          colorMap[key] = this.props.primaryColor
        } else if(x > 8 && x < 17) {
          colorMap[key] = ((x + y) % 2 === 0) ?  this.props.secondaryColor : this.props.primaryColor;
        } else if(x > 17)  {
          colorMap[key] = this.props.secondaryColor
        } else {
          colorMap[key] = this.props.baseColor
        }
      }
    }

    // Build colorMap with checkerboard pattern.

    // Add highlighted squares.
    for (const square of this.props.highlights) {
      const key = `${square.x},${square.y}`;
      colorMap[key] = square.color;
    }

    return (
      <Grid
        rows={this.props.rows}
        cols={this.props.cols}
        onClick={this.onClick}
        colorMap={colorMap}
        style={this.props.style}
      >
        {tokens}
      </Grid>
    );
  }
}
*/
