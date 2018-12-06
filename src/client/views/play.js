import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import { Menu } from '../components/menu';
import { Field } from '../components/field';
import { Hand } from '../components/hand';
import { Help } from '../components/help';

// Bootstrap
import {
  Container,
  Row, Col,
  Navbar,
  Button
} from 'reactstrap';

class PlayView extends React.Component {
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

    this.onShare = this.onShare.bind(this);
    this.onSkipPhase = this.onSkipPhase.bind(this);
    this.onSelection = this.onSelection.bind(this);
    this.onPlacement = this.onPlacement.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onHelp = this.onHelp.bind(this);

    this.state = {
      selection: null,
      help: null,
    };
  }

  onShare() {
    let code = this.props.gameID;
    let opponent = this.props.playerID === "0" ? "1" : "0";
    
    const el = document.createElement('textarea');
    el.value = opponent + "-" + code;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  onSkipPhase() {
    // this.props.events.endGame(this.props.playerID);
    this.props.moves.skip();
  }

  onSelection(event) {
    if(event.cubit) {
      this.setState({ selection: event });
    } else {
      this.setState({ selection: null });
    }
  }

  onHelp(cubit) {
    if(!this.state.selection) {
      this.setState({ help: cubit });
    }
  }

  onPlacement(event) {
    this.props.moves.placement(this.state.selection, event);
    this.setState({ selection: null });
  }

  onMove(source, destination) {
    this.props.moves.movement(source, destination);
  }

  getMenuButtons() {
    let buttons = [];

    let validPlay = this.props.isActive && this.props.G.rules.passPlay && this.props.ctx.phase === 'play';
    let validMove = this.props.isActive && this.props.G.rules.passMove && this.props.ctx.phase === 'move';
    if(validPlay || validMove) {
      let color = this.props.G.rules.freePass ? 'success' : 'warning';
      buttons.push(<Button size="sm" color={color} onClick={this.onSkipPhase}>Pass</Button>);
    }

    buttons.push(<Button size="sm" color="primary" onClick={this.onShare}>Share</Button>);

    return buttons;
  }

  render() {
    let buttons = this.getMenuButtons();
    let menu = React.createElement(Menu, this.props, buttons);

    let fieldParams = {
      selection: this.state.selection,
      onMove: this.onMove,
      onPlacement: this.onPlacement,
      onHelp: this.onHelp
    };
    let field = React.createElement(Field, { ...fieldParams, ...this.props});

    let handParams = {
      selection: this.state.selection,
      onSelection: this.onSelection,
      onHelp: this.onHelp
    };
    let hand = React.createElement(Hand, { ...handParams, ...this.props});

    let helpParams = { 
      selection: this.state.help,
      playerID: this.props.playerID
    };
    let help = React.createElement(Help, helpParams);

    return (
      <section>
        { menu }

        <Container fluid className="gameboard">
          <Row>
            <Col>
              { field }
            </Col>
          </Row>
        </Container>
        
        <Navbar color="light" light expand="md" className="p-0 fixed-bottom rounded-bottom">
          <Row className="p-1 " style={{width:'100%'}}>
            <Col xs="4">
              { hand }
            </Col>
            <Col xs="8">
              { help }
            </Col>
           </Row>
        </Navbar>
      </section>
    );
  }
}

export default withRouter(PlayView);