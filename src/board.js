// Framework
import React from 'react';
import PropTypes from 'prop-types';
// UI
import { Container, Row, Col, Alert, Badge } from 'reactstrap';
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
import CubitRnB from './cubits/rb';
import CubitSidestep from './cubits/sidestep';
import CubitImmune from './cubits/immune';
import CubitGuard from './cubits/guard';
import CubitDrawPlus from './cubits/drawplus';
import CubitDrawMinus from './cubits/drawminus';
import CubitStickyFeet from './cubits/stickyfeet'
import CubitDisarm from './cubits/disarm'
import CubitEnrage from './cubits/enrage'
import CubitPhase from './cubits/phase'
import CubitDoubleAction from './cubits/doubleaction'
import CubitSpring from './cubits/spring'
import CubitCondemn  from './cubits/condemn'
import CubitWrap from './cubits/wrap'
import CubitGhost from './cubits/ghost'
import CubitImmobilized from './cubits/immobilized'
import CubitHitnRun from './cubits/hitrun'
import CubitKnowledge from './cubits/knowledge'
import CubitBoulderdash from './cubits/boulderdash'
import CubitThief from './cubits/thief'
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
      <Alert title="Connected!" color="success" style={{marginTop: 10}}><strong>✓</strong></Alert>
    );
  } else {
    return (
      <Alert title="Disconnected from Server..." color="danger" style={{marginTop: 10}}><strong>X</strong></Alert>
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

  getUnitComponent(type, team) {
    let unitComponent = null;
    switch (type) {
      case 'R':
        unitComponent = <UnitRook color={team} />;
        break;
      case 'N':
        unitComponent = <UnitKnight color={team} />;
        break;
      case 'B':
        unitComponent = <UnitBishop color={team} />;
        break;
      case 'K':
        unitComponent = <UnitKing color={team} />;
        break;
      case 'Q':
        unitComponent = <UnitQueen color={team} />;
        break;
      case 'P':
        unitComponent = <UnitPawn color={team} />;
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
      case '1000':
        cubitComponent = <CubitLogo color={team} />;
        break;
      case '1001':
        cubitComponent = <CubitPawn color={team} />;
        break;
      case '1002':
        cubitComponent = <CubitRook color={team} />;
        break;
      case '1003':
        cubitComponent = <CubitKnight color={team} />;
        break;
      case '1004':
        cubitComponent = <CubitBishop color={team} />;
        break;
      case '1005':
        cubitComponent = <CubitKing color={team} />;
        break;
      case '1006':
        cubitComponent = <CubitQueen color={team} />;
        break;
      case '1007':
        cubitComponent = <CubitSwap color={team} />;
        break;
      case '1008':
        cubitComponent = <CubitRnB color={team} />;
        break;
      case '1009':
        cubitComponent = <CubitSidestep color={team} />;
        break;
      case '1010':
        cubitComponent = <CubitImmune color={team} />;
        break;              
      case '1011':
        cubitComponent = <CubitGuard color={team} />;
        break;
      case '1012':
        cubitComponent = <CubitDrawPlus color={team} />;
        break;
      case '1013':
        cubitComponent = <CubitDrawMinus color={team} />;
        break;
      case '1014':
        cubitComponent = <CubitStickyFeet color={team} />;
        break;   
      case '1015':
        cubitComponent = <CubitDisarm color={team} />;
        break;
      case '1016':
        cubitComponent = <CubitEnrage color={team} />;
        break;
      case '1017':
        cubitComponent = <CubitPhase color={team} />;
        break;
      case '1018':
        cubitComponent = <CubitDoubleAction color={team} />;
        break;
      case '1019':
        cubitComponent = <CubitSpring color={team} />;
        break;
      case '1020':
        cubitComponent = <CubitCondemn color={team} />;
        break;
      case '1021':
        cubitComponent = <CubitWrap color={team} />;
        break;
      case '1022':
        cubitComponent = <CubitGhost color={team} />;
        break;
      case '1023':
        cubitComponent = <CubitImmobilized color={team} />;
        break;
      case '1024':
        cubitComponent = <CubitHitnRun color={team} />;
        break;
      case '1025':
        cubitComponent = <CubitKnowledge color={team} />;
        break;
      case '1026':
        cubitComponent = <CubitBoulderdash color={team} />;
        break;
      case '1027':
        cubitComponent = <CubitThief color={team} />;
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

        let unitComponent = this.getUnitComponent(unit.type, teams[p]);

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

    let graveyard = {
      '0': this.props.G.players['0'].graveyard.length,
      '1': this.props.G.players['1'].graveyard.length
    };

    let exile = {
      '0': this.props.G.players['0'].exile.length,
      '1': this.props.G.players['1'].exile.length
    };
    
    return (
      <Container>
        <Row>
          <Col>
            <h1>Lusus <small>Tactical Chess</small></h1>
          </Col>
          <Col xs={1}>
            <div className="text-center">
              <ConnectionStatus connected={connected}></ConnectionStatus>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center">
              <h5>Player 1</h5>
            </div>
          </Col>
          <Col>
            <div className="text-center">
              <h5>Player 2</h5>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <div className="text-center">
                      <span>Hand</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Grid rows={1} cols={5} onClick={this.onClickHand} colorMap={handColorMap['0']} style={handStyle}>
                      {hands['0']}
                    </Grid>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="text-center">
                  <span>Field</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Grid rows={fields['0'].length} cols={5} onClick={this.onClickField}  colorMap={fieldColorMap['0']} style={fieldStyle}>
                  {fields['0']}
                </Grid>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
              <Row>
                <Col>
                    <span>Bag <Badge color="success" className="float-right mt-2">{bags['0']}</Badge></span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>Draw <Badge color="primary" className="float-right mt-2">{draw['0']}</Badge></span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>Action <Badge color="primary" className="float-right mt-2">{actions['0']}</Badge></span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>Graveyard <Badge color="warning" className="float-right mt-2">{graveyard['0']}</Badge></span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>Exile <Badge color="danger" className="float-right mt-2">{exile['0']}</Badge></span>
                  </Col>
                </Row>
              </Col>
              <Col>

              </Col>
              <Col>
                <Row>
                  <Col>
                    <span>Bag <Badge color="success" className="float-right mt-2">{bags['1']}</Badge></span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>Draw <Badge color="primary" className="float-right mt-2">{draw['1']}</Badge></span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>Action <Badge color="primary" className="float-right mt-2">{actions['1']}</Badge></span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>Graveyard <Badge color="warning" className="float-right mt-2">{graveyard['1']}</Badge></span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>Exile <Badge color="danger" className="float-right mt-2">{exile['1']}</Badge></span>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <Grid rows={8} cols={8} onClick={this.onClickBoard} colorMap={boardColorMap} >
                  {board}
                </Grid>
              </Col>
            </Row>
          </Col>
          <Col xs={3}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <div className="text-center">
                      <span>Hand</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Grid rows={1} cols={5} onClick={this.onClickHand} colorMap={handColorMap['1']} style={handStyle}>
                      {hands['1']}
                    </Grid>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col>
                <Row>
                  <Col>
                    <div className="text-center">
                      <span>Field</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Grid rows={fields['1'].length} cols={5} onClick={this.onClickField}  colorMap={fieldColorMap['1']} style={fieldStyle}>
                      {fields['1']}
                    </Grid>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}