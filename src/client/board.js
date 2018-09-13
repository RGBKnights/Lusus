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
  DIMENSIONS,
  // LOCATIONS,
  // CLASSIFICATIONS,
  // MOVEMENT_CONSTRAINTS,
  LOCATIONS,
  TARGET_TYPES
  // Entity
} from '../game/common';

import {
  getLocations
} from '../game/locations';

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
    controller: PropTypes.string,
    location: PropTypes.any.isRequired,
    table: PropTypes.any.isRequired,
  };

  constructor(params) {
    super(params);

    // UI
    this.style = { strokeWidth: 0.05, stroke: '#000000' };
    this.teams = {'0': 'w', '1': 'b'};
  }

  onClick = ({x, y}) => {
    if(this.props.playerID === null) {
      return;
    }
    if(this.props.isActive === false) {
      return;
    }

    this.props.table.onClick({l:this.props.location, c: this.props.controller, x:x, y:y});
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
          background[`${x},${y}`] = ((x + y) % 2 === 0) ? COLORS.CheckboardWhite : COLORS.CheckboardBlack 

          let entity = this.props.location.getItem(this.props.G, this.props.ctx, this.props.controller, x, y);
          if(entity) {
            let team = this.teams[entity.ownership];
            let cubit = <CubitText name={entity.name} value={entity.alias} team={team} color={entity.color} />;
            let token = <Token key={entity.id} x={x} y={y}>{cubit}</Token>;
            tokens.push(token);
          }

          if(this.props.table.state.source && entity && this.props.table.state.source.e.id === entity.id) {
            background[`${x},${y}`] = COLORS.Selection;
          }

          if(this.props.table.state.targets) {
            for (let i = 0; i < this.props.table.state.targets.length; i++) {
              const target = this.props.table.state.targets[i];

              if(
                target.l === this.props.location.type && 
                (this.props.controller == null || target.c === this.props.controller) &&
                target.x === x && 
                target.y === y
              ){
                if(target.t === TARGET_TYPES.Agressive) {
                  background[`${x},${y}`] = COLORS.Agressive;
                } else if(target.t === TARGET_TYPES.Passive) {
                  background[`${x},${y}`] = COLORS.Passive;
                } else if(target.t === TARGET_TYPES.Play) {
                  background[`${x},${y}`] = COLORS.Play;
                } else {
                  background[`${x},${y}`] = COLORS.Unknown;
                }
              }
            }
          }
        }
      }

      let height = null;
      if(this.props.location.dimensions === DIMENSIONS.Tiny) {
        height = 50;
      } else if(this.props.location.dimensions === DIMENSIONS.Single) {
        height = 70;
      } else if(this.props.location.dimensions === DIMENSIONS.Small) {
        height = 150;
      } else if(this.props.location.dimensions === DIMENSIONS.Medium) {
        height = 300;
      } else if(this.props.location.dimensions === DIMENSIONS.Large) {
        height = window.innerHeight * 0.9;
      }
      let style = {...this.style, maxHeight: height };

      let params = {
        rows: size.height,
        cols: size.width,
        onClick: this.onClick,
        style: style,
        colorMap: background,
      };

      let grid = size.height === 0 ? null : React.createElement(Grid, params, tokens);

      return (
        <div style={{margin: 3}}>
          <h5>{name} {badge}</h5>
          {grid}
        </div>
      )
    }
  }
}

