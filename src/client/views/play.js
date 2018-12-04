import React from 'react';
import PropTypes from 'prop-types';

import { Token, Grid } from 'boardgame.io/ui';
import { getUnitElement } from '../svg/units';
import { getCubitElement } from '../svg/cubits';

// Bootstrap
import {
  Container, Collapse,
  Row, Col,
  Navbar, NavbarBrand, NavbarToggler, Button,
  // ButtonGroup, Button,
  Badge
} from 'reactstrap';

import { TARGETS, PLACEMENT, LOCATIONS } from '../../game/common'
import { Database } from '../../game/database';
import { getMoves } from '../../game/movement'
import { getTargets } from '../../game/placement'

class Field extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    playerID: PropTypes.string.isRequired,
    selection: PropTypes.any,
    onHelp: PropTypes.func,
    onMove: PropTypes.func,
    onPlacement: PropTypes.func,
  };

  static defaultProps = {
    selection: null,
    onHelp: () => {},
    onMove: () => {},
    onPlacement: () => {},
  };

  constructor(params) {
    super(params);

    this.validTarget = this.validTarget.bind(this);
    this.validMove = this.validMove.bind(this);
    this.onClick = this.onClick.bind(this);

    this.map = {};
    this.placements = {};
    this.movements = {};

    this.rows = 8;
    this.cols = 26;

    this.baseColor = '#000000';
    this.altColor = '#FFFFFF';
    this.primaryColor = '#ADAAAA';
    this.secondaryColor = '#D9D6D6';
    this.placementColor = '#188108';

    this.movementColors = {};
    this.movementColors[TARGETS.Empty] = '#188108';
    this.movementColors[TARGETS.Friendly] = '#188108';
    this.movementColors[TARGETS.Enemy] = '#801D15';

    this.layout = {
      breaks: [8,17],
      board: [9,10,11,12,13,14,15,16],
      fieldSelf: [0,1,2,3,4,5,6,7],
      fieldOpponent: [18,19,20,21,22,23,24,25],
    };
    
    this.background = {};
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        const key = `${x},${y}`;
        if(this.layout.breaks.includes(x)) {
          this.background[key] = this.baseColor
        } else if(this.layout.fieldSelf.includes(x)) {
          this.background[key] = this.props.playerID === '0' ? this.primaryColor : this.secondaryColor;
        } else if(this.layout.fieldOpponent.includes(x)) {
          this.background[key] = this.props.playerID === '0' ? this.secondaryColor : this.primaryColor;
        } else if (this.layout.board.includes(x)) {
          this.background[key] = ((x + y) % 2 === 0) ? this.primaryColor : this.secondaryColor;
        }
      }
    }

    this.style = { strokeWidth: 0.02, stroke: '#000000' };

    this.state = {
      selection: null
    };
  }


  validTarget(x,y) {
    // Gruad
    if(!this.props.selection) {
      return false;
    }
    if(!this.props.selection.cubit) {
      return false;
    }

    // Check
    if(this.placements[`${x},${y}`]) {
      return true;
    } else {
      return false;
    }
  }

  validMove(x,y) {
    // Gruad
    if(!this.state.selection) {
      return false;
    }
    if(!this.state.selection.unit) {
      return false;
    }

    // Check
    if(this.movements[`${x},${y}`]) {
      return true;
    } else {
      return false;
    }
  }

  onClick({ x, y }) {
    if(this.layout.breaks.includes(x)) {
      return; // Out of bounds
    }

    let obj = this.map[`${x},${y}`];
    if(obj) {
      this.props.onHelp(obj);
    }

    let isField = this.layout.fieldSelf.includes(x) || this.layout.fieldOpponent.includes(x);
    let isBoard = this.layout.board.includes(x);
    let validSelection = this.props.selection && this.props.selection.cubit;

    if(this.props.ctx.phase === 'play' && isField && validSelection) {
      let event = {
        unit: (y < 4) ? this.map[`${x},${0}`] : this.map[`${x},${4}`],
        slot: (y < 4) ? y - 1 : y - 5,
        cubit: (y !== 0 && y !== 4) ? this.map[`${x},${y}`] : undefined,
      };
      if(this.validTarget(x,y)) {
        this.props.onPlacement(event);
      }
    } else if(this.props.ctx.phase === 'move' && isBoard) {
      let event = {
        position: {x:x-9,y:y},
        unit: this.map[`${x},${y}`],
      };

      if(this.validMove(x,y)) { 
        this.props.onMove(this.state.selection, event);
        this.setState({ selection: null });
      } else {
        this.setState({ selection: event });
      }
    }
  }

  render() {
    let background = { ...{}, ...this.background };
    
    let tokens = [];

    this.map = {};
    this.placements = {};
    this.movements = {};

    // Movement highlights
    if(this.state.selection && this.state.selection.unit) {
      let moves = getMoves(this.props.G, this.props.ctx, this.state.selection.unit.id, this.state.selection.position);
        for (const move of moves) {
          const key = `${move.x+9},${move.y}`;
          background[key] = this.movementColors[move.target];
          this.movements[key] = 1;
        }
    }

    // Placement highlights
    let targets = [];
    if(this.props.selection && this.props.selection.cubit) {
      targets = getTargets(this.props.G, this.props.ctx, this.props.selection.cubit.id);
    }

    for (const unit of this.props.G.field) {
      let unitElement = getUnitElement(unit);

      {
        let offset = 9;
        if(unit.position) {
          let x = unit.position.x + offset;
          let y = unit.position.y;
          let tokenKey = "board_" + unit.id;
          let token = <Token animate key={tokenKey} x={x} y={y}>{unitElement}</Token>
          tokens.push(token);
  
          let mapKey = `${x},${y}`;
          this.map[mapKey] = unit;
        }
      }

      let location = (unit.ownership === this.props.playerID) ? LOCATIONS.MyField : LOCATIONS.OpponentsField
      let targeting = targets.filter(_ => _.where === location).map(_ => _.condition);
      let position = {x:0, y:0};
      {
        let offset = location === LOCATIONS.MyField ? 0 : 18;
        if(unit.layout.r === 0 && unit.ownership === '0') {
          position.x = unit.layout.f + offset;
          position.y = 0;
        } else if(unit.layout.r === 1 && unit.ownership === '0') {
          position.x = unit.layout.f + offset;
          position.y = 4;
        } else if(unit.layout.r === 0 && unit.ownership === '1') {
          position.x = unit.layout.f+ offset;
          position.y = 0;
        } else if(unit.layout.r === 1 && unit.ownership === '1') {
          position.x = unit.layout.f + offset;
          position.y = 4;
        }

        let key = "field_" + unit.id;
        let token = <Token key={key} x={position.x} y={position.y}>{unitElement}</Token>
        tokens.push(token);

        let mapKey = `${position.x},${position.y}`;
        this.map[mapKey] = unit;

        if(targeting.includes(PLACEMENT.Unit)) {
          background[mapKey] = this.placementColor;
          this.placements[mapKey] = true;
        }
      }

      for (let i = 0; i < unit.slots; i++) {
        let x = position.x;
        let y = position.y + i + 1;
        let mapKey = `${x},${y}`;

        const cubit = unit.cubits[i];
        if(cubit) {
          let isPlayer = cubit.ownership === this.props.playerID;
          let cubitElement = getCubitElement(cubit, isPlayer);
          let token = <Token animate key={cubit.id} x={x} y={y}>{cubitElement}</Token>
          tokens.push(token);
          this.map[mapKey] = cubit;

          if(targeting.includes(PLACEMENT.Cubit)) {
            background[mapKey] = this.placementColor;
            this.placements[mapKey] = true;
          }
        } else {
          if(targeting.includes(PLACEMENT.Empty)) {
            background[mapKey] = this.placementColor;
            this.placements[mapKey] = true;
          }
        }
      }
    }

    return (
      <Grid
        rows={this.rows}
        cols={this.cols}
        onClick={this.onClick}
        colorMap={background}
        style={this.style}
      >
        {tokens}
      </Grid>
    );
  }
}

