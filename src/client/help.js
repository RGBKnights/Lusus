import React from 'react';
// import PropTypes from 'prop-types';

// UI
import { 
  Token, 
  Grid
} from 'boardgame.io/ui';

import {
  CubitText
} from './cubits';

// Bootstrap
import { 
  NavItem,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Media
} from 'reactstrap';

import { IoMdHelp } from 'react-icons/io';

import { GameLogic } from '../game/logic';

export class Help extends React.Component {
  static propTypes = {
    // color: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

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

  render() {
    let cubits = this.logic.getCubits("0");
    let collection = [];
    for (const cubit of cubits) {

      let element = React.createElement(CubitText, { name: cubit.name, value: cubit.name, team: 'b', color: null });
      let icon = React.createElement(Token, {key: cubit.id, x: 0, y: 0}, element);

      let item = (
        <Media key={cubit.type}>
          <Media left href="#">
            <Grid rows={1} cols={1} style={{ width: 50, strokeWidth: 0.05, stroke: '#000000' }}>
              { icon }
            </Grid>
          </Media>
          <Media body>
            <Media heading style={{ height: 50 }}>
              { cubit.name }
            </Media>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
          </Media>
        </Media>
      );

      collection.push(item);
    }

    return (
      <NavItem className="list-inline-item">
        <Button size="sm" color="info" title="Help" onClick={this.toggle}><IoMdHelp className="icon-inline" /></Button>

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