class PlayerSummary extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    events: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
    controller: PropTypes.string,
    table: PropTypes.any.isRequired,
  };
  
  render() {
    let draws = this.props.G.players[this.props.controller].draws;
    let actions = this.props.G.players[this.props.controller].actions.total;

    let badgeDraws = <span className="badge badge-secondary float-right">{draws}</span>;
    let badgeActions = <span className="badge badge-secondary float-right">{actions}</span>;

    let summary = [];
    summary.push(<div key={0} style={{margin: 3}}><h5>Draws {badgeDraws}</h5></div>);
    summary.push(<div key={1} style={{margin: 3}}><h5>Actions {badgeActions}</h5></div>);

    return (
      <div>
        {summary}
      </div>
    )
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
      source: null, // ID of Cubit
      targets: null,
    };
  }
  
  onClick = ({ l, c, x, y }) => {
    // alert(`Player(${c}):${l.name}@(${x},${y})`);

    let e = l.getItem(this.props.G, this.props.ctx, c, x, y);

    if(this.state.source == null && e && e.activatable) {
      // Activation / Consumable
      /* eslint no-restricted-globals: 0 */
      if(confirm("Activate Cubit?")) {
        alert("Finish: activateCubit()");
        // this.props.moves.activateCubit(this.state.source.e.id, l.type, c, x, y);
      } else {
        this.setState({ source: null, targets: null});
      }
    } else if(this.state.source == null && e) {
      // Set Source & Targets
      let origin = {x, y};
      let targets = l.getTargets(this.props.G, this.props.ctx, this.props.playerID, c, origin, e);
      this.setState({ source: { l: l.type, c: c, x: x, y: y, e: e, id: e.id }, targets: targets });
    } else if(e && e.id === this.state.source.e.id) {
      // Clear Source
      this.setState({ source: null, targets: null  });
    } else if (this.isVaildTarget( l, c, x, y )) {
      let target = this.pickTarget( l, c, x, y );
      if(this.state.source.l === LOCATIONS.Hand) {
        this.props.moves.playCubit(this.state.source, target);
        this.setState({ source: null, targets: null});
      } else if(this.state.source.l === LOCATIONS.Board && l.type === LOCATIONS.Board) {
        this.props.moves.moveUnit(this.state.source, target);
        this.setState({ source: null, targets: null});
      }
    } else {
      // ...
    }
  }

  isVaildTarget(l, c, x, y) {
    if(this.state.targets === null) {
      return false;
    }
    
    for (let i = 0; i < this.state.targets.length; i++) {
      const target = this.state.targets[i];
      if(target.l === l.type && target.c === c && target.x === x && target.y === y) {
        return true;
      }
    }

    return false;
  }

  pickTarget(l, c, x, y) {
    let targets = [];
    
    for (let i = 0; i < this.state.targets.length; i++) {
      const target = this.state.targets[i];
      if(target.l === l.type && target.c === c && target.x === x && target.y === y) {
        targets.push(target);
      }
    }

    //TODO: replace with a dialog to pick the correct option

    if(targets.length > 0) {
      return targets[0];
    } else{
      return targets[0];
    }
  }

  extends(c, l) {
    return {...this.props, controller: c, location: l, table: this };
  }

  render() {
    let locations = getLocations();

    let board = React.createElement(Board, this.extends(null, locations.board)); 
    let field = React.createElement(Board, this.extends(null, locations.field));
    let arena = React.createElement(Board, this.extends(null, locations.arena)); 

    let summaries = {
      "0": React.createElement(PlayerSummary, {...this.props, controller: '0', table: this }),
      "1": React.createElement(PlayerSummary, {...this.props, controller: '1', table: this }),
    }
    let units = {
      "0": React.createElement(Board, this.extends('0', locations.units)), 
      "1": React.createElement(Board, this.extends('1', locations.units)), 
    };
    let hands = {
      "0": React.createElement(Board, this.extends('0', locations.hands)), 
      "1": React.createElement(Board, this.extends('1', locations.hands)), 
    };
    let avatars = {
      "0": React.createElement(Board, this.extends('0', locations.avatars)),
      "1": React.createElement(Board, this.extends('1', locations.avatars)), 
    };
    let bags = {
      "0": React.createElement(Board, this.extends('0', locations.bags)),
      "1": React.createElement(Board, this.extends('1', locations.bags)), 
    };
    let exiles = {
      "0": React.createElement(Board, this.extends('0', locations.exiles)), 
      "1": React.createElement(Board, this.extends('1', locations.exiles)), 
    };
    let afterlifes = {
      "0": React.createElement(Board, this.extends('0', locations.afterlifes)), 
      "1": React.createElement(Board, this.extends('1', locations.afterlifes)), 
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
          <Col>
            { summaries['0'] }
            { bags['0'] }          
            { hands['0'] }
            { avatars['0'] }
            { exiles['0'] }
            { afterlifes['0'] }
          </Col>
          <Col>
            { units['0'] }
          </Col>
          <Col>
            <Row>
              <Col>
                { arena }       
              </Col>
            </Row>
            <Row>
              <Col>
                { board }
                { field }
              </Col>
            </Row>
          </Col>
          <Col>
            { units['1'] }
          </Col>
          <Col>
          { summaries['0'] }
          { bags['1'] }          
          { hands['1'] }
          { avatars['1'] }
          { exiles['1'] }
          { afterlifes['1'] }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GameTable;