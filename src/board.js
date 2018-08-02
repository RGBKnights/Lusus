// Framework
import React from 'react';
import PropTypes from 'prop-types';
// UI
import { Container, Row, Col, Alert, Badge, UncontrolledCollapse  } from 'reactstrap';
import { Token, Grid } from 'boardgame.io/ui';
// Cubits
import CubitLogo from './cubits/cubit';
import CubitText from './cubits/text';
import CubitKing from './cubits/king';
import CubitBishop from './cubits/bishop';
import CubitKnight from './cubits/knight';
import CubitRook from './cubits/rook';
import CubitQueen from './cubits/queen';
import CubitPawn from './cubits/pawn';
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
// Units
import UnitKing from './units/king';
import UnitBishop from './units/bishop';
import UnitKnight from './units/knight';
import UnitRook from './units/rook';
import UnitQueen from './units/queen';
import UnitPawn from './units/pawn';

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
        cubitComponent = <CubitPawn color={team} />;
        break;
      case '1001':
        cubitComponent = <CubitRook color={team} />;
        break;
      case '1002':
        cubitComponent = <CubitKnight color={team} />;
        break;
      case '1003':
        cubitComponent = <CubitBishop color={team} />;
        break;
      case '1004':
        cubitComponent = <CubitKing color={team} />;
        break;
      case '1005':
        cubitComponent = <CubitQueen color={team} />;
        break;
      case '1006':
        cubitComponent = <CubitSwap color={team} />;
        break;
      case '1007':
        cubitComponent = <CubitHitRun color={team} />;
        break;
      case '2000':
        cubitComponent = <CubitDrawMinus color={team} />;
        break;
      case '2001':
        cubitComponent = <CubitDrawPlus color={team} />;
        break;
      case '2002':
        cubitComponent = <CubitKnowledge color={team} />;
        break;
      case '3000':
        cubitComponent = <CubitGuard color={team} />;
        break;
      case '3001':
        cubitComponent = <CubitCondemn color={team} />;
        break;
      case '4000':
        cubitComponent = <CubitImmune color={team} />;
        break;
      case '4001':
        cubitComponent = <CubitSacrifice color={team} />;
        break;
      case '5000':
        cubitComponent = <CubitKingOfHill color={team} />;
        break;
      default:
        cubitComponent = <CubitText color={team} value={cubitix} />;
        break;
    }

    return cubitComponent;
  }

  onClickBoard = ({ x, y }) => {
    console.log("Board", {x,y});
  };

  onClickField = ({ x, y }) => {
    console.log("Field", {x,y});
  };

  onClickHand = ({ x, y }) => {
    console.log("Hand", {x,y});
  };

  render() {
    let connected = (this.props.isMultiplayer && this.props.isConnected);

    let boardColorMap = {};
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const key = `${x},${y}`;
        let color = ((x + y) % 2 === 0) ? '#817F7F' : '#ABAAAA';
        boardColorMap[key] = color;
      }
    }

    let arenaStyle = {
      strokeWidth:0.05,
      stroke:'#000'
    };

    let handColorMap = {
      '0': {},
      '1': {}
    };
    let fieldColorMap = {
      '0': {},
      '1': {}
    };

    let handStyle = {strokeWidth:0.05,stroke:'#fff'};
    let fieldStyle = {strokeWidth:0.05,stroke:'#fff'};

    let colors = ['#817F7F', '#ABAAAA'];
    let teams = ['w', 'b'];
    let hands = {
      '0': [],
      '1': []
    };


    for (const p in hands) {
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
    let fields = {
      '0': [],
      '1': []
    };
    let boardKey = 0;
    let fieldKey = 0;
    for (const p in fields) {
      const player = this.props.G.players[p];

      for (let a = 0; a < player.units.length; a++) {
        const unit = player.units[a];

        let unitComponent = this.getUnitComponent(unit.type, unit.color, teams[p]);

        // Push units to fields 1st column
        fields[p].push(<Token key={fieldKey++} x={0} y={a}>{unitComponent}</Token>);

        // Push units to board
        board.push(<Token key={boardKey++} x={unit.x} y={unit.y} animate={true}>{unitComponent}</Token>);

        // push cubits to field for each unit
        for (let b = 0; b < unit.slots.length; b++) {
          const cubitix = unit.slots[b];
          if(cubitix) {
            let x = b+1;

            let cubitComponent = this.getCubitComponent(cubitix, teams[p]);

            fields[p].push(<Token key={fieldKey++} x={x} y={a} >{cubitComponent}</Token>); 
          }
        }

        // Field background colours
        fieldColorMap[p][`${0},${a}`] = colors[p];
        for (let c= 0; c < unit.limit; c++) {
          fieldColorMap[p][`${c+1},${a}`] = colors[p];
        }

      }
    }

    let toggleStyles = {cursor: 'pointer'};

    let slots = {
      '0': this.props.G.players['0'].slots,
      '1': this.props.G.players['1'].slots
    };

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
                <h5 id="Player1PlayerToggle">
                  <u style={toggleStyles}>Player</u>
                  <Badge color="secondary" className="float-right mt-2">{slots['0'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player1PlayerToggle" isOpen={true}>
                  <Grid rows={1} cols={5}  colorMap={handColorMap['0']} style={handStyle}>
                    {slots['0']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 id="Player1HandToggle">
                  <u style={toggleStyles}>Hand</u>
                  <Badge color="secondary" className="float-right mt-2">{hands['0'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player1HandToggle" isOpen={true}>
                  <Grid rows={1} cols={5}  colorMap={handColorMap['0']} style={handStyle}>
                    {hands['0']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 id="Player1FieldToggle">
                  <u style={toggleStyles}>Units</u>
                  <Badge color="secondary" className="float-right mt-2">{fields['0'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player1FieldToggle" isOpen={true}>
                  <Grid rows={fields['0'].length} cols={5} colorMap={fieldColorMap['0']} style={fieldStyle}>
                    {fields['0']}
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
                  <Grid rows={reinforcements['0'].length} cols={5}  colorMap={fieldColorMap['0']} style={fieldStyle}>
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
                  <p>...</p>
                  <Grid rows={afterlife['0'].length} cols={5}  colorMap={fieldColorMap['0']} style={fieldStyle}>
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
                <Grid rows={1} cols={1} style={arenaStyle}>
                  <Token x={0} y={0}><CubitLogo color="b" /></Token>
                </Grid>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Board</h3>
                <Grid rows={8} cols={8} onClick={this.onClickBoard} colorMap={boardColorMap} >
                  {board}
                </Grid>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Field</h3>
                <Grid rows={8} cols={8} colorMap={boardColorMap} >
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
                <h5 id="Player2PlayerToggle">
                  <u style={toggleStyles}>Player</u>
                  <Badge color="secondary" className="float-right mt-2">{slots['1'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player2PlayerToggle" isOpen={true}>
                  <Grid rows={1} cols={5}  colorMap={handColorMap['1']} style={handStyle}>
                    {slots['1']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 id="Player2HandToggle">
                  <u style={toggleStyles}>Hand</u>
                  <Badge color="secondary" className="float-right mt-2">{hands['1'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player2HandToggle" isOpen={true}>
                  <Grid rows={1} cols={5} onClick={this.onClickHand} colorMap={handColorMap['1']} style={handStyle}>
                    {hands['1']}
                  </Grid>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 id="Player2FieldToggle">
                  <u style={toggleStyles}>Units</u>
                  <Badge color="secondary" className="float-right mt-2">{fields['1'].length}</Badge>
                </h5>
                <UncontrolledCollapse toggler="#Player2FieldToggle" isOpen={true}>
                  <Grid rows={fields['1'].length} cols={5} onClick={this.onClickField}  colorMap={fieldColorMap['1']} style={fieldStyle}>
                    {fields['1']}
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
                  <Grid rows={reinforcements['1'].length} cols={5}  colorMap={fieldColorMap['1']} style={fieldStyle}>
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
                  <p>...</p>
                  <Grid rows={afterlife['1'].length} cols={5}  colorMap={fieldColorMap['1']} style={fieldStyle}>
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