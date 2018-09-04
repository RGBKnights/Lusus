import React from 'react';
import PropTypes from 'prop-types';

// Bootstrap
import { 
  Container,Row, Col, 
  Navbar, NavbarBrand, Nav, NavItem
} from 'reactstrap';

// UI
import { Token, Grid } from 'boardgame.io/ui';

// Logic
import { getCubitsFromGameState } from '../game/cubits';

class GameBoard extends React.Component {
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
    
    this.backgroundColor = '#959595';
    this.whiteColor = '#817F7F';
    this.backColor = '#ABAAAA';
    this.selectedColor = '#4E9334';
    this.passiveMoveColor = '#4E9334';
    this.captureMoveColor = '#BE8E3F';
  }

  render() {
    // let connected = (this.props.isMultiplayer && this.props.isConnected);

    let cubits = getCubitsFromGameState(this.props.G);

    // c.ownership - Colour (Black vs White)
    // c.controller - player (0 vs 1)
    // c.locations[] - where

    // Make new components for CheckerBoard (w,h) and StaticBoard (w,h)

    return (
      <Container fluid>
        <Row>
          <Col>
            <Navbar color="dark" dark expand="md">
              <NavbarBrand href="/">Lusus <small>Tactical Chess</small></NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            {/* onClick={this.onClickArena} colorMap={arenaColorMap} */}
            <Grid rows={8} cols={8} colorMap={{'0,0': this.backColor}}>
            </Grid>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GameBoard;