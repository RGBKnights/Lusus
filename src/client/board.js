import React from 'react';
import PropTypes from 'prop-types';

import { FaWifi } from 'react-icons/fa';
import { IoIosSwitch } from 'react-icons/io';

// Bootstrap
import { 
  Container, 
  // Row, Col,
  Navbar, NavbarBrand, Nav, NavItem,
  Button,
  Badge
} from 'reactstrap';

// UI
import { 
  Token, 
  Grid
} from 'boardgame.io/ui';

import { 
  UNIT_TYPES,
  UNIT_FILE, 
  LOCATIONS
} from '../game/common';

import {
  CubitText
} from './cubits';

class GameTable extends React.Component {
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

    // this.onBoardClick = this.onBoardClick.bind(this);
    // this.onHandClick = this.onHandClick.bind(this);

    this.teamColors = {'0': 'w', '1': 'b'};

    this.unitColors = {};
    this.unitColors[UNIT_FILE.A] = '#FF5733';
    this.unitColors[UNIT_FILE.B] = '#F9FF33';
    this.unitColors[UNIT_FILE.C] = '#008000';
    this.unitColors[UNIT_FILE.D] = '#33FFA8';
    this.unitColors[UNIT_FILE.E] = '#33F6FF';
    this.unitColors[UNIT_FILE.F] = '#3346FF';
    this.unitColors[UNIT_FILE.G] = '#800080';
    this.unitColors[UNIT_FILE.H] = '#FF0000';

