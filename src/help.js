// Framework
import React from 'react';

// UI
import { 
  Modal, ModalHeader, ModalBody, ModalFooter,
  Media,
  Button
} from 'reactstrap';
import { 
  Token, 
  Grid 
} from 'boardgame.io/ui';
import {
  CubitLogo,
  CubitText,
  CubitOrthogonal,
  CubitDiagonal,
  CubitCardinal,
  CubitPattern,
  CubitSidestep,
  CubitSwap,
  CubitDrawPlus,
  CubitDrawMinus,
  CubitDoubleAction,
  CubitCondemn,
  CubitKnowledge,
  CubitKingOfHill
} from './ui/cubits';

// Game
import { CUBITS, getCubitsDatabase } from './cubits';

export default class HelpModal extends React.Component {

  constructor(params) {
    super(params);

    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  getCubitComponent(cubit) {
    let team = 'b';

    let cubitComponent = null;
    switch (cubit.key) {
      case '0':
        cubitComponent = <CubitLogo name={cubit.name} color={team} />;
        break;
      case CUBITS.Orthogonal:
        cubitComponent = <CubitOrthogonal name={cubit.name} color={team} />;
        break;
      case CUBITS.Diagonal:
        cubitComponent = <CubitDiagonal name={cubit.name} color={team} />;
        break;
      case CUBITS.Cardinal:
        cubitComponent = <CubitCardinal name={cubit.name} color={team} />;
        break;
      case CUBITS.Pattern:
        cubitComponent = <CubitPattern name={cubit.name} color={team} />;
        break;
      case CUBITS.SideStep:
        cubitComponent = <CubitSidestep name={cubit.name} color={team} />;
        break;
      case CUBITS.Swap:
        cubitComponent = <CubitSwap name={cubit.name} color={team} />;
        break;
      case CUBITS.DrawNegOne:
        cubitComponent = <CubitDrawMinus name={cubit.name} color={team} />;
        break;
      case CUBITS.DrawPlusOne:
        cubitComponent = <CubitDrawPlus name={cubit.name} color={team} />;
        break;
      case CUBITS.DoubleAction:
        cubitComponent = <CubitDoubleAction name={cubit.name} color={team} />;
        break;
      case CUBITS.Knowledge:
        cubitComponent = <CubitKnowledge name={cubit.name} color={team} />;
        break;
      case CUBITS.Condemn:
        cubitComponent = <CubitCondemn name={cubit.name} color={team} />;
        break;
      case CUBITS.KingOfHill:
        cubitComponent = <CubitKingOfHill name={cubit.name} color={team} />;
        break;
      default:
        cubitComponent = <CubitText name={cubit.name} color={team} value={cubit.key} />;
        break;
    }

    return cubitComponent;
  }

  render() {
    let cubits = getCubitsDatabase();
    let collection = [];

    for (var key in cubits) {
      const cubit = cubits[key];

      let component = this.getCubitComponent(cubit);
      
      let element = 
        <div key={key}>
          <Media >
            <Media left href="#" >
              <div style={{width: 64, height: 64}}>
                <Grid rows={1} cols={1}>
                  <Token x={0} y={0}>
                    {component}
                  </Token>
                </Grid>
              </div>
            </Media>
            <Media body>
              <Media heading>
                {cubit.name}
              </Media>
              {cubit.description}
            </Media>
          </Media>
          <br />
        </div>;

      collection.push(element);
    }

    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg" >
        <ModalHeader toggle={this.toggle}>Help</ModalHeader>
        <ModalBody>
          <div style={{height: 400, 'overflow-y': 'scroll'}}>
            {collection}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}