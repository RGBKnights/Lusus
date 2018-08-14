// Framework
import React from 'react';
import PropTypes from 'prop-types';

// UI
import { 
  Container,Row, Col, 
  Badge, 
  UncontrolledCollapse,
  Navbar, NavbarBrand, Nav, NavItem,
  Button
} from 'reactstrap';
import { Token, Grid } from 'boardgame.io/ui';
import {
  CubitLogo,
  CubitText,
  CubitOrthogonal,
  CubitDiagonal,
  CubitCardinal,
  CubitPattern,
  CubitSidestep,
  CubitSwap,
  CubitDrawPlus,
  CubitDrawMinus,
  CubitDoubleAction,
  CubitCondemn,
  CubitKnowledge,
  CubitKingOfHill
} from './ui/cubits';
import { 
  UnitKing, 
  UnitBishop, 
  UnitKnight, 
  UnitRook, 
  UnitQueen, 
  UnitPawn 
} from './ui/units';
import HelpModal from './help';

// Game
import { Logic } from './logic';
import { CUBITS, MOVEMENT } from './cubits';

let gl = new Logic();

export default class ChessBoard extends React.Component {
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

    // UI
    this.action = null;
    this.help = React.createRef();
  }

  onHelp = () => {
    this.help.current.toggle();
  }

  getUnitComponent(type, color, team) {
    let unitComponent = null;
    switch (type) {
      case 'R':
        unitComponent = <UnitRook team={team} color={color} />;
        break;
      case 'N':
        unitComponent = <UnitKnight team={team} color={color} />;
        break;
      case 'B':
        unitComponent = <UnitBishop team={team} color={color} />;
        break;
      case 'K':
        unitComponent = <UnitKing team={team} color={color} />;
        break;
      case 'Q':
        unitComponent = <UnitQueen team={team} color={color} />;
        break;
      case 'P':
        unitComponent = <UnitPawn team={team} color={color} />;
        break;
      default:
        unitComponent = <CubitText color={team} value={type} />;
        break;
    }

    return unitComponent;
  }

  getCubitComponent(cubitix, team) {
    let cubit = gl.getCubit(cubitix);

    let cubitComponent = null;
    switch (cubitix) {
      case '0':
        cubitComponent = <CubitLogo name={cubit.name} color={team} />;
        break;
      case CUBITS.Orthogonal:
        cubitComponent = <CubitOrthogonal name={cubit.name} color={team} />;
        break;
      case CUBITS.Diagonal:
        cubitComponent = <CubitDiagonal name={cubit.name} color={team} />;
        break;
      case CUBITS.Cardinal:
        cubitComponent = <CubitCardinal name={cubit.name} color={team} />;
        break;
      case CUBITS.Pattern:
        cubitComponent = <CubitPattern name={cubit.name} color={team} />;
        break;
      case CUBITS.SideStep:
        cubitComponent = <CubitSidestep name={cubit.name} color={team} />;
        break;
      case CUBITS.Swap:
        cubitComponent = <CubitSwap name={cubit.name} color={team} />;
        break;
      case CUBITS.DrawNegOne:
        cubitComponent = <CubitDrawMinus name={cubit.name} color={team} />;
        break;
      case CUBITS.DrawPlusOne:
        cubitComponent = <CubitDrawPlus name={cubit.name} color={team} />;
        break;
      case CUBITS.DoubleAction:
        cubitComponent = <CubitDoubleAction name={cubit.name} color={team} />;
        break;
      case CUBITS.Knowledge:
        cubitComponent = <CubitKnowledge name={cubit.name} color={team} />;
        break;
      case CUBITS.Condemn:
        cubitComponent = <CubitCondemn name={cubit.name} color={team} />;
        break;
      case CUBITS.KingOfHill:
        cubitComponent = <CubitKingOfHill name={cubit.name} color={team} />;
        break;
      default:
        cubitComponent = <CubitText name={cubit.name} color={team} value={cubitix} />;
        break;
    }

    return cubitComponent;
  }

  onClickBoard = ({ x, y }) => {
    if(this.props.ctx.phase === 'Movement' && this.action == null) {
      this.action = { source: { x:x, y:y } };
      this.forceUpdate();
      return;
    }
    if(this.props.ctx.phase === 'Movement' && this.action != null) {
      this.props.moves.moveUnit(this.action.source.x, this.action.source.y, x, y);
      this.action = null;
      return;
    }
  };

  onClickField = ({ x, y }) => {
    if(this.props.ctx.phase === 'Action' && this.action != null) {
      this.props.moves.playCubitOnField(this.action.cubitix, x, y);
      this.action = null;
      return;
    }
  };

  onClickPlayer1Hand = ({ x, y }) => {
    if(this.props.ctx.phase === 'Action') {
      this.action = { cubitix: x };
      this.forceUpdate();
      return;
    }
  };

  onClickPlayer2Hand = ({ x, y }) => {
    if(this.props.ctx.phase === 'Action') {
      this.action = { cubitix: x };
      this.forceUpdate();
      return;
    }
  };

  onClickPlayer1Slots = ({ x, y }) => {
    if(this.props.ctx.phase === 'Action' && this.action != null) {
      this.props.moves.playCubitOnPlayer(this.action.cubitix, '0');
      this.action = null;
      return;
    }
  };

  onClickPlayer2Slots = ({ x, y }) => {
    if(this.props.ctx.phase === 'Action' && this.action != null) {
      this.props.moves.playCubitOnPlayer(this.action.cubitix, '1');
      this.action = null;
      return;
    }
  };

  onClickPlayer1Units = ({ x, y }) => {
    if(this.props.ctx.phase === 'Action' && this.action != null) {
      this.props.moves.playCubitOnUnit(this.action.cubitix, '0', y);
      this.action = null;
      return;
    }

    if(this.props.ctx.phase === 'Movement' && this.action == null) {
      this.action.cubitix = {x: x, y: y};
      return;
    }
  };

  onClickPlayer2Units = ({ x, y }) => {
    if(this.props.ctx.phase === 'Action' && this.action != null) {
      this.props.moves.playCubitOnUnit(this.action.cubitix, '1', y);
      this.action = null;
      return;
    }
  };

  onClickPlayer1Reinforcements = ({ x, y }) => {
    console.log("Player 1 - Reinforcements", {x,y});
  };

  onClickPlayer2Reinforcements = ({ x, y }) => {
    console.log("Player 2 - Reinforcements", {x,y});
  };

  onClickPlayer1Afterlife = ({ x, y }) => {
    console.log("Player 1 - Afterlife", {x,y});
  };

  onClickPlayer2Afterlife = ({ x, y }) => {
    console.log("Player 2 - Afterlife", {x,y});
  };

  onClickArena = ({ x, y }) => {
    if(this.props.ctx.phase === 'Action' && this.action != null) {
      this.props.moves.playCubitOnArena(this.action.cubitix);
      this.action = null;
      return;
    }
  };

  onTokenMouseOver = ({ x, y }) => {
    // console.log("Test");
  };

  onSkipPhase = () => {
    if(this.props.ctx.phase === 'Action') {
      this.props.events.endPhase();
    }
  };

  onEndTurn = () => {
    if(this.props.ctx.phase === 'Maintenance') {
      this.props.moves.maintenance();
    }
  };

  render() {
    let connected = (this.props.isMultiplayer && this.props.isConnected);

    // Styles
    let whiteBroaderStyle = {strokeWidth:0.05,stroke:'#fff'};
    let backBoarderStyle = {strokeWidth:0.01,stroke:'#000'};
    let toggleStyles = {cursor: 'pointer'};

    let backgroundColor = '#959595';
    let whiteColor = '#817F7F';
    let backColor = '#ABAAAA';
    let selectedColor = '#4E9334';
    let passiveMoveColor = '#4E9334';
    let captureMoveColor = '#BE8E3F';

    // Setup players and teams
    let players = {'0': null, '1': null};
    let teams = ['w', 'b'];

    // ColorMaps for Grid
    let fieldColorMap = {};
    let boardColorMap = {};
    let arenaColorMap = {};
    arenaColorMap[`${0},${0}`] = backgroundColor;
    let handColorMap = { 
      '0': {}, 
      '1': {} 
    };
    let playerColorMap = { 
      '0': {}, 
      '1': {} 
    };
    let unitsColorMap = {
      '0': {},
      '1': {}
    }
    let afterlifeColorMap = {
      '0': {},
      '1': {}
    }
    let reinforcementsColorMap = {
      '0': {},
      '1': {}
    }

    let unitKey = 0;

    // Get moves in a unit is selected on board
    let moves = [];
    if(this.props.ctx.phase === 'Movement' && this.action != null) {
      moves = gl.moves(this.props.G, this.props.playerID, this.action.source);
    }

    // Populate the board and field color maps
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const key = `${x},${y}`;
        const color = ((x + y) % 2 === 0) ? whiteColor : backColor;

        fieldColorMap[key] = color;
        boardColorMap[key] = color;

        let move = moves.find(function(m) { return m.x === x && m.y === y; });
        if(move === undefined) {
        } else if(move.type === MOVEMENT.passive) {
          boardColorMap[key] = passiveMoveColor;
        } else if(move.type === MOVEMENT.capture) {
          boardColorMap[key] = captureMoveColor;
        }
      }
    }

    // Data
    let board = [];
    let field = [];
    let arena = [];

    let hands = {
      '0': [], 
      '1': []
    };
    let commanders = {
      '0': 0,
      '1': 0
    };
    let units = {
      '0': [],
      '1': []
    };
    let slots = {
      '0': [],
      '1': []
    };
    let reinforcements = {
      '0': [],
      '1': []
    };
    let afterlife = {
      '0': [],
      '1': []
    };

    let knowledge = {
      '0': gl.playerHasCubit(this.props.G, '1', CUBITS.Knowledge),
      '1': gl.playerHasCubit(this.props.G, '0', CUBITS.Knowledge)
    }

    // Cards in Hand
    for (const p in players) {
      const player = this.props.G.players[p];
      const cardsInHand = player.hand.length;
      
      // Color Map
      if (this.props.playerID === p) {
        for (let x = 0; x < 5; x++) {
          let color = (this.props.ctx.phase === 'Action' && this.action != null && this.action.cubitix === x) ? selectedColor : backgroundColor;
          handColorMap[p][`${x},${0}`] = color;
        }
      } else {
        for (let x = 0; x < 5; x++) {
          handColorMap[p][`${x},${0}`] = backgroundColor;
        }
      }

      // Cubits
      if (this.props.playerID === p || knowledge[p] === true) {
        for (let i = 0; i < cardsInHand; i++) {
          let cubitix = player.hand[i];
          let cubitComponent = this.getCubitComponent(cubitix, teams[p]);
          hands[p].push(<Token key={i} x={i} y={0}>{cubitComponent}</Token>);
        }
      } else {
        for (let i = 0; i < cardsInHand; i++) {
          hands[p].push(<Token key={i} x={i} y={0}><CubitLogo color={teams[p]} /></Token>);
        }
      }
    }

    // Units and slots
    unitKey = 0;
    for (const p in players) {
      const player = this.props.G.players[p];
      
      commanders[p] = player.units.length;

      for (let a = 0; a < player.units.length; a++) {
        const unit = player.units[a];

        let unitComponent = this.getUnitComponent(unit.type, unit.color, teams[p]);

        // Push units to units 1st column
        units[p].push(<Token key={unitKey++} x={0} y={a}>{unitComponent}</Token>);
        
        // Push units to board
        board.push(<Token key={unit.key} x={unit.x} y={unit.y} animate={true}>{unitComponent}</Token>);

        // push cubits to field for each unit
        for (let b = 0; b < unit.slots.length; b++) {
          const data = unit.slots[b];
          let x = b+1;

          let cubitComponent = this.getCubitComponent(data.cubit, teams[data.controller]);

          units[p].push(<Token key={unitKey++} x={x} y={a} >{cubitComponent}</Token>); 
        }

        // Grid colours
        unitsColorMap[p][`${0},${a}`] = backgroundColor;
        for (let c= 0; c < unit.limit; c++) {
          unitsColorMap[p][`${c+1},${a}`] = backgroundColor;
        }

      }
    }

    // Player slots
    for (const p in players) {
      const player = this.props.G.players[p];

      for (let x = 0; x < 5; x++) {
        playerColorMap[p][`${x},${0}`] = backgroundColor;
      }
      
      for (let a = 0; a < player.slots.length; a++) {
        const data = player.slots[a];
        let cubitComponent = this.getCubitComponent(data.cubit, teams[data.controller]);
        slots[p].push(<Token key={a} x={a} y={0} >{cubitComponent}</Token>); 
      }
    }

    // Field
    let fieldKey = 0;
    for (const p in players) {
      const player = this.props.G.players[p];
      for (let a = 0; a < player.field.length; a++) {
        let data = player.field[a];
        let cubitComponent = this.getCubitComponent(data.cubit, teams[p]);
        field.push(<Token key={fieldKey++} x={data.x} y={data.y} >{cubitComponent}</Token>);
      }
    }

    // Arena
    if(this.props.G.arena) {
      let a = this.props.G.arena;
      let cubitComponent = this.getCubitComponent(a.cubit, teams[a.controller]);
      arena.push(<Token key={0} x={0} y={0} >{cubitComponent}</Token>);

      if(a.cubit === CUBITS.KingOfHill) {
        let cubitComponent = this.getCubitComponent(a.cubit, teams[a.controller]);
        field.push(<Token key={fieldKey++} x={a.data.location.x} y={a.data.location.y} >{cubitComponent}</Token>);
      }
    }

    // Afterlife
    unitKey = 0;
    for (const p in players) {
      const player = this.props.G.players[p];
      for (let a = 0; a < player.afterlife.length; a++) {
        let unit =  player.afterlife[a];

        let unitComponent = this.getUnitComponent(unit.type, unit.color, teams[p]);

        // Push units to units 1st column
        afterlife[p].push(<Token key={unitKey++} x={0} y={a}>{unitComponent}</Token>);
        
        // push cubits to field for each unit
        for (let b = 0; b < unit.slots.length; b++) {
          const data = unit.slots[b];
          let x = b+1;

          let cubitComponent = this.getCubitComponent(data.cubit, teams[data.controller]);

          afterlife[p].push(<Token key={unitKey++} x={x} y={a} >{cubitComponent}</Token>); 
        }

        // Grid colours
        afterlifeColorMap[p][`${0},${a}`] = backgroundColor;
        for (let c= 0; c < unit.limit; c++) {
          afterlifeColorMap[p][`${c+1},${a}`] = backgroundColor;
        }
      }
    }

    // Reinforcements
    for (const p in players) {
      const player = this.props.G.players[p];
      for (let a = 0; a < player.reinforcements.length; a++) {
        let unit =  player.reinforcements[a];

        let unitComponent = this.getUnitComponent(unit.type, unit.color, teams[p]);

        // Push units to units 1st column
        reinforcements[p].push(<Token key={unitKey++} x={0} y={a}>{unitComponent}</Token>);
        
        // push cubits to field for each unit
        for (let b = 0; b < unit.slots.length; b++) {
          const data = unit.slots[b];
          let x = b+1;

          let cubitComponent = this.getCubitComponent(data.cubit, teams[data.controller]);

          reinforcements[p].push(<Token key={unitKey++} x={x} y={a} >{cubitComponent}</Token>); 
        }

        // Grid colours
        reinforcementsColorMap[p][`${0},${a}`] = backgroundColor;
        for (let c= 0; c < unit.limit; c++) {
          reinforcementsColorMap[p][`${c+1},${a}`] = backgroundColor;
        }
      }
    }

    // Counts
    let counts = {
      '0': {
        bag: this.props.G.players['0'].bag.length,
        draw: gl.getNumberOfDraws(this.props.G, '0'),
        actions: gl.getNumberOfActions(this.props.G, '0'),
        exile: this.props.G.players['0'].exile.length,
        units: commanders['0']
      },
      '1': {
        bag: this.props.G.players['1'].bag.length,
        draw: gl.getNumberOfDraws(this.props.G, '1'),
        actions: gl.getNumberOfActions(this.props.G, '1'),
        exile: this.props.G.players['1'].exile.length,
        units: commanders['1']
      }
    }

    let gameMenu = []
    if(this.props.ctx.gameover) {
      if(this.props.ctx.gameover === this.props.playerID) {
        gameMenu.push(<Button key={"GameOver"} color="success" >Game Over! You Won</Button>);
      } else {
        gameMenu.push(<Button key={"GameOver"} color="danger" >Game Over! You Lost</Button>);
      }
    } else {
      gameMenu.push(<Button key={"ShipPhase"} color="primary" onClick={this.onSkipPhase} disabled={this.props.ctx.phase !== 'Action'}>Skip Phase</Button>);
      gameMenu.push(<Button key={"EndTurn"} color="warning" onClick={this.onEndTurn} disabled={this.props.ctx.phase !== 'Maintenance'}>End Turn</Button>);
    }
    
    let mainMenu = [];
    mainMenu.push(<Button key={"Help"} color="info" onClick={this.onHelp} title="Help">?</Button>);

    if (connected) {
      mainMenu.push(<Button key={"Connection"} color="success" title="Connected!">✓</Button>);
    } else {
      mainMenu.push(<Button key={"Connection"} color="danger" title="Disconnected...">X</Button>);
    }

    return (
      <Container>
        <Row>
          <Col>
            <Navbar color="dark" dark expand="md">
              <NavbarBrand href="/">Lusus <small>Tactical Chess</small></NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {gameMenu}
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {mainMenu}
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={3}>
            <Row>
              <Col>
                <div className="text-center">
                  <h5>Player 1</h5>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  <span>Draws</span>
                  <Badge color="secondary" className="float-right mt-2">{counts['0'].draw}</Badge>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  <span>Actions</span>
                  <Badge color="secondary" className="float-right mt-2">{counts['0'].actions}</Badge>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  <span>Bag</span>
                  <Badge color="secondary" className="float-right mt-2">{counts['0'].bag}</Badge>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  <span>Exile</span>
                  <Badge color="secondary" className="float-right mt-2">{counts['0'].exile}</Badge>
                </h5>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h5 id="Player1HandToggle">
                  <u style={toggleStyles}>Hand</u>
                  <Badge color="secondary" className="float-right mt-2">{hands['0'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player1HandToggle" isOpen={true}>
                  <Grid rows={1} cols={5} onClick={this.onClickPlayer1Hand} onMouseOver={this.onTokenMouseOver} colorMap={handColorMap['0']} style={whiteBroaderStyle}>
                    {hands['0']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 id="Player1PlayerToggle">
                  <u style={toggleStyles}>Player</u>
                  <Badge color="secondary" className="float-right mt-2">{slots['0'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player1PlayerToggle" isOpen={true}>
                  <Grid rows={1} cols={5} onClick={this.onClickPlayer1Slots} colorMap={playerColorMap['0']} style={whiteBroaderStyle}>
                    {slots['0']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 id="Player1UnitToggle">
                  <u style={toggleStyles}>Units</u>
                  <Badge color="secondary" className="float-right mt-2">{counts['0'].units}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player1UnitToggle" isOpen={true}>
                  <Grid rows={counts['0'].units} cols={5} onClick={this.onClickPlayer1Units}  colorMap={unitsColorMap['0']} style={whiteBroaderStyle}>
                    {units['0']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h5 id="Player1ReinforcementsToggle">
                  <u style={toggleStyles}>Reinforcements</u>
                  <Badge color="secondary" className="float-right mt-2">{reinforcements['0'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player1ReinforcementsToggle">
                  <Grid rows={reinforcements['0'].length} cols={5} onClick={this.onClickPlayer1Reinforcements} colorMap={reinforcementsColorMap['0']} style={whiteBroaderStyle}>
                    {reinforcements['0']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 id="Player1AfterlifeToggle">
                  <u style={toggleStyles}>Afterlife</u>
                  <Badge color="secondary" className="float-right mt-2">{afterlife['0'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player1AfterlifeToggle">
                  <Grid rows={afterlife['0'].length} cols={5} onClick={this.onClickPlayer1Afterlife} colorMap={afterlifeColorMap['0']} style={whiteBroaderStyle}>
                    {afterlife['0']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <h3>Arena</h3>
              </Col>
              <Col xs={2}>
                <Grid rows={1} cols={1} onClick={this.onClickArena} colorMap={arenaColorMap}>
                  {arena}
                </Grid>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Board</h3>
                <Grid rows={8} cols={8} onClick={this.onClickBoard} colorMap={boardColorMap}  style={backBoarderStyle}>
                  {board}
                </Grid>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Field</h3>
                <Grid rows={8} cols={8} onClick={this.onClickField} colorMap={fieldColorMap}  style={backBoarderStyle}>
                  {field}
                </Grid>
              </Col>
            </Row>
          </Col>
          <Col xs={3}>
            <Row>
              <Col>
                <div className="text-center">
                  <h5>Player 2</h5>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  <span>Draws</span>
                  <Badge color="secondary" className="float-right mt-2">{counts['1'].draw}</Badge>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  <span>Actions</span>
                  <Badge color="secondary" className="float-right mt-2">{counts['1'].actions}</Badge>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  <span>Bag</span>
                  <Badge color="secondary" className="float-right mt-2">{counts['1'].bag}</Badge>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  <span>Exile</span>
                  <Badge color="secondary" className="float-right mt-2">{counts['1'].exile}</Badge>
                </h5>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h5 id="Player2HandToggle">
                  <u style={toggleStyles}>Hand</u>
                  <Badge color="secondary" className="float-right mt-2">{hands['1'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player2HandToggle" isOpen={true}>
                  <Grid rows={1} cols={5} onClick={this.onClickPlayer2Hand} colorMap={handColorMap['1']} style={whiteBroaderStyle}>
                    {hands['1']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 id="Player2PlayerToggle">
                  <u style={toggleStyles}>Player</u>
                  <Badge color="secondary" className="float-right mt-2">{slots['1'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player2PlayerToggle" isOpen={true}>
                  <Grid rows={1} cols={5} onClick={this.onClickPlayer2Slots}  colorMap={playerColorMap['1']} style={whiteBroaderStyle}>
                    {slots['1']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 id="Player2UnitToggle">
                  <u style={toggleStyles}>Units</u>
                  <Badge color="secondary" className="float-right mt-2">{counts['1'].units}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player2UnitToggle" isOpen={true}>
                  <Grid rows={counts['1'].units} cols={5} onClick={this.onClickPlayer2Units}  colorMap={unitsColorMap['1']} style={whiteBroaderStyle}>
                    {units['1']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h5 id="Player2ReinforcementsToggle">
                  <u style={toggleStyles}>Reinforcements</u>
                  <Badge color="secondary" className="float-right mt-2">{reinforcements['1'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player2ReinforcementsToggle">
                  <Grid rows={reinforcements['1'].length} cols={5} onClick={this.onClickPlayer2Reinforcements} colorMap={reinforcementsColorMap['1']} style={whiteBroaderStyle}>
                    {reinforcements['1']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 id="Player2AfterlifeToggle">
                  <u style={toggleStyles}>Afterlife</u>
                  <Badge color="secondary" className="float-right mt-2">{afterlife['1'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player2AfterlifeToggle">
                  <Grid rows={afterlife['1'].length} cols={5} onClick={this.onClickPlayer2Afterlife} colorMap={afterlifeColorMap['1']} style={whiteBroaderStyle}>
                    {afterlife['1']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
          </Col>
        </Row>
        <HelpModal ref={this.help} />
      </Container>
    );
  }
}