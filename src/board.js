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
        let color = ((x + y) % 2 === 0) ? '#4E4D4D' : '#ABAAAA';
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

    let colors = ['#4E4D4D', '#ABAAAA'];
    let teams = ['w', 'b'];
    let hands = {
      '0': [],
      '1': []
    };

    for (const p in hands) {
      for (let i = 0; i < 5; i++) {
        handColorMap[p][`${i},${0}`] = colors[p];
      }

      const player = this.props.G.players[p];
      if (player)  {
        for (let i = 0; i < player.hand.length; i++) {
          hands[p].push(<Token key={i} x={i} y={0}><Text color={teams[p]} value={player.hand[i]} /></Token>);
        }
      } else {
        for (let i = 0; i < this.props.G.limits[p].draw; i++) {
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
    for (const p in this.props.G.field) {
      const field = this.props.G.field[p];

      for (let a = 0; a < field.length; a++) {
        const unit = field[a];
        
        fieldColorMap[p][`${0},${a}`] = colors[p];

        if(unit.type === 'R') {
          fields[p].push(<Token key={fieldKey++} x={0} y={a}><Rook color={teams[p]} /></Token>);
          board.push(<Token key={boardKey++} x={unit.x} y={unit.y}><Rook color={teams[p]} /></Token>);
        } else if(unit.type === 'N') {
          fields[p].push(<Token key={fieldKey++} x={0} y={a}><Knight color={teams[p]} /></Token>);
          board.push(<Token key={boardKey++} x={unit.x} y={unit.y}><Knight color={teams[p]} /></Token>);
        } else if(unit.type === 'B') {
          fields[p].push(<Token key={fieldKey++} x={0} y={a}><Bishop color={teams[p]} /></Token>);
          board.push(<Token key={boardKey++} x={unit.x} y={unit.y}><Bishop color={teams[p]} /></Token>);
        } else if(unit.type === 'K') {
          fields[p].push(<Token key={fieldKey++} x={0} y={a}><King color={teams[p]} /></Token>);
          board.push(<Token key={boardKey++} x={unit.x} y={unit.y}><King color={teams[p]} /></Token>);
        } else if(unit.type === 'Q') {
          fields[p].push(<Token key={fieldKey++} x={0} y={a}><Queen color={teams[p]} /></Token>);
          board.push(<Token key={boardKey++} x={unit.x} y={unit.y}><Queen color={teams[p]} /></Token>);
        } else if(unit.type === 'P') {
          fields[p].push(<Token key={fieldKey++} x={0} y={a}><Pawn color={teams[p]} /></Token>);
          board.push(<Token key={boardKey++} x={unit.x} y={unit.y}><Pawn color={teams[p]} /></Token>);
        }

        for (let b = 0; b < unit.slots.length; b++) {
          let x = b+1;
          fieldColorMap[p][`${x},${a}`] = colors[p];
          
          const cubit = unit.slots[b];
          if(cubit) {
            fields[p].push(<Token key={fieldKey++} x={x} y={a} ><Text color={teams[p]} value={cubit} /></Token>); 
          }
        }

      }
    }

    let bags = {
      '0': this.props.G.limits['0'].bag,
      '1': this.props.G.limits['1'].bag
    };

    let draw = {
      '0': this.props.G.limits['0'].draw,
      '1': this.props.G.limits['1'].draw
    };

    let actions = {
      '0': this.props.G.limits['0'].play,
      '1': this.props.G.limits['1'].play
    };

    let graveyard = {
      '0': this.props.G.graveyard['0'].length,
      '1': this.props.G.graveyard['1'].length
    };

    let exile = {
      '0': this.props.G.exile['0'].length,
      '1': this.props.G.exile['1'].length
    };
    
    return (
      <Container>
        <Row>
          <Col xs={2}>
            <h1>Lusus</h1>
          </Col>
          <Col>
            <h1 className="text-center">
              <small>Tactical Chess</small>
            </h1>
          </Col>
          <Col xs={2}>
            <div className="text-center">
              <ConnectionStatus connected={connected}></ConnectionStatus>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <Row>
              <Col>
                <h5>Bag <Badge color="primary" className="float-right mt-2">{bags['0']}</Badge></h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Draw <Badge color="primary" className="float-right mt-2">{draw['0']}</Badge></h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Action <Badge color="primary" className="float-right mt-2">{actions['0']}</Badge></h5>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h5 className="text-center">Hand</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <Grid rows={1} cols={5} colorMap={handColorMap['0']} style={handStyle}>
                  {hands['0']}
                </Grid>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h5 className="text-center">Field</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <Grid rows={15} cols={5} colorMap={fieldColorMap['0']} style={fieldStyle}>
                  {fields['0']}
                </Grid>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h5>Graveyard <Badge color="warning" className="float-right mt-2">{graveyard['0']}</Badge></h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Exile <Badge color="danger" className="float-right mt-2">{exile['0']}</Badge></h5>
              </Col>
            </Row>
          </Col>
          <Col>
            <Grid rows={8} cols={8} onClick={this.onClick} colorMap={boardColorMap} >
              {board}
            </Grid>
          </Col>
          <Col xs={2}>
          <Row>
              <Col>
                <h5>Bag <Badge color="primary" className="float-right mt-2">{bags['1']}</Badge></h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Draw <Badge color="primary" className="float-right mt-2">{draw['1']}</Badge></h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Action <Badge color="primary" className="float-right mt-2">{actions['1']}</Badge></h5>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h5 className="text-center">Hand</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <Grid rows={1} cols={5} colorMap={handColorMap['1']} style={handStyle}>
                  {hands['1']}
                </Grid>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h5 className="text-center">Field</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <Grid rows={15} cols={5} colorMap={fieldColorMap['1']} style={fieldStyle}>
                  {fields['1']}
                </Grid>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h5>Graveyard <Badge color="warning" className="float-right mt-2">{graveyard['1']}</Badge></h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Exile <Badge color="danger" className="float-right mt-2">{exile['1']}</Badge></h5>
              </Col>
            </Row>
          </Col>
          
        </Row>
      </Container>
    );
  }
}