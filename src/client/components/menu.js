import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import { toast } from 'react-toastify';

import { EventLog } from '../components/events';

import { FaClock, FaBolt, FaShoppingBag } from 'react-icons/fa';

// Bootstrap
import {
  Row, Col,
  Navbar,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';


export class Menu extends React.Component {
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
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onShare = this.onShare.bind(this);
    this.onForfeit = this.onForfeit.bind(this);
    this.onQuit = this.onQuit.bind(this);

    this.state = {
      modal: false
    };
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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

    toast("Added to clipboard");
  }

  onForfeit() {
    let opponent = this.props.playerID === "0" ? "1" : "0";
    this.props.events.endGame(opponent);
  }

  onQuit() {
    this.onForfeit();

    let url = "/";
    this.props.history.push(url);
  }

  render() {
    let defaults = {
      className: 'm-1'
    };

    const childern = React.Children.map(this.props.children, child => {
      let params = {...defaults, ...child.props};
      return React.cloneElement(child, params);
    });

    let phase = '';
    if(this.props.ctx.gameover) {
      phase = "Gameover";
    } else if (this.props.ctx.currentPlayer === this.props.playerID) {
      phase = "Your " + this.props.ctx.phase;
    } else {
      phase = "Opponents " + this.props.ctx.phase;
    }

    return (
    <div>
      <Navbar color="light" light expand="md" className="p-0 fixed-top rounded-bottom">
        <Row className="p-0 m-0" style={{width:'100%'}}>
          <Col className="p-1 m-0 d-none d-sm-block" sm="1" md="1" lg="1" xl="2">
            <img className="img-fluid" src="/favicon.ico" alt="Logo"></img>
            <h5 className="d-none d-xl-inline text-light">Lusus</h5>
          </Col>
          <Col className="p-1 m-0" xs="7" sm="5" md="4" lg="3" xl="2">
            <Button className="m-1 btn-block" color="secondary" disabled>
              <FaBolt className="icon-inline" /> { this.props.G.players[this.props.playerID].actions } &nbsp;
              <FaShoppingBag className="icon-inline" /> { this.props.G.players[this.props.playerID].bag.length } &nbsp;
              <FaClock className="icon-inline" /> { this.props.ctx.turn } &nbsp;
              { phase }
            </Button>
          </Col>
          <Col className="p-1 m-0" xs="4" sm="5" md="6" lg="7" xl="7">
            { childern }
          </Col>
          <Col className="p-1 m-0" xs="1" sm="1" md="1" lg="1" xl="1">
            <Button className="m-1 float-right" color="primary" onClick={this.toggle}><span className="navbar-toggler-icon"></span></Button>
          </Col>
        </Row>
      </Navbar>
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Menu</ModalHeader>
        <ModalBody>
          <EventLog log={this.props.G.log}></EventLog>
          <Button className="btn-block" color="primary" onClick={this.onShare}>Share</Button>
          <br />
          <Button className="btn-block" color="danger" onClick={this.onForfeit}>Forfeit</Button>
          <Button className="btn-block" color="danger" onClick={this.onQuit}>Quit</Button>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
    );
  }
}

export default withRouter(Menu);