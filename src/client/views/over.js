import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import { EventLog } from '../components/events';
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

    this.onRematch = this.onRematch.bind(this);
    this.onNewMatch = this.onNewMatch.bind(this);
    this.onQuit = this.onQuit.bind(this);
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

  onQuit() {
    let url = "/";
    this.props.history.push(url);
  }

  render() {
    let menu = React.createElement(Menu, this.props);
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

        <Modal isOpen={true} >
          <ModalHeader>Game Over <small>{ whom } Wins!</small></ModalHeader>
          <ModalBody>
            <EventLog log={this.props.G.log}></EventLog>
            <br />
            <Button className="btn-block" color="primary" onClick={this.onRematch}>Rematch</Button>
            <Button className="btn-block" color="primary" onClick={this.onNewMatch}>New Match</Button>
            <br />
            <Button className="btn-block" color="secondary" onClick={this.onQuit}>Quit</Button>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </section>
    );
  }

}

export default withRouter(OverView);