import React from 'react';
import PropTypes from 'prop-types';

// Bootstrap
import { 
  NavItem,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Table,
  // Badge
} from 'reactstrap';

import { IoIosList } from 'react-icons/io';

export class EventLog extends React.Component {
  static propTypes = {
    log: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

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
    let collection = [];
    for (let i = 0; i < this.props.log.length; i++) {
      let log = this.props.log[i];
      collection.push(<tr key={i}><td>{log.turn}</td><td>{log.player_side}</td><td>{log.event}</td><td>{log.description}</td></tr>);
    }

    return (
      <NavItem className="list-inline-item">
        <Button size="sm" color="primary" title="Event Log" onClick={this.toggle}><IoIosList className="icon-inline" /></Button>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Event Log</ModalHeader>
          <ModalBody>
            <Table striped size="sm">
              <thead>
                <tr>
                  <th>Turn</th>
                  <th>Player</th>
                  <th>Action</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                { collection }
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </NavItem>
    );
  }
}