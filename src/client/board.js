import React from 'react';
import PropTypes from 'prop-types';
import {
  //CubitLogo,
  CubitText
} from './cubits';

import {
  LOCATIONS,
  TARGET
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
    this.backgroundColor = '#959595';
    this.whiteColor = '#817F7F';
    this.backColor = '#ABAAAA';
    // Selection
    this.selectedColor = '#4E9334';
    // Targeting
    this.passiveMoveColor = '#BE8E3F';
    this.captureMoveColor = '#B63C4B';

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
        collecton.push(<Token key={location.id} x={location.x} y={location.y}><CubitText name={cubit.name} value={cubit.alias} team={team} color={color} /></Token>);  

        if(this.state.selection === cubit.id) {
          this.background[`${location.x},${location.y}`] = this.selectedColor;
        }
      }
    }

    return collecton;
  }

  generateColorMap = () => {
    let data = {};

    let targets = {};
    let collecton = this.state.targets.filter(t => t.where === this.where && t.player === this.player);
    for (let i = 0; i < collecton.length; i++) {
      const target = collecton[i];
      targets[`${target.x},${target.y}`] = target.type;
    }

    for (let x = 0; x < this.size.width; x++) {
      for (let y = 0; y < this.size.height; y++) {
        const key = `${x},${y}`;
      
        let target = targets[key];
        if(target === TARGET.Empty || target === TARGET.Ally) {
          data[key] = this.passiveMoveColor;
        } else if(target === TARGET.Enemy) {
          data[key] = this.captureMoveColor;
        } else {
          data[key] = ((x + y) % 2 === 0) ? this.whiteColor : this.backColor;
        }
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
    if(this.isSelected(x, y)) {
      this.parent.props.moves.focus(this.state.selection); return;
    }

    if(this.hasSelection()) {
      let targets = this.state.targets.filter(c => c.at(this.where, this.player, x, y));
      if(targets.length > 0) {
        // What happens if there are multiple cubits...? Create a UI to pick one! [Name, Desc]
        let id = targets[0].id;
        this.parent.props.moves.target(id); return;
      }
    } else {
      let cubits = this.cubits.filter(c => c.at(this.where, this.player, x, y));
      if(cubits.length > 0) {
        // What happens if there are multiple cubits...? Create a UI to pick one! [Name, Desc]
        let id = cubits[0].id;
        this.parent.props.moves.focus(id); return;
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