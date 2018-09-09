import React from 'react';
import PropTypes from 'prop-types';
import {
  CubitText
} from './cubits';

// Bootstrap
import { 
  Container, Row, Col,
  Navbar, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';

// UI
import { 
  Token, Grid
} from 'boardgame.io/ui';

// Logic
import {
  DIMENSIONS
} from '../game/common';

import {
  GameLogic
} from '../game/logic';

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    events: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
    table: PropTypes.any.isRequired,
    controller: PropTypes.string,
    location: PropTypes.any.isRequired,
    onClick:  PropTypes.any.isRequired,
  };

  constructor(params) {
    super(params);

    // UI
    this.style = { strokeWidth: 0.05, stroke: '#fff' };
    this.teams = {'0': 'w', '1': 'b'};
    this.backgroundColor = '#959595';
    this.whiteColor = '#817F7F';
    this.backColor = '#ABAAAA';
  }

  onClick = ({x, y}) => {
    this.props.onClick({l:this.props.location, c: this.props.controller, x:x, y:y});
  }
  
  render() {
    let name = this.props.location.name;

    let count = this.props.location.getCollection(this.props.G, this.props.ctx, this.props.controller).filter(e => e != null).length;
    let badge = <span className="badge badge-secondary float-right">{count}</span>;

    let hidden = this.props.location.isHidden(this.props.G, this.props.ctx, this.props.controller, this.props.playerID);
    if(hidden) {
      return (
        <div style={{margin: 3}}>
          <h5>{name} {badge}</h5>
        </div>
      )
    } else {

      let tokens = [];
      let background = {};
      
      let size = this.props.location.getSize(this.props.G, this.props.ctx, this.props.controller);
      for (let x = 0; x < size.width; x++) {
        for (let y = 0; y < size.height; y++) {
          background[`${x},${y}`] = ((x + y) % 2 === 0) ? this.whiteColor : this.backColor;

          let entity = this.props.location.getItem(this.props.G, this.props.ctx, this.props.controller, x, y);
          if(entity) {
            let team = this.teams[entity.ownership];
            let cubit = <CubitText name={entity.name} value={entity.alias} team={team} color={entity.color} />;
            let token = <Token key={entity.id} x={x} y={y}>{cubit}</Token>;
            tokens.push(token);
          }
        }
      }

      let params = {
        rows: size.height,
        cols: size.width,
        onClick: this.onClick,
        style: this.style,
        colorMap: background,
      };

      let grid = size.height === 0 ? null : React.createElement(Grid, params, tokens);

      let wrapperStyling = null;
      if(this.props.location.dimensions === DIMENSIONS.Single) {
        wrapperStyling = { margin: 3, overflowY: 'auto', maxHeight: 90 };
      } else if(this.props.location.dimensions === DIMENSIONS.Small) {
        wrapperStyling = { margin: 3, overflowY: 'auto', maxHeight: 125 };
      } else if(this.props.location.dimensions === DIMENSIONS.Medium) {
        wrapperStyling = { margin: 3, overflowY: 'auto', maxHeight: 300 };
      } else if(this.props.location.dimensions === DIMENSIONS.Large) {
        wrapperStyling = { margin: 3, overflowY: 'auto', maxHeight: 1000 };
      }

      return (
        <div style={wrapperStyling}>
          <h5>{name} {badge}</h5>
          {grid}
        </div>
      )
    }
  }
}

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
      selection: null
    };
  }
  
  onClick = ({ l, c, x, y }) => {
    alert(`${c}:(${x},${y})`);
  }

  render() {
    let logic = new GameLogic();

    let field = React.createElement(Board, {...this.props, table: this, controller: null, location: logic.locations.field, onClick: this.onClick });
    let arena = React.createElement(Board, {...this.props, table: this, controller: null, location: logic.locations.arena, onClick: this.onClick });

    let units = {
      "0": React.createElement(Board, {...this.props, table: this, controller: '0', location: logic.locations.units, onClick: this.onClick }),
      "1": React.createElement(Board, {...this.props, table: this, controller: '1', location: logic.locations.units, onClick: this.onClick }),
    };
    let hands = {
      "0": React.createElement(Board, {...this.props, table: this, controller: '0', location: logic.locations.hands, onClick: this.onClick }),
      "1": React.createElement(Board, {...this.props, table: this, controller: '1', location: logic.locations.hands, onClick: this.onClick }),
    };
    let avatars = {
      "0": React.createElement(Board, {...this.props, table: this, controller: '0', location: logic.locations.avatars, onClick: this.onClick }),
      "1": React.createElement(Board, {...this.props, table: this, controller: '1', location: logic.locations.avatars, onClick: this.onClick }),
    };
    let bags = {
      "0": React.createElement(Board, {...this.props, table: this, controller: '0', location: logic.locations.bags, onClick: this.onClick }),
      "1": React.createElement(Board, {...this.props, table: this, controller: '1', location: logic.locations.bags, onClick: this.onClick }),
    };
    let exiles = {
      "0": React.createElement(Board, {...this.props, table: this, controller: '0', location: logic.locations.exiles, onClick: this.onClick }),
      "1": React.createElement(Board, {...this.props, table: this, controller: '1', location: logic.locations.exiles, onClick: this.onClick }),
    };
    let afterlifes = {
      "0": React.createElement(Board, {...this.props, table: this, controller: '0', location: logic.locations.afterlifes, onClick: this.onClick }),
      "1": React.createElement(Board, {...this.props, table: this, controller: '1', location: logic.locations.afterlifes, onClick: this.onClick }),
    };

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
          <Col xs="2">
            { bags['0'] }          
            { hands['0'] }
            { avatars['0'] }
            <hr />
            { exiles['0'] }
            { afterlifes['0'] }
          </Col>
          <Col xs="2">
            { units['0'] }
          </Col>
          <Col xs="4">
            <Row>
              <Col>
                <div style={{width: '15%'}}>
                  { arena }
                </div>         
              </Col>
            </Row>
            <Row>
              <Col>
                { field }
              </Col>
            </Row>
          </Col>
          <Col xs="2">
            { units['1'] }
          </Col>
          <Col xs="2">
          { bags['1'] }          
          { hands['1'] }
          { avatars['1'] }
          <hr />
          { exiles['1'] }
          { afterlifes['1'] }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GameTable;