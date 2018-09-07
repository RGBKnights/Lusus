import React from 'react';
import PropTypes from 'prop-types';
import {
  CubitText
} from './cubits';

// Bootstrap
import { 
  Container, Row, Col,
  Navbar, NavbarBrand, Nav, NavItem
} from 'reactstrap';

// UI
import { 
  Token, Grid
} from 'boardgame.io/ui';

// Logic
import { 
  CUBIT_LOCATIONS,
  CLASSIFICATIONS
} from '../game/cubits';

class Board {
  constructor(parent, where, name, width, height, player = null) {
    // Data
    this.parent = parent;
    this.viewState = this.parent.state;
    this.gameState = this.parent.props.G;
    this.name = name;
    this.where = where;
    this.size = { width: width, height: height };
    this.player = player;

    // Styling
    this.style = { strokeWidth:0.05, stroke:'#fff' };
    this.teams = {'0': 'w', '1': 'b'};
    this.backgroundColor = '#959595';
    this.whiteColor = '#817F7F';
    this.backColor = '#ABAAAA';
    // Selection
    this.selectedColor = '#4E9334';
    // Targeting
    this.passiveMoveColor = '#BE8E3F';
    this.captureMoveColor = '#B63C4B';
  }

  isSelected(obj) {
    return (this.viewState.selection != null && this.viewState.selection === obj.id);
  }
}

class FieldBoard extends Board {
  constructor(parent) {
    super(parent, CUBIT_LOCATIONS.Field, "Field", 8, 8);
    
    this.location = this.gameState.locations.find(l => l.key === CUBIT_LOCATIONS.Field);

    this.onCellClick = this.onCellClick.bind(this); // Bindings (this)
  }

  getGrid = () => {
    let background = {};
    let tokens = [];

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        // Background
        const key = `${x},${y}`;
        background[key] = ((x + y) % 2 === 0) ? this.whiteColor : this.backColor;

        // Units
        let units = this.location.at(x, y, CLASSIFICATIONS.Unit);
        for (let i = 0; i < units.length; i++) {
          const unit = units[i];

          if(this.isSelected(unit)) {
            background[key] = this.selectedColor;
          }

          const team = this.teams[unit.ownership];
          let token = <Token key={unit.id} x={x} y={y}><CubitText name={unit.name} value={unit.name} team={team} color={unit.color} /></Token>

          tokens.push(token);
        }
      }
    }
    
    return <Grid rows={this.size.height} cols={this.size.width} onClick={this.onCellClick} colorMap={background} style={this.style}>{tokens}</Grid>;
  }

  onCellClick = ({ x, y }) => {
    let collection = this.location.at(x, y);
    //TODO: Add UI to pick which object to select;
    let what = collection[0];
    
    if(this.viewState.selection === what.id) {
      this.parent.setState({ selection: null, target: [] });
    } else {
      this.parent.setState({ selection: what.id, target: [] });
    }
  }
}


class UnitBoard extends Board {
  constructor(parent, player) {
    super(parent, CUBIT_LOCATIONS.Unit, "Units", 5, 0, player);

    this.location = this.gameState.locations.find(l => l.key === CUBIT_LOCATIONS.Field);

    this.onCellClick = this.onCellClick.bind(this); // Bindings (this)
  }

  getGrid = () => {
    let units = this.location.getUnits(this.player);
    this.size.height = units.length;

    let background = {};

    let tokens = [];
    for (let i = 0; i < units.length; i++) {
      const unit = units[i];

      // Background
      const key = `${0},${i}`;
      background[key] = this.backgroundColor;
      for (let x = 0; x < unit.slots; x++) {
        background[`${x+1},${i}`] = this.backgroundColor;
      }
      if(this.isSelected(unit)) {
        background[key] = this.selectedColor;
      }

      // Units
      const team = this.teams[unit.ownership];
      let token = <Token key={unit.id} x={0} y={i}><CubitText name={unit.name} value={unit.name} team={team} color={unit.color} /></Token>
      tokens.push(token);

      // Cubits
      // unit.cubits[]
    }

    return <Grid rows={this.size.height} cols={this.size.width} onClick={this.onCellClick} colorMap={background} style={this.style}>{tokens}</Grid>;
  }

  onCellClick = ({ x, y }) => {
    let units = this.location.getUnits(this.player);
    let unit = units[y];
    if(x === 0) {
      this.parent.select(unit, this.location);
    } else {
      let cubit = unit.cubits[x-1];
      this.parent.select(cubit, this.location);
    }
  }
}

class GameBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    events: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
  };

  constructor(params) {
    super(params);

    this.state = {
      selection: null,
      targets: []
    };

    // this.connected = (this.props.isMultiplayer && this.props.isConnected);
  }

  render() {
    let field = new FieldBoard(this);
    let units = {
      "0": new UnitBoard(this, "0"),
      "1": new UnitBoard(this, "1"),
    };

    return (
      <Container fluid>
        <Row>
          <Col>
            <Navbar color="dark" dark expand="md">
              <NavbarBrand href="/">Lusus <small>Tactical Chess</small></NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
          </Col>
          <Col>
           { units["0"].getGrid() }
          </Col>
          <Col xs="5">
           { field.getGrid() }
          </Col>
          <Col>
            { units["1"].getGrid() }
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GameBoard;