    this.state = {
      player: this.props.playerID == null ? "0" : this.props.playerID,
      selection: {
        play: null,
        action: null,
        move: null,
      }
    };
  }

  switchPlayerViews = () => {
    let p = this.state.player === "0" ? "1" : "0";
    this.setState({ player: p });
  }


  getGridParams(width, height) {
    // let sizeSquare = 50;
    let sizeSquare = (window.innerHeight - 70) / 8;
    let w = width * sizeSquare;

    let colorMap = {};
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        colorMap[`${x},${y}`] = ((x + y) % 2 === 0) ? '#817F7F' : '#ABAAAA' 
      }
    }

    let params = {
      rows: height,
      cols: width,
      colorMap: colorMap,
      style: { width: w, strokeWidth: 0.05, stroke: '#000000' },
    };
    return params;
  }

  getHand() {
    let tokens = [];

    let cubits = this.props.G.cubits.filter(_ => _.location === LOCATIONS.Hand && _.controller === this.state.player);
    if(this.state.player === this.props.playerID) {
      for (let i = 0; i < cubits.length; i++) {
        const cubit = cubits[i];
  
        let team =  this.teamColors[cubit.ownership];
        let element = React.createElement(CubitText, { name: cubit.name, value: cubit.name, team: team, color: null });
        let token = React.createElement(Token, {key: cubit.id, x: 0, y: i}, element);
        tokens.push(token);
      }
    }

    let params = this.getGridParams(1, cubits.length);
    // params.onClick = this.onHandClick;
    let grid = React.createElement(Grid, params, tokens);
    return grid;
  }

  getAvatar() {
    let tokens = [];

    let cubits = this.props.G.cubits.filter(_ => _.location === LOCATIONS.Player && _.controller === this.state.player);
    for (let i = 0; i < cubits.length; i++) {
      const cubit = cubits[i];

      let team =  this.teamColors[cubit.ownership];
      let element = React.createElement(CubitText, { name: cubit.name, value: cubit.name, team: team, color: null });
      let token = React.createElement(Token, {key: cubit.id, x: 0, y: i}, element);
      tokens.push(token);
    }

    let grid = React.createElement(Grid, this.getGridParams(1, cubits.length), tokens);
    return grid;
  }

  getBoard() {
    let tokens = [];

    let cubits = this.props.G.cubits.filter(_ => _.location === LOCATIONS.Board);
    for (let i = 0; i < cubits.length; i++) {
      const item = cubits[i];

      let team =  this.teamColors[item.ownership];
      let element =  React.createElement(CubitText, { name: item.name, value: item.name, team: team, color: '' });
      let token = React.createElement(Token, {key: item.id, x: item.position.x, y: item.position.y}, element);
      tokens.push(token);
    }

    let units = this.props.G.units.filter(_ => _.location === LOCATIONS.Board);
    for (let i = 0; i < units.length; i++) {
      const item = units[i];

      let team =  this.teamColors[item.ownership];
      let color = this.unitColors[item.file];
      let element =  React.createElement(CubitText, { name: item.name, value: item.name, team: team, color: color });
      let token = React.createElement(Token, {key: item.id, x: item.position.x, y: item.position.y}, element);
      tokens.push(token);
    }

    let params = this.getGridParams(8,8);
    params.onClick = this.onBoardClick;

    let grid = React.createElement(Grid, params, tokens);
    return grid;
  }

  getUnitsField(type) {
    let tokens = [];
    let units = this.props.G.units
      .filter(_ => _.ownership === this.state.player)
      .filter(_ => _.rank === type);

    units.sort((lhs, rhs) => lhs.rank - rhs.rank);

    var height = units.length;
    var width = 1;
    for (let y = 0; y < units.length; y++) {
      const unit = units[y];

      // Unit
      {
        let team =  this.teamColors[unit.ownership];
        let color = this.unitColors[unit.file];
        let element =  React.createElement(CubitText, { name: unit.name, value: unit.name, team: team, color: color });
        let token = React.createElement(Token, {key: unit.id, x: 0, y: y}, element);
        tokens.push(token);
      }
      
      if (width < unit.slots) {
        width = unit.slots;
      }

      // Cubits
      for (let x = 0; x < unit.cubits.length; x++) {
        const cubit = unit.cubits[x];

        let team = this.teamColors[unit.ownership];
        let element = React.createElement(CubitText, { name: cubit.name, value: cubit.name, team: team, color: '' });
        let token = React.createElement(Token, {key: cubit.id, x: (x+1), y: y}, element);
        tokens.push(token);
      }
    }

    let params = this.getGridParams(width, height);

    for (let y = 0; y < units.length; y++) {
      const unit = units[y];
      let slots = unit.slots;

      for (let x = slots; x < width; x++) {
        params.colorMap[`${x},${y}`] = '#000000';
      }
    }

    let grid = React.createElement(Grid, params, tokens);
    return grid;
  }


  render() {
    let arena = React.createElement(Grid, this.getGridParams(1, 1), [])

    return (
      <section>
        <Container fluid className="p-0">
          <Navbar color="dark" dark expand="md" className="rounded-bottom p-0">
            <NavbarBrand className="p-0">
              <img className="p-1"  height="32" src="/favicon.ico" alt="Logo"></img>
              <strong className="p-1">Lusus</strong>
            </NavbarBrand>
            <Nav className="p-1 list-inline">
              <NavItem className="list-inline-item">
                <Button size="sm" color="primary" disabled>Next</Button>
              </NavItem>
              <NavItem  className="list-inline-item">
                <Button size="sm" color="secondary" disabled>
                  Player <Badge color="info">1</Badge> Draws <Badge color="info">3</Badge> Actions <Badge color="info">1</Badge>
                </Button>
              </NavItem>
              <NavItem  className="list-inline-item">
                <Button size="sm" color="primary" title="Switch Player Views" onClick={this.switchPlayerViews}><IoIosSwitch /></Button>
              </NavItem>
            </Nav>
            <Nav className="p-1 list-inline ml-auto ">
              <NavItem className="list-inline-item">
                <Button size="sm" color="danger" title="Disconnected" disabled><FaWifi /></Button>
              </NavItem>
            </Nav>
          </Navbar>
          <div className="horizontal-warper">
            <div className="horizontal-section-content">
              <div className="p-1">
                <div className="text-center">
                  <Badge>Arena</Badge>
                </div>
                <div className="text-center">
                  { arena }
                </div>
              </div>
              <div className="horizontal-warper">
                <div className="horizontal-section-content">
                  <div className="text-center">
                    <Badge>Hand</Badge>
                  </div>
                  { this.getHand() }
                </div>
                <div className="horizontal-section-content">
                  <div className="text-center">
                    <Badge>Player</Badge>
                  </div>
                  { this.getAvatar() }
                </div>
              </div>
            </div>
            <div className="horizontal-section-content">
              <div className="text-center">
                <Badge>Board</Badge>
              </div>
              { this.getBoard() }
            </div>
            <div className="horizontal-section-content">
              <div className="text-center">
                <Badge>Commons</Badge>
              </div>
              { this.getUnitsField(UNIT_TYPES.Common) }
            </div>
            <div className="horizontal-section-content">
              <div className="text-center">
                <Badge>Royals</Badge>
              </div>
              { this.getUnitsField(UNIT_TYPES.Royal) }
            </div>
          </div>
        </Container>
      </section>
    );
  }
}

export default GameTable;