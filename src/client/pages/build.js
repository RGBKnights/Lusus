import React from 'react';

import { Token, Grid } from 'boardgame.io/ui';
import { getUnitElement } from '../svg/units';
import { getCubitElement } from '../svg/cubits';

// Bootstrap
import { 
  Container, 
  Row, Col,
  Navbar, NavbarBrand, 
  Form, FormGroup, Label, Input, Button,
  Media,
  ButtonGroup 
} from 'reactstrap';
import NumericInput from 'react-numeric-input';

import { ToastContainer, toast } from 'react-toastify';

import { GameLogic } from '../../game/logic'
import { Database } from '../../game/database'

const LOCATION_STORAGE_KEY = 'builds'

class BuildPage extends React.Component {

  constructor(props) {
    super(props);

    let size = 8;
    this.background = {};
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const key = `${x},${y}`;
        this.background[key] = ((x + y) % 2 === 0) ? '#D9D6D6' :'#ADAAAA';
      }
    }

    this.style = { strokeWidth: 0.02, stroke: '#000000' };

    this.onRulePassPlayChanged = this.onRulePassPlayChanged.bind(this);
    this.onRulePassMoveChanged = this.onRulePassMoveChanged.bind(this);
    this.onRuleFeePassChanged = this.onRuleFeePassChanged.bind(this);
    this.onRuleFreeDrawChanged = this.onRuleFreeDrawChanged.bind(this);
    this.onClearDeck = this.onClearDeck.bind(this);
    this.onResetDeck = this.onResetDeck.bind(this);
    this.onSetDeck = this.onSetDeck.bind(this);
    this.onClearDeployment = this.onClearDeployment.bind(this);
    this.onResetDeployment = this.onResetDeployment.bind(this);
    this.onRoyalDeployment = this.onRoyalDeployment.bind(this);
    this.onFortifyDeployment = this.onFortifyDeployment.bind(this);
    this.onHostageDeployment = this.onHostageDeployment.bind(this);
    this.onClickBlack = this.onClickBlack.bind(this);
    this.onClickWhite = this.onClickWhite.bind(this);
    this.onClickField = this.onClickField.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);

    let deck = [];
    for (const key in Database.cubits) {
      if (Database.cubits.hasOwnProperty(key)) {
        const data = Database.cubits[key];
        if(data.enabled) {
          deck.push({ type: data.key, amount: 1 });
        }
      }
    }

    let defaults = GameLogic.getDefaultSetup();

    this.state = {
      selection: null,
      name: 'Custom',
      rules: defaults.rules,
      field: defaults.field,
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

  onClearDeck() {
    let deck = this.state.deck;
    for (let i = 0; i < deck.length; i++) {
      deck[i].amount = 0;
    }
    this.setState({ deck: deck });
  }

  onResetDeck() {
    let deck = this.state.deck;
    for (let i = 0; i < deck.length; i++) {
      deck[i].amount = 1;
    }
    this.setState({ deck: deck });
  }

  onSetDeck() {
    let amount = prompt("Please enter the amount");

    let deck = this.state.deck;
    for (let i = 0; i < deck.length; i++) {
      deck[i].amount = parseInt(amount);
    }
    this.setState({ deck: deck });
  }

  onClearDeployment() {
    let field = this.state.field;
    for (let i = 0; i < field.length; i++) {
      field[i].position = null;
    }

    this.setState({ field: field });
  }

  onResetDeployment() {
    let defaults = GameLogic.getDefaultSetup();
    this.setState({ field: defaults.field });
  }

  customDeployment(layout) {
    let field = this.state.field;
    for (let i = 0; i < field.length; i++) {
      field[i].position = null;
    }

    for (const l of layout) {
      let i = field.findIndex(_ => _.layout.r === l.r && _.layout.f === l.f && _.ownership === l.o);
      field[i].position = {x: l.x, y: l.y};
    }
    this.setState({ field: field });
  }

  onRoyalDeployment() {
    let layout = [
      { r: 1, f: 0, o: '0', x: 6, y: 6 },
      { r: 1, f: 1, o: '0', x: 4, y: 6 },
      { r: 1, f: 2, o: '0', x: 5, y: 6 },
      { r: 1, f: 3, o: '0', x: 7, y: 6 },
      { r: 1, f: 4, o: '0', x: 7, y: 7 },
      { r: 1, f: 5, o: '0', x: 5, y: 7 },
      { r: 1, f: 6, o: '0', x: 4, y: 7 },
      { r: 1, f: 7, o: '0', x: 6, y: 7 },
      { r: 1, f: 0, o: '1', x: 1, y: 6 },
      { r: 1, f: 1, o: '1', x: 3, y: 6 },
      { r: 1, f: 2, o: '1', x: 2, y: 6 },
      { r: 1, f: 3, o: '1', x: 0, y: 6 },
      { r: 1, f: 4, o: '1', x: 0, y: 7 },
      { r: 1, f: 5, o: '1', x: 2, y: 7 },
      { r: 1, f: 6, o: '1', x: 3, y: 7 },
      { r: 1, f: 7, o: '1', x: 1, y: 7 },
    ];

    this.customDeployment(layout);
  }

  onFortifyDeployment() {
    let layout = [
      { r: 0, f: 0, o: '0', x: 3, y: 7 },
      { r: 0, f: 1, o: '0', x: 4, y: 6 },
      { r: 0, f: 2, o: '0', x: 5, y: 5 },
      { r: 0, f: 3, o: '0', x: 6, y: 4 },
      { r: 0, f: 4, o: '0', x: 7, y: 3 },
      { r: 0, f: 5, o: '0', x: 5, y: 6 },
      { r: 0, f: 6, o: '0', x: 6, y: 5 },
      { r: 0, f: 7, o: '0', x: 4, y: 4 },
      { r: 1, f: 0, o: '0', x: 4, y: 7 },
      { r: 1, f: 1, o: '0', x: 6, y: 7 },
      { r: 1, f: 2, o: '0', x: 5, y: 7 },
      { r: 1, f: 3, o: '0', x: 6, y: 6 },
      { r: 1, f: 4, o: '0', x: 7, y: 7 },
      { r: 1, f: 5, o: '0', x: 7, y: 6 },
      { r: 1, f: 6, o: '0', x: 7, y: 5 },
      { r: 1, f: 7, o: '0', x: 7, y: 4 },
      { r: 0, f: 0, o: '1', x: 4, y: 0 },
      { r: 0, f: 1, o: '1', x: 3, y: 1 },
      { r: 0, f: 2, o: '1', x: 2, y: 2 },
      { r: 0, f: 3, o: '1', x: 1, y: 3 },
      { r: 0, f: 4, o: '1', x: 0, y: 4 },
      { r: 0, f: 5, o: '1', x: 2, y: 1 },
      { r: 0, f: 6, o: '1', x: 1, y: 2 },
      { r: 0, f: 7, o: '1', x: 3, y: 3 },
      { r: 1, f: 0, o: '1', x: 3, y: 0 },
      { r: 1, f: 1, o: '1', x: 1, y: 0 },
      { r: 1, f: 2, o: '1', x: 2, y: 0 },
      { r: 1, f: 3, o: '1', x: 1, y: 1 },
      { r: 1, f: 4, o: '1', x: 0, y: 0 },
      { r: 1, f: 5, o: '1', x: 0, y: 1 },
      { r: 1, f: 6, o: '1', x: 0, y: 2 },
      { r: 1, f: 7, o: '1', x: 0, y: 3 },
    ];

    this.customDeployment(layout);
  }

  onHostageDeployment() {
    let layout = [
      { r: 1, f: 0, o: '0', x: 6, y: 7 },
      { r: 1, f: 2, o: '0', x: 5, y: 7 },
      { r: 1, f: 3, o: '0', x: 7, y: 7 },
      { r: 1, f: 4, o: '0', x: 6, y: 6 },
      { r: 1, f: 5, o: '0', x: 7, y: 6 },
      { r: 1, f: 7, o: '0', x: 7, y: 5 },
      { r: 0, f: 0, o: '0', x: 0, y: 4 },
      { r: 0, f: 1, o: '0', x: 1, y: 3 },
      { r: 0, f: 2, o: '0', x: 2, y: 4 },
      { r: 0, f: 3, o: '0', x: 3, y: 2 },
      { r: 0, f: 4, o: '0', x: 4, y: 6 },
      { r: 0, f: 5, o: '0', x: 5, y: 4 },
      { r: 0, f: 6, o: '0', x: 6, y: 5 },
      { r: 0, f: 7, o: '0', x: 7, y: 4 },
      { r: 1, f: 0, o: '1', x: 1, y: 0 },
      { r: 1, f: 2, o: '1', x: 2, y: 0 },
      { r: 1, f: 3, o: '1', x: 0, y: 0 },
      { r: 1, f: 4, o: '1', x: 1, y: 1 },
      { r: 1, f: 5, o: '1', x: 0, y: 1 },
      { r: 1, f: 7, o: '1', x: 0, y: 2 },
      { r: 0, f: 0, o: '1', x: 0, y: 3 },
      { r: 0, f: 1, o: '1', x: 1, y: 2 },
      { r: 0, f: 2, o: '1', x: 2, y: 3 },
      { r: 0, f: 3, o: '1', x: 3, y: 1 },
      { r: 0, f: 4, o: '1', x: 4, y: 5 },
      { r: 0, f: 5, o: '1', x: 5, y: 3 },
      { r: 0, f: 6, o: '1', x: 6, y: 4 },
      { r: 0, f: 7, o: '1', x: 7, y: 3 },
    ];

    this.customDeployment(layout);
  }

  onClickBlack({x,y}) {
    let unit = this.state.field.find(_ => _.layout.f === x && _.layout.r === y && _.ownership === '1');
    this.setState({ selection: unit });
  }

  onClickWhite({x,y}) {
    let unit = this.state.field.find(_ => _.layout.f === x && _.layout.r === y && _.ownership === '0');
    this.setState({ selection: unit });
  }

  onClickField({x,y}) {
    let unit = this.state.selection;
    if(unit) {
      unit.position = {x,y};
      this.setState({ selection: null });
    }
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
    let items = [];
    for (const item of this.state.deck) {
      let key = "cubit_" + item.type;
      let data = Database.cubits[item.type];
      if(data) {
        let cubit = { type: item.type, ownership: '1' };
        let element = getCubitElement(cubit, true);
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

    let deployment = [];
    let layout = { '0': [], '1': [] };
    for (const unit of this.state.field) {
      let element = getUnitElement(unit);
      layout[unit.ownership].push(<Token key={unit.id} x={unit.layout.f} y={unit.layout.r}>{ element }</Token>);
      if(unit.position) {
        deployment.push(<Token key={unit.id} x={unit.position.x} y={unit.position.y}>{ element }</Token>);
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
              <h5>Rules <small>(Overrides)</small></h5>
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
              <div className="float-right">
                <ButtonGroup>
                  <Button color="primary" onClick={this.onClearDeck}>Clear</Button>
                  <Button color="primary" onClick={this.onResetDeck}>Reset</Button>
                  <Button color="primary" onClick={this.onSetDeck}>Set</Button>
                </ButtonGroup>
              </div>
              <div>
                <h5>Deck</h5>
              </div>
              <br />
              { items }
            </Col>
          </Row>
          <hr className="highlighted" />
          <Row>
            <Col>
              <div className="float-right">
                <ButtonGroup>
                  <Button color="primary" onClick={this.onClearDeployment}>Clear</Button>
                  <Button color="primary" onClick={this.onResetDeployment}>Reset</Button>
                </ButtonGroup>
                &nbsp;
                <ButtonGroup>
                  <Button color="warning" onClick={this.onRoyalDeployment}>Royals</Button>
                  <Button color="warning" onClick={this.onFortifyDeployment}>Fortify</Button>
                  <Button color="warning" onClick={this.onHostageDeployment}>Hostage</Button>
                </ButtonGroup>
              </div>
              <div>
                <h5>Deployment <small>(Black on Top)</small></h5>
              </div>
              <br />
              <Row>
                <Col>
                  <Grid rows={8} cols={8} colorMap={this.background} style={this.style} onClick={this.onClickField}>
                    { deployment }
                  </Grid>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <Grid rows={2} cols={8} colorMap={this.background} style={this.style} onClick={this.onClickBlack}>
                        { layout['1'] }
                      </Grid>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <Grid rows={2} cols={8} colorMap={this.background} style={this.style} onClick={this.onClickWhite}>
                        { layout['0'] }
                      </Grid>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <br />
        </Container>
        <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_CENTER} />
      </section>
    );
  }
}

export default BuildPage;