import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import Menu from '../components/menu';
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

    this.onClearSelection = this.onClearSelection.bind(this);
    this.onAction  = this.onAction.bind(this);
    this.onActionTarget = this.onActionTarget.bind(this);
    this.onSkipPhase = this.onSkipPhase.bind(this);
    this.onSelection = this.onSelection.bind(this);
    this.onPlacement = this.onPlacement.bind(this);
    this.onMove = this.onMove.bind(this);

    this.state = {
      selection: null,
    };
  }

  onClearSelection() {
    this.setState({ selection: null });
  }

  onSkipPhase() {
    this.props.moves.skip();
  }

  onAction(event) {
    if(event.action.targeting) {
      this.setState({ selection: event });
    } else {
      this.props.moves.action(event);
      this.setState({ selection: null });
    }
  }

  onActionTarget(event) {
    this.props.moves.action(this.state.selection, event);
    this.setState({ selection: null });
  }

  onSelection(event) {
    this.setState({ selection: event });
  }

  onPlacement(event) {
    this.props.moves.placement(this.state.selection, event);
    this.setState({ selection: null });
  }

  onMove(source, destination) {
    this.props.moves.movement(source, destination);
    this.setState({ selection: null });
  }
  
  getMenuButtons() {
    let buttons = [];

    let validPlay = this.props.isActive && this.props.G.rules.passPlay && this.props.ctx.phase === 'play';
    let validMove = this.props.isActive && this.props.G.rules.passMove && this.props.ctx.phase === 'move';
    if(validPlay || validMove) {
      let color = this.props.G.rules.freePass ? 'success' : 'warning';
      buttons.push(<Button key={'skip'} color={color} onClick={this.onSkipPhase}>Pass</Button>);
    }

    return buttons;
  }

  render() {
    let buttons = this.getMenuButtons();
    let menu = React.createElement(Menu, this.props, buttons);

    let fieldParams = {
      selection: this.state.selection,
      onSelection: this.onSelection,
      onMove: this.onMove,
      onPlacement: this.onPlacement,
      onAction: this.onActionTarget,
    };
    let field = React.createElement(Field, { ...fieldParams, ...this.props});

    let handParams = {
      selection: this.state.selection,
      onSelection: this.onSelection
    };
    let hand = React.createElement(Hand, { ...handParams, ...this.props});

    let helpParams = { 
      selection: this.state.selection,
      onClearSelection: this.onClearSelection,
      onAction: this.onAction,
    };
    let help = React.createElement(Help, { ...helpParams, ...this.props});

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
            <Col xs="6">
              { hand }
            </Col>
            <Col xs="6">
              { help }
            </Col>
           </Row>
        </Navbar>
      </section>
    );
  }
}

export default withRouter(PlayView);