import React from 'react';
import PropTypes from 'prop-types';

import { Token, Grid } from 'boardgame.io/ui';
import { getUnitElement } from '../svg/units';
import { getCubitElement } from '../svg/cubits';

import { TARGETS, PLACEMENT, LOCATIONS, unitHasCubits, CUBITS } from '../../game/common'
import { getMoves } from '../../game/movement'
import { getTargets } from '../../game/placement'

export class Field extends React.Component {
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
    this.deadColor = '#F9766C';

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

        if(targeting.includes(PLACEMENT.Unit) && !unitHasCubits(unit, CUBITS.Immunity)) {
          background[mapKey] = this.placementColor;
          this.placements[mapKey] = true;
        }

        if(!unit.position) {
          background[mapKey] = this.deadColor;
        }
      }

      for (let i = 0; i < unit.slots; i++) {
        let x = position.x;
        let y = position.y + i + 1;
        let mapKey = `${x},${y}`;

        if(!unit.position) {
          background[mapKey] = this.deadColor;
        }

        const cubit = unit.cubits[i];
        if(cubit) {
          let isPlayer = cubit.ownership === this.props.playerID;
          let cubitElement = getCubitElement(cubit, isPlayer);
          let token = <Token animate key={cubit.id} x={x} y={y}>{cubitElement}</Token>
          tokens.push(token);
          this.map[mapKey] = cubit;

          if(targeting.includes(PLACEMENT.Cubit) && !unitHasCubits(unit, CUBITS.Immunity)) {
            background[mapKey] = this.placementColor;
            this.placements[mapKey] = true;
          }
        } else {
          if(targeting.includes(PLACEMENT.Empty) && !unitHasCubits(unit, CUBITS.Condemn)) {
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