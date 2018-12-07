import React from 'react';
import PropTypes from 'prop-types';

import { Token, Grid } from 'boardgame.io/ui';
import { getCubitElement } from '../svg/cubits';

export class Hand extends React.Component {
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
    this.selectionColor = '#A0E595';
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