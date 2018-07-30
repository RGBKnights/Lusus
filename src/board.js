// Framework
import React from 'react';
import PropTypes from 'prop-types';
// UI
import { Container, Row, Col, Alert } from 'reactstrap';
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
      <Alert color="success" style={{marginTop: 10}}><strong>Connected!</strong></Alert>
    );
  } else {
    return (
      <Alert color="danger" style={{marginTop: 10}}><strong>Disconnected!</strong></Alert>
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

  onClick = ({ x, y }) => {
    
  };

  render() {
    let connected = (this.props.isMultiplayer && this.props.isConnected);

    let boardColorMap = {};
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const key = `${x},${y}`;
        let color = ((x + y) % 2 === 0) ? '#ABAAAA' : '#4E4D4D';
        boardColorMap[key] = color;
      }
    }

    let fieldWhiteColorMap = {};
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 20; y++) {
        const key = `${x},${y}`;
        fieldWhiteColorMap[key] = '#4E4D4D';
      }
    }

    let fieldBlackColorMap = {};
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 20; y++) {
        const key = `${x},${y}`;
        fieldBlackColorMap[key] = '#ABAAAA';
      }
    }

    let handStyle = {strokeWidth:0.05,stroke:'#fff', height: 70};
    let fieldStyle = {strokeWidth:0.05,stroke:'#fff'};

    let teams = ['w', 'b'];
    let hands = {
      '0': [],
      '1': []
    };

    for (const p in hands) {
      const player = this.props.G.players[p];
      if (player)  {
        for (let i = 0; i < player.hand.length; i++) {
          hands[p].push(<Token key={i} x={i} y={0}><Text color={teams[p]} value={player.hand[i]} /></Token>);
        }
      } else {
        for (let i = 0; i < 5; i++) {
          hands[p].push(<Token key={i} x={i} y={0}><Cubes color={teams[p]} /></Token>);
        }
      }
    }

    let board = [];
    let fields = {
      '0': [],
      '1': []
    };
    for (const p in this.props.G.field) {
      const field = this.props.G.field[p];

      for (let a = 0; a < field.length; a++) {
        const unit = field[a];
        
        let slots = [];
      
        if(unit.type === 'R') {
          slots.push(<Token key={a} x={a} y={0}><Rook color={teams[p]} /></Token>);
          board.push(<Token key={a} x={unit.x} y={unit.y}><Rook color={teams[p]} /></Token>);
        } else if(unit.type === 'N') {
          slots.push(<Token key={a} x={a} y={0}><Knight color={teams[p]} /></Token>);
          board.push(<Token key={a} x={unit.x} y={unit.y}><Knight color={teams[p]} /></Token>);
        } else if(unit.type === 'B') {
          slots.push(<Token key={a} x={a} y={0}><Bishop color={teams[p]} /></Token>);
          board.push(<Token key={a} x={unit.x} y={unit.y}><Bishop color={teams[p]} /></Token>);
        } else if(unit.type === 'K') {
          slots.push(<Token key={a} x={a} y={0}><King color={teams[p]} /></Token>);
          board.push(<Token key={a} x={unit.x} y={unit.y}><Bishop color={teams[p]} /></Token>);
        } else if(unit.type === 'Q') {
          slots.push(<Token key={a} x={a} y={0}><Queen color={teams[p]} /></Token>);
          board.push(<Token key={a} x={unit.x} y={unit.y}><Bishop color={teams[p]} /></Token>);
        } else if(unit.type === 'P') {
          slots.push(<Token key={a} x={a} y={0}><Pawn color={teams[p]} /></Token>);
          board.push(<Token key={a} x={unit.x} y={unit.y}><Pawn color={teams[p]} /></Token>);
        }

        for (let b = 0; b < unit.slots.length; b++) {
          const cubit = unit.slots[b];
          slots.push(<Token key={b} x={b} y={0} ><Text color={teams[p]} value={cubit} /></Token>); 
        }

        fields[p].push(slots);
      }
    }
    
    return (
      <Container>
        <Row>
          <Col xs="2">
            <h1>Lusus</h1>
          </Col>
          <Col></Col>
          <Col xs="2">
            <div className="text-center">
              <ConnectionStatus connected={connected}></ConnectionStatus>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="2"></Col>
          <Col>
            <Grid rows={8} cols={8} onClick={this.onClick} colorMap={boardColorMap} >
              <Token x={0} y={7}>
                <Rook color="w" />
              </Token>
              <Token x={1} y={7}>
                <Knight color="w" />
              </Token>
              <Token x={2} y={7}>
                <Bishop color="w" />
              </Token>
              <Token x={3} y={7}>
                <Queen color="w" />
              </Token>
              <Token x={4} y={7}>
                <King color="w" />
              </Token>
              <Token x={5} y={7}>
                <Bishop color="w" />
              </Token>
              <Token x={6} y={7}>
                <Knight color="w" />
              </Token>
              <Token x={7} y={7}>
                <Rook color="w" />
              </Token>
              <Token x={0} y={6}>
                <Pawn color="w" />
              </Token>
              <Token x={1} y={6}>
                <Pawn color="w" />
              </Token>
              <Token x={2} y={6}>
                <Pawn color="w" />
              </Token>
              <Token x={3} y={6}>
                <Pawn color="w" />
              </Token>
              <Token x={4} y={6}>
                <Pawn color="w" />
              </Token>
              <Token x={5} y={6}>
                <Pawn color="w" />
              </Token>
              <Token x={6} y={6}>
                <Pawn color="w" />
              </Token>
              <Token x={7} y={6}>
                <Pawn color="w" />
              </Token>
              <Token x={0} y={0}>
                <Rook color="b" />
              </Token>
              <Token x={1} y={0}>
                <Knight color="b" />
              </Token>
              <Token x={2} y={0}>
                <Bishop color="b" />
              </Token>
              <Token x={3} y={0}>
                <Queen color="b" />
              </Token>
              <Token x={4} y={0}>
                <King color="b" />
              </Token>
              <Token x={5} y={0}>
                <Bishop color="b" />
              </Token>
              <Token x={6} y={0}>
                <Knight color="b" />
              </Token>
              <Token x={7} y={0}>
                <Rook color="b" />
              </Token>
              <Token x={0} y={1}>
                <Pawn color="b" />
              </Token>
              <Token x={1} y={1}>
                <Pawn color="b" />
              </Token>
              <Token x={2} y={1}>
                <Pawn color="b" />
              </Token>
              <Token x={3} y={1}>
                <Pawn color="b" />
              </Token>
              <Token x={4} y={1}>
                <Pawn color="b" />
              </Token>
              <Token x={5} y={1}>
                <Pawn color="b" />
              </Token>
              <Token x={6} y={1}>
                <Pawn color="b" />
              </Token>
              <Token x={7} y={1}>
                <Pawn color="b" />
              </Token>
            </Grid>
          </Col>
          <Col xs="2"></Col>
        </Row>
        <Row>
          <Col xs="2"></Col>
          <Col>
            <div >
              <Row>
                <Col>
                  <div className="text-center">
                    <h3>Hand</h3>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Grid rows={1} cols={hands['0'].length} colorMap={fieldWhiteColorMap} style={handStyle}>
                    {hands['0']}
                  </Grid>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-center">
                    <h3>Field</h3>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>
                    <Grid rows={15} cols={5} colorMap={fieldWhiteColorMap} style={fieldStyle}>
                      <Token x={0} y={0}>
                        <Rook color="w" />
                      </Token>
                      <Token x={0} y={1}>
                        <Knight color="w" />
                      </Token>
                      <Token x={0} y={2}>
                        <Bishop color="w" />
                      </Token>
                      <Token x={0} y={3}>
                        <Queen color="w" />
                      </Token>
                      <Token x={0} y={4}>
                        <King color="w" />
                      </Token>
                      <Token x={0} y={5}>
                        <Bishop color="w" />
                      </Token>
                      <Token x={0} y={6}>
                        <Knight color="w" />
                      </Token>
                      <Token x={0} y={7}>
                        <Rook color="w" />
                      </Token>
                      <Token x={0} y={8}>
                        <Pawn color="w" />
                      </Token>
                      <Token x={0} y={9}>
                        <Pawn color="w" />
                      </Token>
                      <Token x={0} y={10}>
                        <Pawn color="w" />
                      </Token>
                      <Token x={0} y={11}>
                        <Pawn color="w" />
                      </Token>
                      <Token x={0} y={12}>
                        <Pawn color="w" />
                      </Token>
                      <Token x={0} y={13}>
                        <Pawn color="w" />
                      </Token>
                      <Token x={0} y={14}>
                        <Pawn color="w" />
                      </Token>
                      <Token x={0} y={15}>
                        <Pawn color="w" />
                      </Token>
                    </Grid>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-center">
                    <h3>Graveyard</h3>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-center">
                    <h3>Exile</h3>
                  </div>
                </Col>
              </Row>
            </div>

          </Col>
          <Col>
            <Row>
              <Col>
                <div className="text-center">
                  <h3>Hand</h3>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Grid rows={1} cols={hands['1'].length} colorMap={fieldBlackColorMap} style={handStyle}>
                  {hands['1']}
                </Grid>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-center">
                  <h3>Field</h3>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <Grid rows={15} cols={5} colorMap={fieldBlackColorMap} style={fieldStyle}>
                    <Token x={0} y={0}>
                      <Rook color="b" />
                    </Token>
                    <Token x={0} y={1}>
                      <Knight color="b" />
                    </Token>
                    <Token x={0} y={2}>
                      <Bishop color="b" />
                    </Token>
                    <Token x={0} y={3}>
                      <Queen color="b" />
                    </Token>
                    <Token x={0} y={4}>
                      <King color="b" />
                    </Token>
                    <Token x={0} y={5}>
                      <Bishop color="b" />
                    </Token>
                    <Token x={0} y={6}>
                      <Knight color="b" />
                    </Token>
                    <Token x={0} y={7}>
                      <Rook color="b" />
                    </Token>
                    <Token x={0} y={8}>
                      <Pawn color="b" />
                    </Token>
                    <Token x={0} y={9}>
                      <Pawn color="b" />
                    </Token>
                    <Token x={0} y={10}>
                      <Pawn color="b" />
                    </Token>
                    <Token x={0} y={11}>
                      <Pawn color="b" />
                    </Token>
                    <Token x={0} y={12}>
                      <Pawn color="b" />
                    </Token>
                    <Token x={0} y={13}>
                      <Pawn color="b" />
                    </Token>
                    <Token x={0} y={14}>
                      <Pawn color="b" />
                    </Token>
                    <Token x={0} y={15}>
                      <Pawn color="b" />
                    </Token>
                  </Grid>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-center">
                  <h3>Graveyard</h3>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-center">
                  <h3>Exile</h3>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs="2"></Col>
        </Row>
      </Container>
    );
  }
}