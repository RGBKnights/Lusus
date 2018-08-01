// Framework
import React from 'react';
import PropTypes from 'prop-types';
// UI
import { Container, Row, Col, Alert, Badge } from 'reactstrap';
import { Token, Grid } from 'boardgame.io/ui';
// Cubits
import Cubes from './cubits/cubes';
import Text from './cubits/text';
// Units
import King from './units/king';
import Bishop from './units/bishop';
import Knight from './units/knight';
import Rook from './units/rook';
import Queen from './units/queen';
import Pawn from './units/pawn';

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
    /*
    https://github.com/google/boardgame.io/issues/245
    Patch: React.js ln:2666
    With:
    if(debug) {
      rest = objectWithoutProperties(rest, ['playerID']);
    }
    */

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
          hands[p].push(<Token key={i} x={i} y={0}><Text color={teams[p]} value={player.hand[i]} /></Token>);
        }
      } else {
        for (let i = 0; i < cardsInHand; i++) {
          hands[p].push(<Token key={i} x={i} y={0}><Cubes color={teams[p]} /></Token>);
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
        
        fieldColorMap[p][`${0},${a}`] = colors[p];

        if(unit.type === 'R') {
          fields[p].push(<Token key={fieldKey++} x={0} y={a}><Rook color={teams[p]} /></Token>);
          board.push(<Token  key={boardKey++} x={unit.x} y={unit.y} animate={true}><Rook color={teams[p]} /></Token>);
        } else if(unit.type === 'N') {
          fields[p].push(<Token key={fieldKey++} x={0} y={a}><Knight color={teams[p]} /></Token>);
          board.push(<Token key={boardKey++} x={unit.x} y={unit.y} animate={true}><Knight color={teams[p]} /></Token>);
        } else if(unit.type === 'B') {
          fields[p].push(<Token key={fieldKey++} x={0} y={a}><Bishop color={teams[p]} /></Token>);
          board.push(<Token key={boardKey++} x={unit.x} y={unit.y} animate={true}><Bishop color={teams[p]} /></Token>);
        } else if(unit.type === 'K') {
          fields[p].push(<Token key={fieldKey++} x={0} y={a}><King color={teams[p]} /></Token>);
          board.push(<Token key={boardKey++} x={unit.x} y={unit.y} animate={true}><King color={teams[p]} /></Token>);
        } else if(unit.type === 'Q') {
          fields[p].push(<Token key={fieldKey++} x={0} y={a}><Queen color={teams[p]} /></Token>);
          board.push(<Token key={boardKey++} x={unit.x} y={unit.y} animate={true}><Queen color={teams[p]} /></Token>);
        } else if(unit.type === 'P') {
          fields[p].push(<Token key={fieldKey++} x={0} y={a}><Pawn color={teams[p]} /></Token>);
          board.push(<Token key={boardKey++} x={unit.x} y={unit.y} animate={true}><Pawn color={teams[p]} /></Token>);
        }

        for (let b = 0; b < unit.slots.length; b++) {
          const cubitix = unit.slots[b];
          if(cubitix) {
            let x = b+1;
            fields[p].push(<Token key={fieldKey++} x={x} y={a} ><Text color={teams[p]} value={cubitix} /></Token>); 
          }
        }

        for (let c= 0; c < unit.limit; c++) {
          let x = c+1;
          fieldColorMap[p][`${x},${a}`] = colors[p];
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
        <hr />
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
        <hr />
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
            <hr />
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
            <hr />
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