class Hand extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    playerID: PropTypes.string.isRequired,
    onSelection: PropTypes.func,
    onHelp: PropTypes.func,
    selection: PropTypes.any,
  };

  static defaultProps = {
    onSelection: () => {},
    onHelp: () => {},
    selection: null,
  };

  constructor(params) {
    super(params);

    this.onClick = this.onClick.bind(this);

    this.map = {};
    this.tokens = [];

    this.rows = 1;
    this.cols = 8;

    this.baseColor = '#000000';
    this.altColor = '#FFFFFF';
    this.primaryColor = '#ADAAAA';
    this.secondaryColor = '#D9D6D6';
    this.selectionColor = '#188108';
    this.selectionAltColor = '#801D15';
    
    this.background = {};
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        const key = `${x},${y}`;
        this.background[key] = this.props.playerID === '0' ? this.primaryColor : this.secondaryColor;
      }
    }

    this.style = { strokeWidth: 0.02, stroke: '#000000' };
  }

  onClick({ x, y }) {
    let cubit = this.map[`${x},${y}`];
    let event = {
      slot: x,
      cubit: cubit,
    };
    this.props.onSelection(event);
    this.props.onHelp(cubit);
  };

  render() {
    let colorMap =  { ...{}, ...this.background };

    this.map = {};
    this.tokens = [];

    let hand = this.props.G.players[this.props.playerID].hand;
    for (let i = 0; i < hand.length; i++) {
      const cubit = hand[i];
      if(!cubit) {
        continue;
      }

      let isPlayer = cubit.ownership === this.props.playerID;
      let cubitElement = getCubitElement(cubit, isPlayer);
      let token = <Token animate key={cubit.id} x={i} y={0}>{cubitElement}</Token>
      this.tokens.push(token);
      let mapKey = `${i},${0}`;
      this.map[mapKey] = cubit;

      if(this.props.selection && this.props.selection.cubit 
        && cubit.id === this.props.selection.cubit.id 
        && this.props.isActive && this.props.ctx.phase === 'play') {
        colorMap[mapKey] = this.selectionColor
      }
    }

    return (
      <Grid
        rows={this.rows}
        cols={this.cols}
        onClick={this.onClick}
        colorMap={colorMap}
        style={this.style}
        >
        {this.tokens}
      </Grid>
      
    );
  }
}

