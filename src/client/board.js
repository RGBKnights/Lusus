import React from 'react';
import PropTypes from 'prop-types';
import {
  // CubitText
} from './cubits';

// Bootstrap
import { 
  Container, 
  // Row, Col,
  Navbar, NavbarBrand, Nav, NavItem, NavLink, 
  Button,
  Badge
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
    // let autoSizeSquare = (window.innerHeight - 60) / 8;
    let sizeSquare = 50;
    let w = width * sizeSquare;

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
    let elementRoyals = React.createElement(Grid, this.getGridParams(3,8), []);
    let elementCommons = React.createElement(Grid, this.getGridParams(3,8), []);
    let elementHand = React.createElement(Grid, this.getGridParams(1,5), []);
    let elementAvatar = React.createElement(Grid, this.getGridParams(1,5), []);

    return (
      <section>
        <div>
          <Container fluid className="p-0">
            <Navbar color="dark" dark expand="md" className="rounded-bottom p-0">
              <NavbarBrand className="p-0">
                <img className="p-1"  height="32" src="/favicon.ico" alt="Logo"></img>
                <strong className="p-1">Lusus</strong>
                <small>Tactical Chess</small>
                </NavbarBrand>
              <Nav navbar>
                <NavItem>
                  <NavLink className="p-1 bg-success text-white rounded">Player 1</NavLink>
                </NavItem>
              </Nav>
              <Nav className="p-1 ml-auto list-inline">
                <NavItem className="list-inline-item">
                  <NavLink className="p-1 bg-warning text-white rounded">Skip</NavLink>
                </NavItem>
                <NavItem className="list-inline-item">
                  <NavLink className="p-1 bg-warning text-white rounded">Pass</NavLink>
                </NavItem>
              </Nav>
              <Nav className="p-1 ml-auto list-inline">
                <NavItem className="list-inline-item">
                  <NavLink className=" p-1 bg-secondary text-white rounded">Afterlife</NavLink>
                </NavItem>
                <NavItem className="list-inline-item">
                  <NavLink className="p-1 bg-secondary text-white rounded">Arena</NavLink>
                </NavItem>
              </Nav>
            </Navbar>
          </Container>
        </div>
        <div className="horizontal-warper">
          <div className="horizontal-section-content">
            <div className="p-1">
              <Badge>Draws</Badge> <span className="float-right">3</span>
              <br />
              <Badge>Actions</Badge> <span className="float-right">1</span>
              <br />
              <Badge>Bag</Badge> <span className="float-right">30</span>
            </div>
            <div className="horizontal-warper">
              <div className="horizontal-section-content">
                <div className="text-center">
                  <Badge>Hand</Badge>
                </div>
                { elementHand }
              </div>
              <div className="horizontal-section-content">
                <div className="text-center">
                  <Badge>Player</Badge>
                </div>
                { elementAvatar }
              </div>
            </div>
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Badge>Board</Badge>
            </div>
            { elementGrid }
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Badge>Commons</Badge>
            </div>
            { elementCommons }
          </div>
          <div className="horizontal-section-content">
            <div className="text-center">
              <Badge>Royals</Badge>
            </div>
            { elementRoyals }
          </div>
        </div>
      </section>
    );
  }
}

export default GameTable;