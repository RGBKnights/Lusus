import React from 'react';

import { Token, Grid } from 'boardgame.io/ui';
// import { getUnitElement } from '../svg/units';
import { getCubitElement } from '../svg/cubits';

// Bootstrap
import { 
  Container, 
  Row, Col,
  Navbar, NavbarBrand, 
  Form, FormGroup, Label, Input, Button,
  Media
} from 'reactstrap';
import NumericInput from 'react-numeric-input';

import { ToastContainer, toast } from 'react-toastify';

import { GameLogic } from '../../game/logic'
import { Database } from '../../game/database'

const LOCATION_STORAGE_KEY = 'builds'

class BuildPage extends React.Component {

  constructor(props) {
    super(props);

    this.onRulePassPlayChanged = this.onRulePassPlayChanged.bind(this);
    this.onRulePassMoveChanged = this.onRulePassMoveChanged.bind(this);
    this.onRuleFeePassChanged = this.onRuleFeePassChanged.bind(this);
    this.onRuleFreeDrawChanged = this.onRuleFreeDrawChanged.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);

    let deck = [];
    for (const key in Database.cubits) {
      if (Database.cubits.hasOwnProperty(key)) {
        const data = Database.cubits[key];
        if(data.enabled) {
          deck.push({ type: data.key, amount: 0 });
        }
      }
    }

    let defaults = GameLogic.getDefaultSetup();

    this.state = {
      name: 'Custom',
      rules: defaults.rules,
      deck: deck,
    };
  }

  onRulePassPlayChanged() {
    let rules = this.state.rules;
    rules.passPlay = !rules.passPlay;
    this.setState({ rules: rules });
  }

  onRulePassMoveChanged() {
    let rules = this.state.rules;
    rules.passMove = !rules.passMove;
    this.setState({ rules: rules });
  }

  onRuleFeePassChanged() {
    let rules = this.state.rules;
    rules.freePass = !rules.freePass;
    this.setState({ rules: rules });
  }

  onRuleFreeDrawChanged() {
    let rules = this.state.rules;
    rules.freeDraw = !rules.freeDraw;
    this.setState({ rules: rules });
  }

  handleChange(value, type) {
    let deck = this.state.deck;
    for (const item of deck) {
      if(item.type === type) {
        item.amount = value;
      }
    }
    this.setState({ deck: deck });
  }

  onSave() {
    let json = localStorage.getItem(LOCATION_STORAGE_KEY);
    let data = json ? JSON.parse(json) : [];

    let index = data.findIndex(_ => _.name === this.state.name);
    if(index >= 0) {
      data[index] = this.state;
    } else {
      data.push(this.state);
    }

    json = JSON.stringify(data);
    localStorage.setItem(LOCATION_STORAGE_KEY, json);

    toast('Saved');
  }

  render() {
    // Build
    // - name - SET TO 'CUSTOM'
    // - rules { passPlay, passMove, freePass, freeDraw }
    // * board [] { type, position: {x,y} }
    // * field [] { type, player, position: {x,y}, layout: {r,f} } // just changing position
    // - deck [] { type, amount }

    let items = [];
    for (const item of this.state.deck) {
      let key = "cubit_" + item.type;
      let data = Database.cubits[item.type];
      if(data) {
        let cubit = { type: item.type, ownership: '1' };
        let element = getCubitElement(cubit);
        let media = (
        <Media key={key}>
            <Media left href="#" className="p-1">
              <Grid rows={1} cols={1} style={{width:60}}>
                <Token x={0} y={0}>
                  { element }
                </Token>
              </Grid>
            </Media>
            <Media body>
              <Row>
                <Col sm={10}>
                  <Media heading>
                  { data.name }
                </Media>
                { data.description }
                </Col>
                <Col sm={2}>
                  <NumericInput className="form-control" min={0} max={100} value={item.amount} onChange={(e) => this.handleChange(e, item.type)}/>
                </Col>
              </Row>
            </Media>
          </Media>
        );
  
        items.push(media);
      }
    }

    return (
      <section className="p-0">
        <Navbar color="light" light expand="md" className="fixed-top rounded-bottom">
          <Container>
            <NavbarBrand className="p-0" href="/">
              <img className="p-1" height="32" src="/favicon.ico" alt="Logo"></img>
              <strong className="p-1">Lusus <small>Tactical Chess</small> Builder</strong>
            </NavbarBrand>
            <Row className="p-1">
              <Col xs="12">
                <Button size="sm" color="success" onClick={this.onSave}>Save</Button>
              </Col>
            </Row>
          </Container>
        </Navbar>
        <Container className="body">
          <Row>
            <Col>
              <h5>Rules <small>Overrides</small></h5>
            </Col>
          </Row>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                    <Label>Enable Skip Play Phase </Label>
                    <Input type="select" name="passPlay" onChange={this.onRulePassPlayChanged} defaultValue={this.state.rules.passPlay} >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </Input>
                  </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Enable Skip Move Phase </Label>
                  <Input type="select" name="passMove" onChange={this.onRulePassMoveChanged} defaultValue={this.state.rules.passMove} >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Enable Free Skip </Label>
                  <Input type="select" name="freePass" onChange={this.onRuleFreePassChanged} defaultValue={this.state.rules.freePass} >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Enable Free Draw </Label>
                  <Input type="select" name="freeDraw" onChange={this.onRuleFreeDrawChanged} value={this.state.rules.freeDraw} >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form> 
          <hr className="highlighted" />
          <Row>
            <Col>
              <h5>Deck</h5>
              { items }
            </Col>
          </Row>
        </Container>
        <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_CENTER} />
      </section>
    );
  }
}

export default BuildPage;