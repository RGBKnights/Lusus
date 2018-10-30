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
  Media,
  Badge
} from 'reactstrap';

import { IoMdHelp } from 'react-icons/io';

import { GameLogic } from '../game/logic';
import { CUBIT_TYPES, KEYWORDS } from '../game/common';

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

  getCubitElement(cubit) {
    let team =  this.teamColors[cubit.ownership];

    let type = Cubits.CubitText;
    let params = { name: cubit.name, team: team };

    switch (cubit.type) {
      case CUBIT_TYPES.MovementOrthogonal:
      {
        type =  Cubits.CubitOrthogonal;
        break;
      }
      case CUBIT_TYPES.MovementDiagonal:
      {
        type =  Cubits.CubitDiagonal;
        break;
      }
      case CUBIT_TYPES.MovementCardinal:
      {
        type =  Cubits.CubitCardinal;
        break;
      }
      case CUBIT_TYPES.MovementJump:
      {
        type =  Cubits.CubitPattern;
        break;
      }
      case CUBIT_TYPES.MovementSideStep:
      {
        type =  Cubits.CubitSidestep;
        break;
      }
      case CUBIT_TYPES.MovementSwap:
      {
        type =  Cubits.CubitSwap;
        break;
      }
      case CUBIT_TYPES.DrawPlusOne:
      {
        type =  Cubits.CubitDrawPlus;
        break;
      }
      case CUBIT_TYPES.DrawNegOne:
      {
        type =  Cubits.CubitDrawMinus;
        break;
      }
      case CUBIT_TYPES.DoubleAction:
      {
        type =  Cubits.CubitDoubleAction;
        break;
      }
      case CUBIT_TYPES.Condemn:
      {
        type =  Cubits.CubitCondemn;
        break;
      }
      case CUBIT_TYPES.KingOfHill:
      {
        type =  Cubits.CubitKingOfHill;
        break;
      }
      case CUBIT_TYPES.KingsFlag:
      {
        type =  Cubits.CubitKingOfHill;
        break;
      }
      case CUBIT_TYPES.Timebomb:
      {
        type =  Cubits.CubitTimebomb;
        params.value = cubit.data.amount;
        break;
      }
      case CUBIT_TYPES.Reckless:
      {
        type =  Cubits.CubitReckless;
        params.value = cubit.data.amount;
        break;
      }
      case CUBIT_TYPES.BlinkDodge:
      {
        type =  Cubits.CubitBlinkDodge;
        break;
      }
      case CUBIT_TYPES.CostofPower:
      {
        type =  Cubits.CubitCostofPower;
        break;
      }
      case CUBIT_TYPES.Encumber:
      {
        type =  Cubits.CubitEncumber;
        break;
      }
      case CUBIT_TYPES.Enrage:
      {
        type =  Cubits.CubitEnrage;
        break;
      }
      case CUBIT_TYPES.ForgottenPast:
      {
        type =  Cubits.CubitForgottenPast;
        break;
      }
      case CUBIT_TYPES.Heirloom:
      {
        type =  Cubits.CubitHeirloom;
        break;
      }
      case CUBIT_TYPES.Immunity:
      {
        type =  Cubits.CubitImmunity;
        break;
      }
      case CUBIT_TYPES.Knowledge:
      {
        type =  Cubits.CubitKnowledge;
        break;
      }
      case CUBIT_TYPES.Looter:
      {
        type =  Cubits.CubitLooter;
        break;
      }
      case CUBIT_TYPES.Nab:
      {
        type =  Cubits.CubitNab;
        break;
      }
      case CUBIT_TYPES.Passify:
      {
        type =  Cubits.CubitPassify;
        break;
      }
      case CUBIT_TYPES.Poisoned:
      {
        type =  Cubits.CubitPoisoned;
        break;
      }
      case CUBIT_TYPES.Sacrifice:
      {
        type =  Cubits.CubitSacrifice;
        break;
      }
      case CUBIT_TYPES.StickyFeet:
      {
        type =  Cubits.CubitStickyFeet;
        break;
      }
      case CUBIT_TYPES.RemovalStrong:
      {
        type =  Cubits.CubitRemovalStrong;
        break;
      }
      case CUBIT_TYPES.RemovalWeak:
      {
        type =  Cubits.CubitRemovalWeak;
        break;
      }
      default:
        break;
    }

    return React.createElement(type, params);
  }

  getKeyword(keyword) {
    switch (keyword) {
      case KEYWORDS.Arena:
        return "Arena";
      case KEYWORDS.Movement:
        return "Movement";
      case KEYWORDS.Trap:
        return "Trap";
      case KEYWORDS.Activation:
        return "Activation";
      default:
        return keyword;
    }
  }

  sortByName(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  }

  render() {
    let playerID = this.props.playerID ? this.props.playerID : "0";
    let cubits = this.logic.getCubits(playerID);
    cubits.sort(this.sortByName);
    let collection = [];
    for (const cubit of cubits) {

      // let team = this.teamColors[cubit.ownership];
      // let type = this.getCubitFromType(cubit.type);
      let element = this.getCubitElement(cubit); //React.createElement(type, { name: cubit.name, value: cubit.name, team: team, color: null, });
      let icon = React.createElement(Token, {key: cubit.id, x: 0, y: 0}, element);
      let colorMap = {};
      colorMap['0,0'] = '#817F7F';

      let tags = [];
      for (const key of cubit.keywords) {
        let keyword = this.getKeyword(key);
        tags.push(<Badge key={key} color="info">{keyword}</Badge>);
      }
      if(cubit.keywords.length > 0) {
        tags.push(<br key="keywords" />);
      }

      let item = (
        <Media key={cubit.type} className="p-1">
          <Media left href="#">
            <Grid rows={1} cols={1} colorMap={colorMap} style={{ width: 50, strokeWidth: 0.05, stroke: '#000000' }}>
              { icon }
            </Grid>
          </Media>
          <Media body>
            <Media heading style={{ height: 50 }}>
              { cubit.name }
            </Media>
            { tags }
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
            <h5 className="text-center">Rules</h5>
            <p>
              Hello!  Welcome to Lusus.  
              The game that is like chess but with even more rules!  
              To begin both you and your opponent will need to be on this screen on different devices.  
              Then select the appropriate button to the right, if you are player 1 then click Start Match if you are player 2 select Join Match.  
              Player one will need to send player 2 the game code, it will be added to your clipboard by selecting the share icon in the upper right hand corner.</p>
            <p>
              The game works in phases. 
              First is the Play Phase.  
              During this phase you can use your actions to play cubies from your hand and activate certain cubies’ abilities.  
              Then it is the Move Phase where you will move a unit on the board.  
              Then the Draw Phase will automatically happen, where you will get a new hand and some abilities will resolve and turn counters will increase. 
              That will end your turn and it will be the next player.
            </p>
            <p>
              Unlike chess this game has numerous win / lose conditions. 
              You can still win the game by capturing the opponent's king but unlike chess there is no idea of checkmate. 
              The act of capture is needed to claim victory (This is important because of things like traps). 
              A number of cubies also have alternate win conditions that are specific to when the cubie is active. 
              Also there are a number of lose conditions as well.
              Frist you can lose if you do not have enough cubies left to draw a full hand (so in a sense your bag size is like you health). 
              Second, you can also lose if you have no valid moves to make on your movement phase.
            </p>
            <h5 className="text-center">Cubies</h5>
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