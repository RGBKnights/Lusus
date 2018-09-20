import React from 'react';
import PropTypes from 'prop-types';
import {
  // CubitText
} from './cubits';

// Bootstrap
import { 
  Container, Row, Col,
  Navbar, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';

// UI
import { 
  // Token, Grid
} from 'boardgame.io/ui';


const COLORS = {
  Unknown: '#FF69B4',
  Background: '#959595',
  CheckboardWhite: '#817F7F',
  CheckboardBlack: '#ABAAAA',
  Selection: '#4E9334',
  Passive: '#BE8E3F',
  Agressive: '#B63C4B',
  Play: '#BE8E3F',
};


class GameTable extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    events: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
  };

  constructor(params) {
    super(params);

    this.state = {
      source: null
    };
  }
  

  render() {
    
    let player = Number(this.props.playerID) + 1;
    let navPlayer = this.props.playerID ? <NavLink>Player {player}</NavLink> : <NavLink>Spectator</NavLink>;

    return (
      <Container fluid>
        <Row>
          <Col>
            <Navbar color="dark" dark expand="md">
              <NavbarBrand href="/">Lusus <small>Tactical Chess</small></NavbarBrand>
              <Nav className="ml-auto rounded-bottom" navbar>
                <NavItem>
                  { navPlayer }
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <Row>
          { /* Put Game Here */}
        </Row>
      </Container>
    );
  }
}

export default GameTable;