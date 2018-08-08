// Framework
import React from 'react';
import PropTypes from 'prop-types';
// UI
import { Container, Row, Col, Alert, Badge, UncontrolledCollapse  } from 'reactstrap';
import { Token, Grid } from 'boardgame.io/ui';
// Logic
import { Logic } from './logic';
// Cubits
import CubitLogo from './cubits/cubit';
import CubitText from './cubits/text';
import CubitOrthogonal from './cubits/orthogonal';
import CubitDiagonal from './cubits/diagonal';
import CubitCardinal from './cubits/cardinal';
import CubitPattern from './cubits/pattern';
import CubitSidestep from './cubits/sidestep';
import CubitSwap from './cubits/swap';
import CubitImmune from './cubits/immune';
import CubitGuard from './cubits/guard';
import CubitDrawPlus from './cubits/drawplus';
import CubitDrawMinus from './cubits/drawminus';
import CubitCondemn  from './cubits/condemn'
import CubitHitRun from './cubits/hitrun'
import CubitKnowledge from './cubits/knowledge'
import CubitSacrifice from './cubits/sacrifice'
import CubitKingOfHill from './cubits/kingofhill'
// import * as Cubits from './cubits'
// Units
import UnitKing from './units/king';
import UnitBishop from './units/bishop';
import UnitKnight from './units/knight';
import UnitRook from './units/rook';
import UnitQueen from './units/queen';
import UnitPawn from './units/pawn';

let gl = new Logic();

function ConnectionStatus(props) {
  if (props.connected) {
    return (
      <Alert color="success" style={{marginTop: 10}}><strong>Connected!</strong></Alert>
    );
  } else {
    return (
      <Alert color="danger" style={{marginTop: 10}}><strong>Disconnected...</strong></Alert>
    );
  }
}

