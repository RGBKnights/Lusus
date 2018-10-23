import React from 'react';
import PropTypes from 'prop-types';

// UI
import { 
  Token, 
  Grid
} from 'boardgame.io/ui';

import * as Cubits from './cubits';

// Bootstrap
import { 
  NavItem,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Media
} from 'reactstrap';

import { IoMdHelp } from 'react-icons/io';

import { GameLogic } from '../game/logic';
import { CUBIT_TYPES } from '../game/common';

export class Help extends React.Component {
  static propTypes = {
    playerID: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.teamColors = {'0': 'w', '1': 'b'};

    this.logic = new GameLogic();

    this.state = {
      modal: false
    };
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  getCubitFromType(type) {
    switch (type) {
      case CUBIT_TYPES.MovementOrthogonal:
        return Cubits.CubitOrthogonal;
      case CUBIT_TYPES.MovementDiagonal:
        return Cubits.CubitDiagonal;
      case CUBIT_TYPES.MovementCardinal:
        return Cubits.CubitCardinal;
      case CUBIT_TYPES.MovementJump:
        return Cubits.CubitPattern;
      case CUBIT_TYPES.MovementSideStep:
        return Cubits.CubitSidestep;
      case CUBIT_TYPES.MovementSwap:
        return Cubits.CubitSwap;
      case CUBIT_TYPES.DrawPlusOne:
        return Cubits.CubitDrawPlus;
      case CUBIT_TYPES.DrawNegOne:
        return Cubits.CubitDrawMinus;
      case CUBIT_TYPES.DoubleAction:
        return Cubits.CubitDoubleAction;
      case CUBIT_TYPES.Condemn:
        return Cubits.CubitCondemn;
      case CUBIT_TYPES.Knowledge:
        return Cubits.CubitKnowledge;
      case CUBIT_TYPES.KingOfHill:
        return Cubits.CubitKingOfHill;
      default:
        return Cubits.CubitText;
    }
  }

  render() {
    let playerID = this.props.playerID ? this.props.playerID : "0";
    let cubits = this.logic.getCubits(playerID);
    let collection = [];
    for (const cubit of cubits) {

      let team = this.teamColors[cubit.ownership];
      let type = this.getCubitFromType(cubit.type);
      let element = React.createElement(type, { name: cubit.name, value: cubit.name, team: team, color: null, });
      let icon = React.createElement(Token, {key: cubit.id, x: 0, y: 0}, element);
      let colorMap = {};
      colorMap['0,0'] = '#817F7F';

      let item = (
        <Media key={cubit.type}>
          <Media left href="#">
            <Grid rows={1} cols={1} colorMap={colorMap} style={{ width: 50, strokeWidth: 0.05, stroke: '#000000' }}>
              { icon }
            </Grid>
          </Media>
          <Media body className="p-1">
            <Media heading style={{ height: 50 }}>
              { cubit.name }
            </Media>
            { cubit.description }
          </Media>
        </Media>
      );

      collection.push(item);
    }

    return (
      <NavItem className="list-inline-item">
        <Button size="sm" color="primary" title="Help" onClick={this.toggle}><IoMdHelp className="icon-inline" /></Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Help</ModalHeader>
          <ModalBody>
            { collection }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </NavItem>
    );
  }
}