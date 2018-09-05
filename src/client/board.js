import React from 'react';
import PropTypes from 'prop-types';
import {
  //CubitLogo,
  CubitText
} from './cubits';

import {
  getCubit,
  LOCATIONS, 
  // TARGETS,
  // CUBITS,
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

  constructor(parent, where, name, width, height, checkered, player = null) {
    // Bindings (this)
    this.onCellClick = this.onCellClick.bind(this);

    // Game Logic
    this.parent = parent;
    this.state = this.parent.props.G;

    // Properties
    this.name = name,
    this.where = where;
    this.size = { width: width, height: height };
    this.player = player;
    
    let collection = getCubits(this.state);
    this.cubits = collection.filter(c => c.at(this.where, player));

    // Styling
    this.teams = {'0': 'w', '1': 'b'};
    this.backgroundColor = '#959595';
    this.whiteColor = '#817F7F';
    this.backColor = '#ABAAAA';
    this.selectedColor = '#4E9334';
    this.passiveMoveColor = '#4E9334';
    this.captureMoveColor = '#BE8E3F';
    this.checkered = checkered;
    this.style = {strokeWidth:0.05,stroke:'#fff'};
    this.background = this.generateColorMap();

    // UI
    let tokens = this.getTokens();
    this.grid = <Grid rows={this.size.height} cols={this.size.width} onClick={this.onCellClick} colorMap={this.background} style={this.style}>{tokens}</Grid>;
  }

  getTokens() {
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

  generateColorMap() {
    let data = {};

    for (let x = 0; x < this.size.width; x++) {
      for (let y = 0; y < this.size.height; y++) {
        const key = `${x},${y}`;
        const color = this.checkered  === true ?  ((x + y) % 2 === 0) ? this.whiteColor : this.backColor : this.backgroundColor;
        data[key] = color;
      }
    }

    return data;
  }
 
  onCellClick = ({ x, y }) => {
    // Find correct Cubit and set 'Selected' flag
    let cubit = this.cubits.find(c => c.at(this.name, this.player, x, y));
    if(cubit === undefined) {
      return;
    }

    this.parent.props.moves.selectCubit(cubit.id);

    // isSelected() => bool
    // if cubit is selected : deselect()
    // if cubit is unselected : select()

    // hasTargets() => bool
    // if cubit is selected AND targets.count less then targets.total : target()
    
    // this.parent.props.G.selection : {id}
    // this.parent.props.G.targets : [{id}]
    // this.parent.props.G.objective : #
    
    // moves.selectCubit(cubit)
    // moves.activateCubit(cubit, targets)
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
    

    // TODO: Targets...
    // A => Phases Targets (valid targets if nothing selected)
    // B => Selected targets (valid targets if a Cubit is selected)

    this.field = new Board(this, LOCATIONS.Field, "Units", 8, 8, true);
    this.units = {
      "0": new Board(this, LOCATIONS.Units, "Units", 5, 16, false, "0"),
      "1": new Board(this, LOCATIONS.Units, "Units",  5, 16, false, "1"),
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