import React from 'react';

// Bootstrap
import { 
  Container, 
  Row, Col,
  Navbar, NavbarBrand, Nav,
  Button,
  Form, FormGroup, Label, Input 
} from 'reactstrap';

const shortid = require('shortid');

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {player: '', code: ''};

    this.onCodeChange = this.onCodeChange.bind(this);
    this.onPlayerChange = this.onPlayerChange.bind(this);
    this.onHelp = this.onHelp.bind(this);
    this.onNewMatch = this.onNewMatch.bind(this);
    this.onJoinMatch = this.onJoinMatch.bind(this);
    this.onViewMatch = this.onViewMatch.bind(this);
  }

  onCodeChange(event) {
    this.setState({code: event.target.value});
  }

  onPlayerChange(event) {
    this.setState({player: event.target.value});
  }

  onHelp() {
    let url = '/help/';
    this.props.history.push(url);
  }
  
  onNewMatch() {
    let player = this.state.player ? this.state.player : Math.round(Math.random());
    let url = '/match/?p=' + player  + '&m=' + shortid.generate();
    this.props.history.push(url);
  }

  onJoinMatch() {
    if(this.state.code) {
      let code = this.state.code.trim();
      let player = code.substring(0, 1);
      let match = code.substring(2);
      let url = '/match/?p=' + player + '&m=' + match;
      this.props.history.push(url);
    }
  }

  onViewMatch() {
    if(this.state.code) {
      let code = this.state.code.trim();
      let match = code.substring(2);
      let url = '/match/?m=' + match;
      this.props.history.push(url);
    }
  }

  render() {
    return (
      <Container className="p-0">
        <Navbar color="light" expand="md" className="rounded-bottom p-0">
          <NavbarBrand className="p-0" style={{color: '#FFFFFF'}}>
            <img className="p-1"  height="32" src="/favicon.ico" alt="Logo"></img>
            <strong className="p-1">Lusus</strong> <small>Tactical Chess</small>
          </NavbarBrand>
          <Nav></Nav>
        </Navbar>
        <br />
        <Row>
          <Col>
            <div className="card">
              <div className="card-header text-center">
              <h5 className="p-1">The Basics</h5>
              </div>
              <ul className="list-group list-group-flush ">
                <li className="list-group-item text-center">
                  <p>
                    Hello!  Welcome to Lusus.  
                    The game that is like chess but with even more rules!  
                    To begin both you and your opponent will need to be on this screen on different devices.  
                    Then select the appropriate button to the right, if you are player 1 then click Start Match if you are player 2 select Join Match.  
                    Player one will need to send player 2 the game code, it will be added to your clipboard by selecting the share icon in the upper right hand corner.
                  </p>
                  <p>
                    For game rules and cubits collection please vist the
                    <br />
                    <Button onClick={this.onHelp} color="secondary">Help</Button>
                  </p>
                </li>
              </ul>
            </div>
          </Col>
          <Col>
            <div className="card">
              <div className="card-header text-center">
                <h5 className="p-1">New Match</h5>
              </div>
              <ul className="list-group list-group-flush ">
                <li className="list-group-item  text-center">
                  <Form>
                    <FormGroup>
                      <Input type="select" name="select" id="newPlayer" value={this.state.player} onChange={this.onPlayerChange}>
                        <option>Random</option>
                        <option value="0">White</option>
                        <option value="1">Black</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Button onClick={this.onNewMatch} color="success">Start Match</Button>
                    </FormGroup>
                  </Form>
                </li>
              </ul>
            </div>
            <br />
            <div className="card">
              <div className="card-header text-center">
              <h5 className="p-1">Join Match</h5>
              </div>
              <ul className="list-group list-group-flush ">
                <li className="list-group-item text-center">
                  <Form>
                    <FormGroup>
                      <Label>An opponent needs to share a code which can then be used to join or view their match.</Label>
                      <Input type="text" name="code" id="matchCode" placeholder="Code" value={this.state.code} onChange={this.onCodeChange} />
                    </FormGroup>
                    <FormGroup>
                      <Button onClick={this.onJoinMatch} color="primary">Join Match</Button> 
                      &nbsp;
                      <Button onClick={this.onViewMatch} color="info">View Match</Button>
                    </FormGroup>
                  </Form>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LandingPage;
