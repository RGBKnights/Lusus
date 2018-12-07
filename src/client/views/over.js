import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import { Menu } from '../components/menu';
import { Field } from '../components/field';

// Bootstrap
import {
  Container,
  Row, Col,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button
} from 'reactstrap';

const shortid = require('shortid');

class OverView extends React.Component {
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

    this.dialogToggle = this.dialogToggle.bind(this);
    this.onRematch = this.onRematch.bind(this);
    this.onNewMatch = this.onNewMatch.bind(this);

    this.state = {
      dialogOpen: true,
    };
  }


  dialogToggle() {
    this.setState({
      dialogOpen: !this.state.dialogOpen
    });
  }

  onRematch() {
    let opponent = this.props.playerID === "0" ? "1" : "0";
    let url = "/match/?p=" + opponent + "&m=" + this.props.G.next;
    this.props.history.push(url);
  }

  onNewMatch() {
    let url = "/match/?p=0&m=" + shortid.generate();
    this.props.history.push(url);
  }

  getMenuButtons() {
    let buttons = [];

    buttons.push(<Button size="sm" color="primary" onClick={this.onRematch}>Rematch</Button>);
    buttons.push(<Button size="sm" color="primary" onClick={this.onNewMatch}>New Match</Button>);

    return buttons;
  }

  render() {
    let buttons = this.getMenuButtons();
    let menu = React.createElement(Menu, this.props, buttons);
    let field = React.createElement(Field, this.props);
    let whom = this.props.ctx.gameover === '0' ? 'White' : 'Black';
    
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

        <Modal isOpen={this.state.dialogOpen} toggle={this.dialogToggle} >
          <ModalHeader>Game Over</ModalHeader>
          <ModalBody>
            <p>{ whom } Wins!</p>
          </ModalBody>
          <ModalFooter>
            { buttons }
            <Button color="secondary" onClick={this.dialogToggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </section>
    );
  }

}

export default withRouter(OverView);