import React from 'react';

// Bootstrap
import { 
  Container, 
  Row, Col,
  Navbar, NavbarBrand, Nav,
  Form, FormGroup, Input, Button
} from 'reactstrap';

// UI
import { 
  Token, 
  Grid
} from 'boardgame.io/ui';

import { Help } from './dialogs/help'
import { getCubitElement } from './svg/cubits';

import { GameLogic } from '../game/logic';

var clone = require('clone');

class BuildPage extends React.Component {

  constructor(params) {
    super(params);

    this.onNameChange = this.onNameChange.bind(this);
    this.onClickGrid = this.onClickGrid.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
    this.onDeselectAll = this.onDeselectAll.bind(this);
    this.onSave = this.onSave.bind(this);

    this.logic = new GameLogic();

    let cubits = this.logic.getCubits("1");
    cubits.sort(this.sortByName);
    let bag = cubits.map(_ => _.type);

    let w = 10;
    let h = Math.round(cubits.length / w);

    this.state = {
      width: w,
      height: h,
      name: '',
      cubits: cubits,
      bag: bag,
      debug: {
        skip_action_check: false,
        skip_move_check: false,
        skip_draw_check: false,
      }
    };
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

  onNameChange(event) {
    this.setState({name: event.target.value});
  }

  onClickGrid({x, y}) {
    let width = this.state.width;
    let index = x + width * y;
    let cubit = this.state.cubits[index];
    if(cubit) {
      if(this.state.bag.includes(cubit.type)) {
        let bag = clone(this.state.bag);
        bag = bag.filter(_ => _ !== cubit.type);
        this.setState({ bag: bag });
      } else {
        let bag = clone(this.state.bag);
        bag.push(cubit.type);
        this.setState({ bag: bag });
      }
    }    
  }

  onSelectAll() {
    let bag = this.state.cubits.map(_ => _.type);
    this.setState({ bag: bag });
  }

  onDeselectAll() {
    this.setState({ bag: [] });
  }

  onSave() {
    if(this.state.name === '') {
      return;
    }

    if(this.state.bag.length < 4) {
      return;
    }

    let key = 'bags';
    let json = localStorage.getItem(key);
    let collection = json ? JSON.parse(json) : [];

    let item = {
      name: this.state.name,
      bag: this.state.bag,
      debug: this.state.debug,
    };
    let index = collection.findIndex(_ => _.name === item.name);
    if(index >= 0) {
      collection[index] = item;
    } else {
      collection.push(item);
    }

    json = JSON.stringify(collection);

    localStorage.setItem(key, json);

    alert('Saved');
  }

  render() {
    let tokens = [];
    let colorMap = {};

    let cubits = this.state.cubits;
    let width = this.state.width;
    let height = this.state.height;

    for (let i = 0; i < cubits.length; i++) {
      const cubit = cubits[i];
      const x = i % width;
      const y = (i - x) / width;
      
      let element = getCubitElement(cubit);
      let token = React.createElement(Token, {key: cubit.id, x: x, y: y}, element);
      tokens.push(token);

      if(this.state.bag.includes(cubit.type)) {
        colorMap[`${x},${y}`] = '#77B300';
      }
    }

    
    let style = { strokeWidth: 0.05, stroke: '#000000' };
    let grid = React.createElement(Grid, {rows: height, cols: width, colorMap: colorMap, style: style, onClick: this.onClickGrid }, tokens);

    return (
      <Container className="p-0">
        <Navbar color="light" expand="md" className="rounded-bottom p-0">
          <NavbarBrand className="p-0 text-white" href="/">
            <img className="p-1"  height="32" src="/favicon.ico" alt="Logo"></img>
            <strong className="p-1">Lusus</strong> <small>Tactical Chess</small>
          </NavbarBrand>
          <Nav>
          </Nav>
          <Nav className="p-1 list-inline ml-auto">
            <Help playerID="1" />
          </Nav>
        </Navbar>
        <br />
        <Row>
          <Col>
            <h4>Build A Bag</h4>
            <p></p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Row>
                  <Col md="8">
                    <Input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.onNameChange} />
                  </Col>
                  <Col>
                    <Button onClick={this.onSelectAll} color="primary">Select All</Button>
                    &nbsp;
                    <Button onClick={this.onDeselectAll} color="primary">Deselect All</Button>
                    &nbsp;
                    <Button onClick={this.onSave} color="success">Save</Button>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                { grid }
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <br />
      </Container>
    );
  }
}

export default BuildPage;