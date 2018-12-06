import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

// Bootstrap
import { 
  Form, FormGroup, Label, Input, Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

const LOCATION_STORAGE_KEY = 'builds'

export class SetupView extends React.Component {
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

    this.onBuildChange = this.onBuildChange.bind(this);
    this.onReady = this.onReady.bind(this);

    this.state = {
      build: '',
    };
  }

  onBuildChange(event) {
    this.setState({build: event.target.value});
  }

  onReady() {
    let json = localStorage.getItem(LOCATION_STORAGE_KEY);
    let data = json ? JSON.parse(json) : [];
    let index = data.findIndex(_ => _.name === this.state.build);
    if(index >= 0) {
      let item  = data[index];
      this.props.moves.config(item);
    } else {
      this.props.moves.config({});
    }
  }

  render() {
    let json = localStorage.getItem(LOCATION_STORAGE_KEY);
    let data = json ? JSON.parse(json) : [];
    let options = []
    for (const item of data) {
      options.push(<option key={item.name} value={item.name}>{item.name}</option>);
    }

    return (
      <Form>
        <div>GAME SETUP</div>
        <Modal isOpen={true}>
          <ModalHeader>Customize</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="deck">Select Build</Label>
              <Input type="select" name="builds" id="builds" value={this.state.build} onChange={this.onBuildChange}>
                <option value="">Default</option>
                { options }
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.onReady}>Go!</Button>
          </ModalFooter>
        </Modal>
      </Form>
    );
  }
}

export default withRouter(SetupView);