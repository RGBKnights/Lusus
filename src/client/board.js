import React from 'react';
import PropTypes from 'prop-types';
import {
  //CubitLogo,
  CubitText
} from './cubits';

import {
  LOCATIONS
} from '../game/cubits';

// Bootstrap
import { 
  Container, Row, Col,
  Navbar, NavbarBrand, Nav, NavItem
} from 'reactstrap';

// UI
import { Token, Grid } from 'boardgame.io/ui';

// Logic
import { getCubits } from '../game/cubits';

class Board {

  constructor(parent, where, name, width, height, player = null) {
    // Bindings (this)
    this.onCellClick = this.onCellClick.bind(this);

    // Game Logic
    this.parent = parent;
    this.state = this.parent.props.G;

    // Properties
    this.name = name;
    this.where = where;
    this.size = { width: width, height: height };
    this.player = player;
    
    // Cubits
    let collection = getCubits(this.state);
    this.cubits = collection.filter(c => c.at(this.where, player));

    // Styling
    // Token colours based on player but maybe have a way to switch sides...
    this.teams = {'0': 'w', '1': 'b'};
    // Base boards
    //this.backgroundColor = '#959595';
    this.whiteColor = '#817F7F';
    this.backColor = '#ABAAAA';
    // Selection
    this.selectedColor = '#4E9334';
    // Targeting
    this.passiveMoveColor = '#4E9334';
    this.captureMoveColor = '#BE8E3F';
    // Missing: Ally...?
    // Missing: Self...?

    // UI
    // Grid styling
    this.style = {strokeWidth:0.05,stroke:'#fff'};
    // Grid Color Map
    this.background = this.generateColorMap();

    // Tokens
    let tokens = this.getTokens();

    // Grid
    this.grid = <Grid rows={this.size.height} cols={this.size.width} onClick={this.onCellClick} colorMap={this.background} style={this.style}>{tokens}</Grid>;
  }

  getTokens = () => {
    let collecton = [];

    for (let i = 0; i < this.cubits.length; i++) {
      const cubit = this.cubits[i];
      const color = cubit.color;
      const team = this.teams[cubit.ownership];
      
      // Locations
      let locations = cubit.locations.filter(l => l.where === this.where);
      for (let l = 0; l < locations.length; l++) {
        const location = locations[l];
        collecton.push(<Token key={location.key} x={location.x} y={location.y}><CubitText name={cubit.name} value={cubit.alias} team={team} color={color} /></Token>);  

        if(this.state.selection === cubit.id) {
          this.background[`${location.x},${location.y}`] = this.selectedColor;
        }
      }
    }

    return collecton;
  }

  generateColorMap = () => {
    let data = {};

    for (let x = 0; x < this.size.width; x++) {
      for (let y = 0; y < this.size.height; y++) {
        const key = `${x},${y}`;
        const color = ((x + y) % 2 === 0) ? this.whiteColor : this.backColor;
        data[key] = color;
      }
    }

    return data;
  }

  hasSelection = () => {
    return this.state.selection != null;
  }

  isSelected = (x, y) => {
    if(this.state.selection == null) {
      return false;
    }
    
    let cubit = this.cubits.find(c => c.at(this.where, this.player, x, y));
    if(cubit != null && this.state.selection === cubit.id) {
      return true;
    } else {
      return false;
    }
  }
 
  onCellClick = ({ x, y }) => {
    if(this.hasSelection()) {
      // Deselection
      if(this.isSelected(x, y)) {
        this.parent.props.moves.blur(); return;
      }

      // Add target
    } else {
      let cubit = this.cubits.find(c => c.at(this.where, this.player, x, y));
      if(cubit) {
        this.parent.props.moves.focus(cubit.id); return;
      }
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

    this.connected = (this.props.isMultiplayer && this.props.isConnected);
  }

  render() {    
    console.log("Targets", this.props.G.targets);

    this.field = new Board(this, LOCATIONS.Field, "Board", 8, 8);
    this.units = {
      "0": new Board(this, LOCATIONS.Units, "Units", 5, 16, "0"),
      "1": new Board(this, LOCATIONS.Units, "Units", 5, 16, "1"),
    }

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
            {this.units["0"].grid}
          </Col>
          <Col xs="5">
            {this.field.grid}
          </Col>
          <Col>
            {this.units["1"].grid}
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GameBoard;