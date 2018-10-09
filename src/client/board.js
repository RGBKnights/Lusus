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
  CubitText
} from './cubits';

import { 
  GAME_PHASES,
  UNIT_TYPES,
  UNIT_FILE, 
  LOCATIONS
} from '../game/common';

import { getTargets } from '../game/targets';

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

    this.onHandClickGrid = this.onHandClickGrid.bind(this); 
    this.onAvatarClickGrid = this.onAvatarClickGrid.bind(this); 

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

    let p = this.props.playerID == null ? "0" : this.props.playerID;

    this.state = {
      player: p,
      selection: null,
      targets: []
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
    params.key = "handGrid";
    params.onClick = this.onHandClickGrid;
    let grid = React.createElement(Grid, params, tokens);

    let header = <div key="handHeader" className="text-center"><Badge onClick={this.onHandClickHeader}>Hand</Badge></div>
    return [header, grid];
  }

  onHandClickHeader = () => {
    let p = this.state.player;
    alert("Hand " + p);
  }

  onHandClickGrid = ({x, y}) => {
    let active = this.props.ctx.phase === GAME_PHASES.Play && this.props.playerID === this.state.player;
    if(!active) {
      return;
    }

    let cubits = this.props.G.cubits.filter(_ => _.location === LOCATIONS.Hand && _.controller === this.state.player);
    let cubit = cubits[y];
    if(!cubit) {
      return;
    }

    if(this.state.selection && this.state.selection.id === cubit.id) {
      this.setState({ selection: null, targets: [] });
    } else {
      let targets = getTargets(this.props.G, this.props.ctx, this.state.player, cubit);
      this.setState({ selection: cubit, targets: targets });
    }
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

    let params = this.getGridParams(1, cubits.length);
    params.key = "avatarGrid";
    params.onClick = this.onAvatarClickGrid;
    let grid = React.createElement(Grid, params, tokens);

    let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Player).filter(_ => _.player === this.state.player);
    let active = targets.length > 0;
   
    let header = <div key="avatarHeader" className="text-center"><Badge color={active ? 'success' : 'secondary'} onClick={this.onAvatarClickHeader}>Player</Badge></div>
    return [header, grid];
  }

  onAvatarClickHeader = () => {
    let p = this.state.player;
    alert("Player " + p);
  }

  onAvatarClickGrid = ({x, y}) => {
    if (this.props.playerID === this.state.player) {
      let cubits = this.props.G.cubits.filter(_ => _.location === LOCATIONS.Hand && _.controller === this.state.player);
      let cubit = cubits[y];
      if(cubit) {
        let targets = getTargets(this.props.G, this.props.ctx, this.state.player, cubit);
        this.setState({ selection: cubit, targets: targets });
      }
    }
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

    let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Board);

    let params = this.getGridParams(8,8);
    params.onClick = this.onBoardClick;

    for (const target of targets) {
      for (const pos of target.positions) {
        params.colorMap[`${pos.x},${pos.y}`] = '#28a745';
      }
    }

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

    let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Unit);
    let indexes = [];
    for (const target of targets) {
      for (const unit of target.units) {
        indexes.push(unit.id);
      }
    }

    let params = this.getGridParams(width, height);

    for (let y = 0; y < units.length; y++) {
      const unit = units[y];
      let slots = unit.slots;
      
      if( indexes.includes(unit.id)) {
        params.colorMap[`${0},${y}`] = '#28a745';
      }

      for (let x = slots; x < width; x++) {
        params.colorMap[`${x},${y}`] = '#000000';
      }
    }

    let grid = React.createElement(Grid, params, tokens);
    return grid;
  }

  getHeader() {
    let player = (Number(this.state.player) + 1);
    let draws = 3;
    let actions = 1;

    return (
      <Button size="sm" color="secondary" disabled>
        Player <Badge color="info">{ player }</Badge> Draws <Badge color="info"> { draws }</Badge> Actions <Badge color="info"> { actions }</Badge>
      </Button>
    );
  }

  getPlayerConnection() {
    let connected = this.props.isMultiplayer && this.props.isConnected;
    return connected ? 
      <Button size="sm" color="success" title="Connected" disabled><FaWifi /></Button> :
      <Button size="sm" color="danger" title="Disconnected" disabled><FaWifi /></Button>
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
                { this.getHeader() }
              </NavItem>
              <NavItem  className="list-inline-item">
                <Button size="sm" color="primary" title="Switch Player Views" onClick={this.switchPlayerViews}><IoIosSwitch /></Button>
              </NavItem>
            </Nav>
            <Nav className="p-1 list-inline ml-auto ">
              <NavItem className="list-inline-item">
                { this.getPlayerConnection() }
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
                  { this.getHand() }
                </div>
                <div className="horizontal-section-content">
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
        <br />
      </section>
    );
  }
}

export default GameTable;