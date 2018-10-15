import React from 'react';
import PropTypes from 'prop-types';

import { FaEye, FaArrowRight, FaUserAlt, FaClock, FaBolt, FaShoppingBag, FaEject, FaShareAlt } from 'react-icons/fa';
import { FiWifi, FiWifiOff }from 'react-icons/fi';

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
  Help
} from './help'

import { 
  GAME_FLOW,
  GAME_PHASES,
  UNIT_TYPES,
  UNIT_FILE, 
  LOCATIONS
} from '../game/common';

import { GameLogic } from '../game/logic';
import { getTargets } from '../game/targets';
import { getMovements } from '../game/movements';

class GameTable extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    events: PropTypes.any.isRequired,
    gameID: PropTypes.string,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
  };

  constructor(params) {
    super(params);

    this.logic = new GameLogic();

    this.onShare =  this.onShare.bind(this);
    this.onArenaClickGrid = this.onArenaClickGrid.bind(this);
    this.onHandClickGrid = this.onHandClickGrid.bind(this);
    this.onAvatarClickGrid = this.onAvatarClickGrid.bind(this);
    this.onBoardClickGrid = this.onBoardClickGrid.bind(this);
    this.onCommonClickGrid = this.onCommonClickGrid.bind(this);
    this.onRoyalsClickGrid = this.onRoyalsClickGrid.bind(this);

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
      flow: GAME_FLOW.Lobby,
      player: p,
      selection: null,
      targets: [],
      movements: [],
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.forceUpdate();
  };

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

  getArena() {
    let tokens = [];

    let cubits = this.props.G.cubits.filter(_ => _.location === LOCATIONS.Arena);
    for (let i = 0; i < cubits.length; i++) {
      const cubit = cubits[i];

      let team =  this.teamColors[cubit.ownership];
      let element = React.createElement(CubitText, { name: cubit.name, value: cubit.name, team: team, color: null });
      let token = React.createElement(Token, {key: cubit.id, x: 0, y: i}, element);
      tokens.push(token);
    }

    let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Arena);
    let active = targets.length > 0;

    let params = this.getGridParams(0, 0);
    params.onClick = this.onArenaClickGrid;
    let grid = React.createElement(Grid, params, tokens);

    let header = <div key="arenaHeader" className="text-center"><Badge onClick={this.onArenaClickHeader} color={active ? 'success' : 'secondary'}>Arena</Badge></div>
    let warpper = <div key="arenaGrid" className="text-center" style={{height: params.rows > 0 ? params.style.width : 0 }}>{grid}</div>
    return [header, warpper];
  }

  onArenaClickHeader = () => {
    let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Arena);
    let active = targets.length > 0;
    if(active) {
      alert('Arena');
    }
  }

  onArenaClickGrid = ({x, y}) => {
    // Do Somthing!
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

    let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Hand).filter(_ => _.player === this.state.player);
    let active = targets.length > 0;

    let params = this.getGridParams(1, cubits.length);
    params.key = "handGrid";
    params.onClick = this.onHandClickGrid;
    let grid = React.createElement(Grid, params, tokens);

    let header = <div key="handHeader" className="text-center"><Badge onClick={this.onHandClickHeader} color={active ? 'success' : 'secondary'}>Hand</Badge></div>
    return [header, grid];
  }

  onHandClickHeader = () => {
    let p = this.state.player;
    alert('Hand: ' + p);
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
    let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Player).filter(_ => _.player === this.state.player);
    let active = targets.length > 0;
    if (active) {
      let p = this.state.player;
      alert('Player: ' + p);
    }
  }

  onAvatarClickGrid = ({x, y}) => {
    /*
    if (this.props.playerID === this.state.player) {
      let cubits = this.props.G.cubits.filter(_ => _.location === LOCATIONS.Hand && _.controller === this.state.player);
      let cubit = cubits[y];
      if(cubit) {
        let targets = getTargets(this.props.G, this.props.ctx, this.state.player, cubit);
        this.setState({ selection: cubit, targets: targets });
      }
    }
    */
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
    params.onClick = this.onBoardClickGrid;

    // movements
    let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Board);
    for (const target of targets) {
      for (const pos of target.positions) {
        params.colorMap[`${pos.x},${pos.y}`] = '#28a745';
      }
    }

    let moves = this.state.movements;
    for (const move of moves) {
      params.colorMap[`${move.x},${move.y}`] = '#28a745';
    }

    let grid = React.createElement(Grid, params, tokens);
    return grid;
  }

  onBoardClickGrid = ({x, y}) => {
    if(this.props.ctx.phase === GAME_PHASES.Play) {
      let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Board);
      for (const target of targets) {
        for (const pos of target.positions) {
          if(pos.x === x && pos.y === y) {
            alert(`Board: (${x},${y})`);
          }
        }
      }
    } else if(this.props.ctx.phase === GAME_PHASES.Move) {
      let unit = this.props.G.units.filter(_ => _.location === LOCATIONS.Board).find(_ => _.position.x === x && _.position.y === y);
      let movements = unit == null ? [] : getMovements(this.props.G, this.props.ctx, this.state.player, {x,y}, unit);
      this.setState({ selection: unit, movements: movements });
    }
  }

  getUnitsField(type) {
    let tokens = [];
    let units = this.props.G.units
      .filter(_ => _.ownership === this.state.player)
      .filter(_ => _.rank === type);

    units.sort((lhs, rhs) => lhs.rank - rhs.rank);

    let height = units.length;
    let width = 1;
    for (let y = 0; y < units.length; y++) {
      const unit = units[y];
      if (width < unit.slots) {
        width = unit.slots;
      }
    }

    let params = this.getGridParams(width, height);

    if(type === UNIT_TYPES.Common) {
      params.onClick = this.onCommonClickGrid;
    } else if(type === UNIT_TYPES.Royal) { 
      params.onClick = this.onRoyalsClickGrid;
    }

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

      let target = this.state.targets.find(_ => _.location === LOCATIONS.Unit && _.units.includes(unit.id));
      if(target) {
        params.colorMap[`${0},${y}`] = '#28a745';
      }

      // Cubits
      for (let x = 0; x < unit.cubits.length; x++) {
        const cubit = unit.cubits[x];

        let team = this.teamColors[unit.ownership];
        let element = React.createElement(CubitText, { name: cubit.name, value: cubit.name, team: team, color: '' });
        let token = React.createElement(Token, {key: cubit.id, x: (x+1), y: y}, element);
        tokens.push(token);
      }

      let slots = unit.slots;
      for (let x = slots; x < width; x++) {
        params.colorMap[`${x},${y}`] = '#000000';
      }
    }

    let grid = React.createElement(Grid, params, tokens);
    return grid;
  }

  onCommonClickGrid = ({x, y}) => {
    alert('Common');
  }

  onRoyalsClickGrid = ({x, y}) => {
    alert('Royal');
  }

  getSwitchPlayers() {
    
    let targets = this.state.targets.filter(_ => _.player != null).filter(_ => _.player !== this.state.player);
    let colorTarget = targets.length > 0 ? 'success' : 'primary';
    return <NavItem className="list-inline-item"><Button size="sm" color={colorTarget} title="Switch Player Views" onClick={this.onSwitchPlayerViews}><FaEye className="icon-inline" /> </Button></NavItem>;
  }

   onSwitchPlayerViews = () => {
    let p = this.state.player === "0" ? "1" : "0";
    this.setState({ player: p });
  }

  getHeader() {
    let player = (Number(this.state.player) + 1);
    let bag = this.logic.getBagSize(this.props.G, this.props.ctx, this.state.player);
    let actions = this.logic.getActions(this.props.G, this.props.ctx, this.state.player);
   
    return (
      <NavItem  className="list-inline-item">
        <Button size="sm" color="secondary" disabled>
          <FaUserAlt className="icon-inline" /> { player } <FaBolt className="icon-inline" /> { actions } <FaShoppingBag className="icon-inline" /> { bag } <FaEject className="icon-inline" /> 0/0
        </Button>
      </NavItem>
    );
  }

  getPlayerConnection() {
    if(this.props.playerID !== null) {
      let connected = this.props.isMultiplayer && this.props.isConnected;
      return connected ? 
        <NavItem className="list-inline-item"><Button size="sm" color="success" title="Connected" disabled><FiWifi className="icon-inline" /></Button></NavItem> :
        <NavItem className="list-inline-item"><Button size="sm" color="danger" title="Disconnected" disabled><FiWifiOff className="icon-inline" /></Button></NavItem>
    }
  }

  getNext() {
    if(this.props.isActive) {      
      return <NavItem className="list-inline-item"><Button size="sm" color="success" onClick={this.onNext} ><FaArrowRight className="icon-inline" /></Button></NavItem>;
    }
  }

  onNext = () => {
    if(this.props.ctx.phase === GAME_PHASES.Play) {
      this.props.moves.skipActions();
    } else if(this.props.ctx.phase === GAME_PHASES.Action) {
      this.props.moves.skipActions();
    } else if(this.props.ctx.phase === GAME_PHASES.Move) {
      this.props.moves.skipMovement();
    } else if(this.props.ctx.phase === GAME_PHASES.Draw) {
      this.props.moves.drawCubits();
    }
  }

  getPhase() {
    let player = (Number(this.props.ctx.currentPlayer) + 1);
    let phase = this.props.ctx.phase;
    return (
      <NavItem className="list-inline-item">      
        <Button size="sm" color="secondary" disabled>
          <FaClock className="icon-inline" /> { this.props.ctx.turn } | <FaUserAlt className="icon-inline" /> { player }  <small>{phase} Phase</small>
        </Button>
      </NavItem>
    );
  }

  getShare() {
    if(this.props.playerID === "0") {
      return (
        <NavItem className="list-inline-item">
          <Button size="sm" color="info" title="Share" onClick={this.onShare}><FaShareAlt className="icon-inline" /></Button>
        </NavItem>
      );
    }
  }

  onShare() {
    let url = window.location.origin + "?match=" + this.props.gameID + "&player=1";
    const el = document.createElement('textarea');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  render() {

    return (
      <section className="gameboard">
        <Container fluid className="p-0">
          <div>
            <Navbar color="dark" dark expand="md" className="rounded-bottom p-0">
              <NavbarBrand className="p-0">
                <img className="p-1"  height="32" src="/favicon.ico" alt="Logo"></img>
                <strong className="p-1">Lusus</strong>
              </NavbarBrand>
              <Nav className="p-1 list-inline">
                { this.getPhase() }
                { this.getNext() }
              </Nav>
              <Nav className="p-1 list-inline ml-auto ">
                { this.getSwitchPlayers() }
                { this.getHeader() }
              </Nav>
              <Nav className="p-1 list-inline ml-auto ">
                <Help />
                { this.getShare() }
                { this.getPlayerConnection() }
              </Nav>
            </Navbar>
          </div>
          <div className="horizontal-warper">
            <div className="horizontal-section-content">
              <div className="p-1">
                { this.getArena() }
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