class Help extends React.Component {
  static propTypes = {
    selection: PropTypes.any,
  };

  static defaultProps = {
    selection: null,
  };

  render() {
    let type = this.props.selection ? this.props.selection.type : '';
    let cubit = Database.cubits[type];
    let unit = Database.units[type];
    if(cubit) {
      return <div className="text-light"><span>Cubit</span> - <strong>{cubit.name}</strong><br /><span>{cubit.description}</span></div>;
    } else if(unit) { 
      return <div className="text-light"><span>Unit</span> - <strong>{unit.name}</strong><br /><span>{unit.description}</span></div>;
    } else {
      return <div></div>;
    }
  }
}

export class PlayView extends React.Component {
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

    this.menuToggle = this.menuToggle.bind(this);
    this.passPhase = this.passPhase.bind(this);
    this.onSelection = this.onSelection.bind(this);
    this.onPlacement = this.onPlacement.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onHelp = this.onHelp.bind(this);

    this.state = {
      menuOpen: false,
      selection: null,
      help: null,
    };
  }

  menuToggle() {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  passPhase() {
    this.props.moves.skip();
  }

  onSelection(event) {
    if(event.cubit) {
      this.setState({ selection: event });
    } else {
      this.setState({ selection: null });
    }
  }

  onHelp(cubit) {
    this.setState({ help: cubit });
  }

  onPlacement(event) {
    this.props.moves.placement(this.state.selection, event);
    this.setState({ selection: null });
  }

  onMove(source, destination) {
    this.props.moves.movement(source, destination);
  }

  render() {
    let fieldParams = {
      selection: this.state.selection,
      onMove: this.onMove,
      onPlacement: this.onPlacement,
      onHelp: this.onHelp
    };
    let field = React.createElement(Field, { ...fieldParams, ...this.props});

    let handParams = {
      selection: this.state.selection,
      onSelection: this.onSelection,
      onHelp: this.onHelp
    };
    let hand = React.createElement(Hand, { ...handParams, ...this.props});

    let helpParams = { 
      selection: this.state.help 
    };
    let help = React.createElement(Help, helpParams);

    // TODO: move into new React Compount
    let skip = null;
    let validPlay = this.props.isActive && this.props.G.rules.passPlay && this.props.ctx.phase === 'play';
    let validMove = this.props.isActive && this.props.G.rules.passMove && this.props.ctx.phase === 'move';
    if(validPlay || validMove) {
      let color = this.props.G.rules.freePass ? 'success' : 'warning';
      skip = <Button size="sm" color={color} onClick={this.passPhase}>Pass</Button>;
    }

    return (
      <section>
        <Navbar color="light" light expand="md" className="p-0 fixed-top rounded-bottom">
          <Container>
            <NavbarBrand className="p-0" href="/">
              <img className="p-1" height="40" src="/favicon.ico" alt="Logo"></img>
              <strong className="p-1">Lusus</strong>
            </NavbarBrand>
            <Collapse  isOpen={this.state.menuOpen} navbar>
              <Row>
                <Col xs="12">
                  <div className="text-light">
                    <div title="Player"  className="d-inline p-1">
                      Player <Badge>{ this.props.playerID === '0' ? 'white' : 'black' }</Badge>
                    </div>
                    <div title="Actions" className="d-inline p-1">
                    Actions <Badge>{ this.props.G.players[this.props.playerID].actions }</Badge>
                    </div>
                    <div title="Bag" className="d-inline p-1">
                      Bags <Badge>{ this.props.G.players[this.props.playerID].bag.length }</Badge>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className="p-1">
                <Col xs="12">
                  <div className="text-light">
                    <div title="Turn" className="d-inline p-1">
                      Turn <Badge>{ this.props.ctx.turn }</Badge>
                    </div>
                    <div title="Phase"  className="d-inline p-1">
                      Phase <Badge>{ this.props.ctx.currentPlayer === '0' ? 'white' : 'black' }</Badge> <Badge>{ this.props.ctx.phase }</Badge>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className="p-1">
                <Col xs="12">
                  <div>
                    { skip }
                  </div>
                </Col>
              </Row>
            </Collapse>
            <NavbarToggler onClick={this.menuToggle} />
          </Container>
        </Navbar>
        <Container fluid className="gameboard">
          <Row>
            <Col>
              { field }
            </Col>
          </Row>
        </Container>
        <Navbar color="light" light expand="md" className="p-0 fixed-bottom rounded-bottom">
          <Container>
           <Row className="p-1 " style={{width:'100%'}}>
            <Col xs="6">
              { hand }
            </Col>
            <Col xs="6">
              { help }
            </Col>
           </Row>
          </Container>
        </Navbar>
      </section>
    );
  }
}