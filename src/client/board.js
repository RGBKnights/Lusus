import React from 'react';
import PropTypes from 'prop-types';

import { FaEye, FaUserAlt, FaClock, FaShareAlt, FaBolt, FaShoppingBag, FaChess, FaSquare } from 'react-icons/fa';
import { FiWifiOff }from 'react-icons/fi';

import { ToastContainer, toast } from 'react-toastify';

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

import { getCubitElement } from './cubits';
import { getUnitElement } from './units';

import { Help } from './help'
import { EventLog } from './events'

import { 
  GAME_PHASES,
  UNIT_TYPES,
  LOCATIONS,
  MOVEMENT_ACTIONS,
  TARGETING_TYPE,
  CUBIT_TYPES
} from '../game/common';

import { GameLogic } from '../game/logic';
import { getTargets } from '../game/targets';
import { getMovements } from '../game/movements';

const uuidv4 = require('uuid/v4');

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

    this.onArenaClickGrid = this.onArenaClickGrid.bind(this);
    this.onHandClickGrid = this.onHandClickGrid.bind(this);
    this.onAvatarClickGrid = this.onAvatarClickGrid.bind(this);
    this.onBoardClickGrid = this.onBoardClickGrid.bind(this);
    this.onCommonClickGrid = this.onCommonClickGrid.bind(this);
    this.onRoyalsClickGrid = this.onRoyalsClickGrid.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onShare = this.onShare.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
    this.onRematch = this.onRematch.bind(this);
    
    /*
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
    */

    this.unitsMap = {};
    this.unitsMap[UNIT_TYPES.Common] = {};
    this.unitsMap[UNIT_TYPES.Royal] = {};

    this.avatarMap = {};

    this.deferredPrompt = null;

    let p = this.props.playerID == null ? "0" : this.props.playerID;
    this.state = {
      player: p,
      selection: null,
      targets: [],
      movements: [],
      nab: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  componentDidUpdate(props) {
    if(this.props.isActive === false) {
      return;
    }

    if (this.props.ctx.phase === GAME_PHASES.Play && props.ctx.phase !== GAME_PHASES.Play) {
      toast("Your Turn!");
    }
    if(this.props.G.players[this.props.playerID].check === true && props.G.players[this.props.playerID].check === false) {
      toast("Check!");
    }
    if (this.props.ctx.phase === GAME_PHASES.Draw && props.ctx.phase !== GAME_PHASES.Draw) {
      this.props.moves.drawCubits();
    }
  }

  updateDimensions = () => {
    this.forceUpdate();
  };

  resetState() {
    this.setState({ selection: null, targets: [], movements: [], nab: false });
  }

  getGridParams(width, height) {
    let sizeSquare = (window.innerHeight - 70) / 8;
    // let sizeSquare = 35;
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

      let isPlayer = this.state.player !== this.props.playerID;
      let element = getCubitElement(cubit, isPlayer); 
      let token = React.createElement(Token, {key: cubit.id, x: 0, y: i}, element);
      tokens.push(token);
    }

    let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Arena);
    let headerActive = targets.filter(_ => _.type === TARGETING_TYPE.AttachLocation).length > 0;
    let header = <div key="arenaHeader" className="text-center"><Badge onClick={this.onArenaClickHeader} color={headerActive ? 'success' : 'secondary'}>Arena</Badge></div>

    let size = tokens.length > 0 ? 1 : 0;
    let params = this.getGridParams(size, size);
    params.onClick = this.onArenaClickGrid;
    
    let squareActive = targets.filter(_ => _.type === TARGETING_TYPE.TargetCubitAtLocation).length > 0;
    if(squareActive) {
      params.colorMap[`${0},${0}`] = '#28A745';
    }

    let grid = React.createElement(Grid, params, tokens);
    let warpper = <div key="arenaGrid" className="text-center" style={{height: params.rows > 0 ? params.style.width : 0 }}>{grid}</div>
    return [header, warpper];
  }

  onArenaClickHeader = () => {
    if(!this.props.isActive) {
      return;
    }

    let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Arena);
    if(targets.filter(_ => _.type === TARGETING_TYPE.AttachLocation).length > 0) {
      this.props.moves.attachCubitToArena(this.state.selection.id);
      this.resetState();
    }
  }

  onArenaClickGrid = ({x, y}) => {
    if(!this.props.isActive) {
      return;
    }

    let cubit = this.props.G.cubits.find(_ => _.location === LOCATIONS.Arena);
    if(!cubit) {
      return;
    }

    let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Arena);
    if(targets.filter(_ => _.type === TARGETING_TYPE.TargetCubitAtLocation).length > 0) {
      this.props.moves.targetCubit(this.state.selection.id, cubit.id);
      this.resetState();
    }
  }

  getHand() {
    let tokens = [];

    let cubits = this.props.G.cubits.filter(_ => _.location === LOCATIONS.Hand && _.controller === this.state.player);

    let isNab = this.state.nab;
    let hasKnowledge = this.logic.hasCubit(this.props.G, this.props.ctx, CUBIT_TYPES.Knowledge, LOCATIONS.Player, this.props.playerID);
    let isCurrentPlayer = this.state.player === this.props.playerID;
    if(isCurrentPlayer || hasKnowledge || isNab) {
      for (let i = 0; i < cubits.length; i++) {
        const cubit = cubits[i];

        let isPlayer = this.state.player !== this.props.playerID;
        let element = getCubitElement(cubit, isPlayer); 
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
    if(this.props.isActive) {
      if(this.state.selection && this.state.selection.type === CUBIT_TYPES.Nab) {
        this.setState({ nab: true, selection: null, targets: [] });
      }
    }
  }

  onHandClickGrid = ({x, y}) => {
    if(!this.props.isActive) {
      return;
    }

    if(this.props.ctx.phase !== GAME_PHASES.Play) {
      return;
    }

    let cubits = this.props.G.cubits.filter(_ => _.location === LOCATIONS.Hand && _.controller === this.state.player);
    let cubit = cubits[y];
    if(!cubit) {
      return;
    }

    if(this.state.selection && this.state.selection.id === cubit.id) {
      this.resetState();
    } else {
      let player = this.state.nab ? this.props.playerID : this.state.player;
      let targets = getTargets(this.props.G, this.props.ctx, player, cubit);
      this.setState({ selection: cubit, targets: targets });
    }
  }

  getAvatar() {
    this.avatarMap = {};
    let tokens = [];

    let targets = this.state.targets
      .filter(_ => _.location === LOCATIONS.Player)
      .filter(_ => _.player === this.state.player);

    let cubits = this.props.G.cubits.filter(_ => _.location === LOCATIONS.Player && _.controller === this.state.player);
    let params = this.getGridParams(1, cubits.length);
    params.key = "avatarGrid";
    params.onClick = this.onAvatarClickGrid;

    for (let i = 0; i < cubits.length; i++) {
      const cubit = cubits[i];

      this.avatarMap[i] = cubit;

      for (const target of targets.filter(_ => _.type === TARGETING_TYPE.TargetCubitAtLocation)) {
        if(target.cubit === cubit.id) {
          params.colorMap[`${0},${i}`] = '#28A745';
        }
      }

      let isPlayer = this.state.player !== this.props.playerID;
      let element = getCubitElement(cubit, isPlayer); 
      let token = React.createElement(Token, {key: cubit.id, x: 0, y: i}, element);
      tokens.push(token);
    }

    let grid = React.createElement(Grid, params, tokens);

    let active = targets.filter(_ => _.type === TARGETING_TYPE.AttachLocation || _.type === TARGETING_TYPE.TargetLocation).length > 0;
    let header = <div key="avatarHeader" className="text-center"><Badge color={active ? 'success' : 'secondary'} onClick={this.onAvatarClickHeader}>Player</Badge></div>
    return [header, grid];
  }

  onAvatarClickHeader = () => {
    if(!this.props.isActive) {
      return;
    }

    let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Player).filter(_ => _.player === this.state.player);
    if (targets.filter(_ => _.type === TARGETING_TYPE.AttachLocation).length > 0) {
      this.props.moves.attachCubitToPlayer(this.state.selection.id, this.state.player);
      this.resetState();
    }
    if (targets.filter(_ => _.type === TARGETING_TYPE.TargetLocation).length > 0) {
      this.props.moves.targetPlayer(this.state.selection.id, this.state.player);
      this.resetState();
    }
  }

  onAvatarClickGrid = ({x, y}) => {
    if (!this.props.isActive) {
      return;
    }

    let cubit = this.avatarMap[y];
    if (!cubit) {
      return;
    }

    if(this.state.selection === null) {
      if(this.logic.canActivate(this.props.G, this.props.ctx, this.props.playerID, cubit)) {
        this.props.moves.activateCubit(cubit.id);
        this.resetState();
      }
    } else {
      let target = this.state.targets
        .filter(_ => _.location === LOCATIONS.Player)
        .filter(_ => _.player === this.state.player)
        .filter(_ => _.type === TARGETING_TYPE.TargetCubitAtLocation)
        .find(_ => _.cubit === cubit.id);

      if (target) {
        this.props.moves.targetCubit(this.state.selection.id, cubit.id);
        this.resetState();
      }
    }
  }

  getBoard() {
    let tokens = [];

    let cubits = this.props.G.cubits.filter(_ => _.location === LOCATIONS.Board);
    for (let i = 0; i < cubits.length; i++) {
      const item = cubits[i];

      let isPlayer = this.state.player !== this.props.playerID;
      let element = getCubitElement(item, isPlayer); 
      let token = React.createElement(Token, {key: item.id, x: item.position.x, y: item.position.y}, element);
      tokens.push(token);
    }

    let units = this.props.G.units.filter(_ => _.location === LOCATIONS.Board);
    for (let i = 0; i < units.length; i++) {
      const item = units[i];

      let element = getUnitElement(item);
      let token = React.createElement(Token, {key: item.id, x: item.position.x, y: item.position.y}, element);
      tokens.push(token);
    }

    let params = this.getGridParams(8,8);
    params.onClick = this.onBoardClickGrid;

    // movements
    let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Board);
    for (const target of targets) {
      const pos = target.position;
      params.colorMap[`${pos.x},${pos.y}`] = '#28A745';
    }

    let moves = this.state.movements;
    for (const move of moves) {
      if(move.action === MOVEMENT_ACTIONS.Capture) {
        params.colorMap[`${move.x},${move.y}`] = '#A74528';
      } else {
        params.colorMap[`${move.x},${move.y}`] = '#28A745';
      }
      
    }

    let grid = React.createElement(Grid, params, tokens);
    return grid;
  }

  onBoardClickGrid = ({x, y}) => {
    if(!this.props.isActive) {
      return;
    }

    if(this.props.ctx.phase === GAME_PHASES.Play && this.state.selection != null) {
      let targets = this.state.targets.filter(_ => _.location === LOCATIONS.Board);
      for (const target of targets) {
        const pos = target.position;
        if(pos.x === x && pos.y === y) {
          this.props.moves.attachCubitToBroad(this.state.selection.id, x, y);
          this.resetState();
        }
      }
    } else if(this.props.ctx.phase === GAME_PHASES.Move) {
      if(this.state.selection != null) {
        let movements = this.state.movements;
        for (const move of movements) {
          if(move.x === x && move.y === y) {
            if(move.action === MOVEMENT_ACTIONS.Passive) {
              this.props.moves.movePassive(this.state.selection.id, x, y);
              break;
            } else if(move.action === MOVEMENT_ACTIONS.Capture) {
              this.props.moves.moveCapture(this.state.selection.id, move.unit);
              break;
            } else if(move.action === MOVEMENT_ACTIONS.Swap) {
              this.props.moves.moveSwap(this.state.selection.id, move.unit);
              break;
            } else if(move.action === MOVEMENT_ACTIONS.Castle) {
              this.props.moves.moveCastle(this.state.selection.id, move.unit);
              break;
            } else {
              alert("Move", `${x},${y}`);
            }
          }
        }

        this.resetState();
      } else {
        let unit = this.props.G.units
          .filter(_ => _.ownership === this.props.playerID)
          .filter(_ => _.location === LOCATIONS.Board)
          .find(_ => _.position.x === x && _.position.y === y);
          
        let movements = unit == null ? [] : getMovements(this.props.G, this.props.ctx, unit);
        this.setState({ selection: unit, movements: movements });
      }
    }
  }

  getUnitsField(type) {
    this.unitsMap[type] = {};

    let tokens = [];
    let units = this.props.G.units
      .filter(_ => _.ownership === this.state.player)
      .filter(_ => _.rank === type);

    units.sort((lhs, rhs) => lhs.rank - rhs.rank);

    let height = units.length;
    let width = 0;
    for (let y = 0; y < units.length; y++) {
      const unit = units[y];
      if (width < unit.slots) {
        width = unit.slots;
      }
    }

    width++;

    let params = this.getGridParams(width, height);

    if(type === UNIT_TYPES.Common) {
      params.onClick = this.onCommonClickGrid;
    } else if(type === UNIT_TYPES.Royal) { 
      params.onClick = this.onRoyalsClickGrid;
    }

    for (let y = 0; y < units.length; y++) {
      const unit = units[y];

      // Unit
      if(unit.location === LOCATIONS.Board)
      {
        let element = getUnitElement(unit);
        let token = React.createElement(Token, {key: unit.id, x: 0, y: y}, element);
        tokens.push(token);
      }

      let hasAttachmentTarget = this.state.targets
        .filter(_ => _.type === TARGETING_TYPE.AttachLocation)
        .filter(_ => _.location === LOCATIONS.Unit)
        .filter(_ => _.unit === unit.id);
      if(hasAttachmentTarget.length > 0) {
        params.colorMap[`${0},${y}`] = '#28a745';
        this.unitsMap[type][`${0},${y}`] = unit;
      }

      // Cubits
      for (let x = 0; x < unit.cubits.length; x++) {
        let offset = (x+1);
        const id =  unit.cubits[x];
        const cubit = this.props.G.cubits.find(_ => _.id === id);

        if(cubit.location === LOCATIONS.Unit)
        {
          let isPlayer = this.state.player !== this.props.playerID;
          let element = getCubitElement(cubit, isPlayer); 
          let token = React.createElement(Token, {key: cubit.id, x: offset, y: y}, element);
          tokens.push(token);
        }

        let hasCubitTarget = this.state.targets
          .filter(_ => _.type === TARGETING_TYPE.TargetCubitAtLocation)
          .filter(_ => _.location === LOCATIONS.Unit)
          .filter(_ => _.cubit === cubit.id);
        if(hasCubitTarget.length > 0) {
          params.colorMap[`${offset},${y}`] = '#28a745';
          this.unitsMap[type][`${offset},${y}`] = cubit;
        }
      }

      for (let x = unit.slots + 1; x < width; x++) {
        params.colorMap[`${x},${y}`] = '#000000';
      }
    }

    // TODO: use player to flip the x values base on black and white (white needs to be fliped)

    let grid = React.createElement(Grid, params, tokens);
    return grid;
  }

  onCommonClickGrid = ({x, y}) => {
    if(!this.props.isActive) {
      return;
    }

    let obj = this.unitsMap[UNIT_TYPES.Common][`${x},${y}`];
    if(!obj) {
      return;
    }

    if(this.state.selection === null) {
      if(this.logic.canActivate(this.props.G, this.props.ctx, this.props.playerID, obj)) {
        this.props.moves.activateCubit(obj.id);
        this.resetState();
      }
    } else {
      let hasAttachmentTarget = this.state.targets
        .filter(_ => _.type === TARGETING_TYPE.AttachLocation)
        .filter(_ => _.location === LOCATIONS.Unit)
        .filter(_ => _.unit === obj.id);

      if(x === 0 && hasAttachmentTarget.length > 0) {
        this.props.moves.attachCubitToUnit(this.state.selection.id, obj.id);
        this.resetState();
      }

      let hasCubitTarget = this.state.targets
        .filter(_ => _.type === TARGETING_TYPE.TargetCubitAtLocation)
        .filter(_ => _.location === LOCATIONS.Unit)
        .filter(_ => _.cubit === obj.id);

      if(x > 0 && hasCubitTarget.length > 0) {
        this.props.moves.targetCubit(this.state.selection.id, obj.id);
        this.resetState();
      }
    }
  }

  onRoyalsClickGrid = ({x, y}) => {
    if(!this.props.isActive) {
      return;
    }

    let obj = this.unitsMap[UNIT_TYPES.Royal][`${x},${y}`];
    if(!obj) {
      return;
    }

    if(this.state.selection === null) {
      if(this.logic.canActivate(this.props.G, this.props.ctx, this.props.playerID, obj)) {
        this.props.moves.activateCubit(obj.id);
        this.resetState();
      }
    } else {
      let hasAttachmentTarget = this.state.targets
        .filter(_ => _.type === TARGETING_TYPE.AttachLocation)
        .filter(_ => _.location === LOCATIONS.Unit)
        .filter(_ => _.unit === obj.id);

      if(x === 0 && hasAttachmentTarget.length > 0) {
        this.props.moves.attachCubitToUnit(this.state.selection.id, obj.id);
        this.resetState();
      }

      let hasCubitTarget = this.state.targets
        .filter(_ => _.type === TARGETING_TYPE.TargetCubitAtLocation)
        .filter(_ => _.location === LOCATIONS.Unit)
        .filter(_ => _.cubit === obj.id);

      if(x > 0 && hasCubitTarget.length > 0) {
        this.props.moves.targetCubit(this.state.selection.id, obj.id);
        this.resetState();
      }
    }
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

  getPlayerConnection() {
    if(this.props.playerID !== null) {
      let connected = this.props.isMultiplayer && this.props.isConnected;
      if(connected === false) {
        return <NavItem className="list-inline-item"><Button size="sm" color="danger" title="Disconnected" disabled><FiWifiOff className="icon-inline" /></Button></NavItem>;
      }
    }
  }

  getNext() {
    if(this.props.isActive) {
      if(this.props.ctx.phase === GAME_PHASES.Play) {
        let color = this.props.G.players[this.props.playerID].actions_used > 1 ? "success" : "warning";
        return <NavItem className="list-inline-item"><Button size="sm" color={color} onClick={this.onNext}>Pass</Button></NavItem>;
      }
    }
  }

  onNext = () => {
    if(this.props.ctx.phase === GAME_PHASES.Play) {
      this.props.moves.skipPlay();
    } else if(this.props.ctx.phase === GAME_PHASES.Move) {
      this.props.moves.skipMovement();
    } else if(this.props.ctx.phase === GAME_PHASES.Draw) {
      this.props.moves.drawCubits();
    }
  }

  getPlayer() {
    let color = "icon-inline";
    if(this.props.playerID === "0") {
      color = "icon-inline text-dark";
    } else if (this.props.playerID === "1") {
      color = "icon-inline text-light";
    }

    if(this.props.playerID) {
      return (
        <NavItem key="player" className="list-inline-item">
          <Button size="sm" color="secondary" disabled>
            <FaUserAlt className={color} />
          </Button>
        </NavItem>
      );
    } else {
      return (
        <NavItem key="player" className="list-inline-item">
          <Button size="sm" color="secondary" disabled>Spectator</Button>
        </NavItem>
      );
    }
  }
  
  getPhase() {
    let phase = this.props.ctx.phase;
    let color = "icon-inline";
    if(this.props.ctx.currentPlayer === "0") {
      color = "icon-inline text-dark";
    } else if (this.props.ctx.currentPlayer === "1") {
      color = "icon-inline text-light";
    }
    
    return (
      <NavItem className="list-inline-item">      
        <Button size="sm" color="secondary" disabled>
          <FaClock className="icon-inline" /> { this.props.ctx.turn } &nbsp;&nbsp;
          <FaUserAlt className={color} /> { phase }
        </Button>
      </NavItem>
    );
  }

  getPlayerStats() {
    let bag = this.logic.getBagSize(this.props.G, this.props.ctx, this.state.player);
    let actions = this.logic.getActions(this.props.G, this.props.ctx, this.state.player);
    let alUnits = this.logic.getAfterlifeUnits(this.props.G, this.props.ctx);
    let alCubits = this.logic.getAfterlifeCubits(this.props.G, this.props.ctx);

    return (
      <NavItem className="list-inline-item">      
        <Button size="sm" color="secondary" disabled>
          <FaBolt className="icon-inline" /> {actions} &nbsp;&nbsp;
          <FaShoppingBag className="icon-inline" /> {bag} &nbsp;&nbsp;
          <FaChess className="icon-inline" /> { alUnits } &nbsp;&nbsp;
          <FaSquare className="icon-inline" /> {alCubits}
        </Button>
      </NavItem>
    );
  }

  getShare() {
    if(this.props.playerID === "0") {
      return (
        <NavItem className="list-inline-item">
          <Button size="sm" color="primary" title="Share" onClick={this.onShare}><FaShareAlt className="icon-inline" /></Button>
        </NavItem>
      );
    }
  }

  onShare() {
    let code = this.props.gameID;
    
    const el = document.createElement('textarea');
    el.value = code;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  getNewGame() {
    if(this.props.playerID) {
      return (
        <NavItem className="list-inline-item">
          <Button size="sm" color="primary" onClick={this.onNewGame}>New Game</Button>
        </NavItem>
      );
    }
  }

  onNewGame() {
    if(this.props.playerID) {
      let url = window.location.origin + "/?p=0&m=" + uuidv4();
      window.location = url;
    }
  }

  getRematch() {
    if(this.props.playerID) {
      return ( 
        <NavItem className="list-inline-item">
          <Button size="sm" color="primary" onClick={this.onRematch}>Rematch</Button>
        </NavItem>
      );
    }
  }

  onRematch() {
    console.log("onRematch");
    if(this.props.playerID) {
      let opponent = this.props.playerID === "0" ? "1" : "0";
      let url = window.location.origin + "/?p=" + opponent + "&m=" + this.props.G.next;
      window.location = url;
    }
  }

  getHeaderActive() {
    return (
      <Container fluid className="p-0">
        <Navbar color="light" expand="md" className="rounded-bottom p-0">
          <NavbarBrand className="p-0" href="/">
            <img className="p-1"  height="32" src="/favicon.ico" alt="Logo"></img>
            <strong className="p-1 text-white">Lusus</strong>
          </NavbarBrand>
          <Nav className="p-1 list-inline">
            { this.getSwitchPlayers() }
            { this.getPlayer() }
            { this.getPlayerStats() }
            { this.getPhase() }
            { this.getNext() }
          </Nav>
          <Nav className="p-1 list-inline ml-auto">
            <EventLog log={this.props.G.log} />
            <Help playerID={this.props.playerID} />
            { this.getShare() }
            { this.getPlayerConnection() }
          </Nav>
        </Navbar>
      </Container>
    );
  }

  getHeaderGameover() {
    let playerWon = (Number(this.props.ctx.gameover) + 1);

    return (
      <Container fluid className="p-0">
        <Navbar color="light" expand="md" className="rounded-bottom p-0">
          <NavbarBrand className="p-0">
            <img className="p-1"  height="32" src="/favicon.ico" alt="Logo"></img>
            <strong className="p-1">Lusus</strong>
          </NavbarBrand>
          <Nav className="p-1 list-inline">
            { this.getPlayer() }
            <NavItem className="list-inline-item">
              <Button size="sm" color="secondary" disabled>Player { playerWon } Won</Button>
            </NavItem>
            { this.getNewGame() }
            { this.getRematch() }
          </Nav>
          <Nav className="p-1 list-inline ml-auto">
            { this.getPlayerConnection() }
          </Nav>
        </Navbar>
      </Container>
    );
  }

  getTable() {
    if(this.state.player === "0") {
      return (
        <div className="horizontal-warper">
          <div className="horizontal-section-content">
            <div className="text-center">
              <Badge>Royals</Badge>
            </div>
            { this.getUnitsField(UNIT_TYPES.Royal) }
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Badge>Commons</Badge>
            </div>
            { this.getUnitsField(UNIT_TYPES.Common) }
          </div>
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
        </div>
      );
    } else if(this.state.player === "1") {
      return (
        <div className="horizontal-warper">
          <div className="horizontal-section-content">
            <div className="text-center">
              <Badge>Board</Badge>
            </div>
            { this.getBoard() }
          </div>
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
              <Badge>Royals</Badge>
            </div>
            { this.getUnitsField(UNIT_TYPES.Royal) }
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Badge>Commons</Badge>
            </div>
            { this.getUnitsField(UNIT_TYPES.Common) }
          </div>
        </div>
      );
    }
  }

  render() {
    let header = this.props.ctx.gameover ? this.getHeaderGameover() : this.getHeaderActive();
    let table = this.getTable();
    return (
      <section className="game-board">
        { header }
        { table }
        <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_CENTER} />
      </section>
    );
  }
}

export default GameTable;