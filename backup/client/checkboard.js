
class Checkerboard extends React.Component {
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
    cols: 8,
    onClick: () => {},
    primaryColor: '#817F7F',
    secondaryColor: '#D7D6D6',
    highlights: [],
    style: {},
  };

  onClick = ({ x, y }) => {
    this.props.onClick({ x, y });
  };

  render() {
    const tokens = this.props.children;

    // Build colorMap with checkerboard pattern.
    let colorMap = {};
    for (let x = 0; x < this.props.cols; x++) {
      for (let y = 0; y < this.props.rows; y++) {
        const key = `${x},${y}`;
        colorMap[key] = ((x + y) % 2 === 0) ?  this.props.primaryColor : this.props.secondaryColor;
      }
    }

    // Add highlighted squares.
    for (const square of this.props.highlights) {
      const key = `${square.x},${square.y}`;
      colorMap[key] = square.color;
    }

    return (
      <Grid
        rows={this.props.rows}
        cols={this.props.cols}
        style={this.props.style}
        onClick={this.onClick}
        colorMap={colorMap}
        style={{ strokeWidth: 0.02, stroke: '#000000' }}
      >
        {tokens}
      </Grid>
    );
  }
}
