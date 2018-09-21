import React from 'react';
import PropTypes from 'prop-types';
import {
  // CubitText
} from './cubits';

// Bootstrap
import { 
  Container, Row, Col,
  Navbar, NavbarBrand, Nav, NavItem, NavLink, Button
} from 'reactstrap';

// UI
import { 
  //Token, 
  Grid
} from 'boardgame.io/ui';

/*
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
*/

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

  getSpace() {
    return " ";
  }

  getPlayerElement() {
    let color = this.props.isMultiplayer && this.props.isConnected ? "primary" : "danger";
    return this.props.playerID ? <Button color={color}>Player {Number(this.props.playerID) + 1}</Button> : <Button color={color}>Spectator</Button>;
  }

  getGridParams(width, height) {
    let autoSizeSquare = (window.innerHeight - 130) / 8;
    let sizeSquare = 60;
    let w = width * autoSizeSquare;

    let background = {};
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        background[`${x},${y}`] = ((x + y) % 2 === 0) ? '#817F7F' : '#ABAAAA' 
      }
    }

    let params = {
      rows: height,
      cols: width,
      colorMap: background,
      style: { width: w, strokeWidth: 0.05, stroke: '#000000' },
    };
    return params;
  }
  
  render() {
    let elementGrid = React.createElement(Grid, this.getGridParams(8,8), []);
    let elementRoyals = React.createElement(Grid, this.getGridParams(1,8), []);
    let elementCommons = React.createElement(Grid, this.getGridParams(1,8), []);
    let elementRoyalsField = React.createElement(Grid, this.getGridParams(4,8), []);
    let elementCommonsField = React.createElement(Grid, this.getGridParams(2,8), []);

    let elementHand = React.createElement(Grid, this.getGridParams(1,5), []);
    let elementAvatar = React.createElement(Grid, this.getGridParams(1,5), []);

    return (
      <section >
        <div style={{height: 60}}>
          <Container fluid className="p-0">
            <Navbar color="dark" dark expand="md" className="rounded-bottom">
              <NavbarBrand href="/">Lusus <small>Tactical Chess</small></NavbarBrand>
              <Nav navbar>
                <NavItem>
                  <NavLink>Test Left</NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink>Test Right</NavLink>
                </NavItem>
              </Nav>
            </Navbar>
          </Container>
        </div>
        <div className="horizontal-warper">
          <div className="horizontal-section-content">
            <div className="text-center">
              <Button>Hand</Button>
            </div>
            { elementHand }
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Button>Player</Button>
            </div>
            { elementAvatar }
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Button>Commons</Button>
            </div>
            { elementCommons }
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Button>Common Field</Button>
            </div>
            { elementCommonsField }
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Button>Royals</Button>
            </div>
            { elementRoyals }
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Button>Royals Field</Button>
            </div>
            { elementRoyalsField }
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Button>Board</Button>
            </div>
            { elementGrid }
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Button>Royals Field</Button>
            </div>
            { elementRoyalsField }  
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Button>Royals</Button>
            </div>
            { elementRoyals }   
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Button>Commons Field</Button>
            </div>
            { elementCommonsField }  
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Button>Commons</Button>
            </div>
            { elementCommons }
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Button>Player</Button>
            </div>
            { elementAvatar }
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Button>Hand</Button>
            </div>
            { elementHand }
          </div>
        </div>
      </section>
    );
  }
}

export default GameTable;