export default class ChessBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
  };

  constructor(params) {
    super(params);

    this.action = null;
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
    let cubitComponent = null;
    switch (cubitix) {
      case '0':
        cubitComponent = <CubitLogo color={team} />;
        break;
      case '1000':
        cubitComponent = <CubitOrthogonal color={team} />;
        break;
      case '1001':
        cubitComponent = <CubitDiagonal color={team} />;
        break;
      case '1002':
        cubitComponent = <CubitCardinal color={team} />;
        break;
      case '1003':
        cubitComponent = <CubitPattern color={team} />;
        break;
      case '1004':
        cubitComponent = <CubitSidestep color={team} />;
        break;
      case '1005':
        cubitComponent = <CubitSwap color={team} />;
        break;
      case '1006':
        cubitComponent = <CubitHitRun color={team} />;
        break;
      case '1007':
        cubitComponent = <CubitDrawMinus color={team} />;
        break;
      case '1008':
        cubitComponent = <CubitDrawPlus color={team} />;
        break;
      case '1009':
        cubitComponent = <CubitKnowledge color={team} />;
        break;
      case '1010':
        cubitComponent = <CubitGuard color={team} />;
        break;
      case '1011':
        cubitComponent = <CubitCondemn color={team} />;
        break;
      case '1012':
        cubitComponent = <CubitImmune color={team} />;
        break;
      case '1013':
        cubitComponent = <CubitSacrifice color={team} />;
        break;
      case '1014':
        cubitComponent = <CubitKingOfHill color={team} />;
        break;
      default:
        cubitComponent = <CubitText color={team} value={cubitix} />;
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
      return;
    }
  };

  onClickPlayer2Hand = ({ x, y }) => {
    if(this.props.ctx.phase === 'Action') {
      this.action = { cubitix: x };
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

  render() {
    let connected = (this.props.isMultiplayer && this.props.isConnected);

    let moves = [];
    if(this.props.ctx.phase === 'Movement' && this.action != null) {
      moves = gl.moves(this.props.G, this.props.playerID, this.action.source);
    }

    let boardStyle = {strokeWidth:0.01,stroke:'#000'};
    let fieldColorMap = {};
    let boardColorMap = {};
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const key = `${x},${y}`;
        const color = ((x + y) % 2 === 0) ? '#817F7F' : '#ABAAAA';

        fieldColorMap[key] = color
        boardColorMap[key] = color;

        let move = moves.find(function(m) { return m.x === x && m.y === y; });
        if(move === undefined) {
        } else if(move.type === 1) {
          boardColorMap[key] = '#4E9334';
        } else if(move.type === 2) {
          boardColorMap[key] = '#BE8E3F';
        }
      }
    }

    let toggleStyles = {cursor: 'pointer'};

    let handColorMap = {
      '0': {},
      '1': {}
    };

    let arenaColorMap = {};
    arenaColorMap[`${0},${0}`] = '#959595';

    let handStyle = {strokeWidth:0.05,stroke:'#fff'};
    let unitstyle = {strokeWidth:0.05,stroke:'#fff'};

    let players = {'0': null, '1': null};

    let colors = ['#959595', '#959595'];
    let teams = ['w', 'b'];
    let hands = {
      '0': [],
      '1': []
    };
    
    for (const p in players) {
      for (let x = 0; x < 5; x++) {
        handColorMap[p][`${x},${0}`] = colors[p];
      }

      const player = this.props.G.players[p];
      const cardsInHand = player.hand.length;

      if (this.props.playerID === p) {
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

    let board = [];
    let commanders = {
      '0': 0,
      '1': 0
    };
    let units = {
      '0': [],
      '1': []
    };
    let unitsColorMap = {
      '0': {},
      '1': {}
    }
    let boardKey = 0;
    let unitKey = 0;
    for (const p in players) {
      const player = this.props.G.players[p];

      for (let a = 0; a < player.units.length; a++) {
        const unit = player.units[a];

        let unitComponent = this.getUnitComponent(unit.type, unit.color, teams[p]);

        // count commanders
        commanders[p]++;

        // Push units to units 1st column
        units[p].push(<Token key={unitKey++} x={0} y={a}>{unitComponent}</Token>);
        
        // Push units to board
        board.push(<Token key={boardKey++} x={unit.x} y={unit.y} animate={true}>{unitComponent}</Token>);

        // push cubits to field for each unit
        for (let b = 0; b < unit.slots.length; b++) {
          const data = unit.slots[b];
          let x = b+1;

          let cubitComponent = this.getCubitComponent(data.cubit, teams[data.controller]);

          units[p].push(<Token key={unitKey++} x={x} y={a} >{cubitComponent}</Token>); 
        }

        // Field background colours
        unitsColorMap[p][`${0},${a}`] = colors[p];
        for (let c= 0; c < unit.limit; c++) {
          unitsColorMap[p][`${c+1},${a}`] = colors[p];
        }

      }
    }

    let slots = {
      '0': [],
      '1': []
    };

    for (const p in players) {
      const player = this.props.G.players[p];
      
      for (let a = 0; a < player.slots.length; a++) {
        const data = player.slots[a];
        let cubitComponent = this.getCubitComponent(data.cubit, teams[data.controller]);
        slots[p].push(<Token key={a} x={a} y={0} >{cubitComponent}</Token>); 
      }
    }

    let field = [];
    let fieldKey = 0;
    for (const p in players) {
      const player = this.props.G.players[p];

      for (let a = 0; a < player.field.length; a++) {
        let data = player.field[a];
        let cubitComponent = this.getCubitComponent(data.cubit, teams[p]);
        field.push(<Token key={fieldKey++} x={data.x} y={data.y} >{cubitComponent}</Token>);
      }
    }

    let arena = [];
    for (const p in players) {
      const player = this.props.G.players[p];
      if(player.arena) {
        let cubitComponent = this.getCubitComponent(player.arena, teams[p]);
        arena.push(<Token key={fieldKey++} x={0} y={0} >{cubitComponent}</Token>);
      }
    }

    let bags = {
      '0': this.props.G.players['0'].bag.length,
      '1': this.props.G.players['1'].bag.length
    };

    let draw = {
      '0': this.props.G.players['0'].draw,
      '1': this.props.G.players['1'].draw
    };

    let actions = {
      '0': this.props.G.players['0'].actions,
      '1': this.props.G.players['1'].actions
    };

    let exile = {
      '0': this.props.G.players['0'].exile.length,
      '1': this.props.G.players['1'].exile.length
    };

    let reinforcements = {
      '0': this.props.G.players['0'].reinforcements,
      '1': this.props.G.players['1'].reinforcements
    };

    let afterlife = {
      '0': this.props.G.players['0'].afterlife,
      '1': this.props.G.players['1'].afterlife
    };
    
    return (
      <Container>
        <Row>
          <Col>
            <h1>Lusus <small>Tactical Chess</small></h1>
          </Col>
          <Col xs={3}>
            <div className="text-center">
              <ConnectionStatus connected={connected}></ConnectionStatus>
            </div>
          </Col>
        </Row>
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
                  <span>Draw</span>
                  <Badge color="secondary" className="float-right mt-2">{draw['0']}</Badge>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  <span>Action</span>
                  <Badge color="secondary" className="float-right mt-2">{actions['0']}</Badge>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  <span>Bag</span>
                  <Badge color="secondary" className="float-right mt-2">{bags['0']}</Badge>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  <span>Exile</span>
                  <Badge color="secondary" className="float-right mt-2">{exile['0']}</Badge>
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
                  <Grid rows={1} cols={5} onClick={this.onClickPlayer1Hand} onMouseOver={this.onTokenMouseOver} colorMap={handColorMap['0']} style={handStyle}>
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
                  <Grid rows={1} cols={5} onClick={this.onClickPlayer1Slots} colorMap={handColorMap['0']} style={handStyle}>
                    {slots['0']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 id="Player1UnitToggle">
                  <u style={toggleStyles}>Units</u>
                  <Badge color="secondary" className="float-right mt-2">{units['0'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player1UnitToggle" isOpen={true}>
                  <Grid rows={commanders['0']} cols={5} onClick={this.onClickPlayer1Units}  colorMap={unitsColorMap['0']} style={unitstyle}>
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
                  <Grid rows={reinforcements['0'].length} cols={5} onClick={this.onClickPlayer1Reinforcements}>
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
                  <Grid rows={afterlife['0'].length} cols={5} onClick={this.onClickPlayer1Afterlife}>
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
                <Grid rows={8} cols={8} onClick={this.onClickBoard} colorMap={boardColorMap}  style={boardStyle}>
                  {board}
                </Grid>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Field</h3>
                <Grid rows={8} cols={8} onClick={this.onClickField} colorMap={fieldColorMap}  style={boardStyle}>
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
                  <span>Draw</span>
                  <Badge color="secondary" className="float-right mt-2">{draw['1']}</Badge>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  <span>Action</span>
                  <Badge color="secondary" className="float-right mt-2">{actions['1']}</Badge>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  <span>Bag</span>
                  <Badge color="secondary" className="float-right mt-2">{bags['1']}</Badge>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  <span>Exile</span>
                  <Badge color="secondary" className="float-right mt-2">{exile['1']}</Badge>
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
                  <Grid rows={1} cols={5} onClick={this.onClickPlayer2Hand} colorMap={handColorMap['1']} style={handStyle}>
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
                  <Grid rows={1} cols={5} onClick={this.onClickPlayer2Hand}  colorMap={handColorMap['1']} style={handStyle}>
                    {slots['1']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 id="Player2UnitToggle">
                  <u style={toggleStyles}>Units</u>
                  <Badge color="secondary" className="float-right mt-2">{units['1'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player2UnitToggle" isOpen={true}>
                  <Grid rows={commanders['1']} cols={5} onClick={this.onClickPlayer2Units}  colorMap={unitsColorMap['1']} style={unitstyle}>
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
                  <Grid rows={reinforcements['1'].length} cols={5} onClick={this.onClickPlayer2Reinforcements}>
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
                  <Grid rows={afterlife['1'].length} cols={5} onClick={this.onClickPlayer2Afterlife}>
                    {afterlife['1']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}