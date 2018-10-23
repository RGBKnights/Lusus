import React from 'react';

// Bootstrap
import { 
  Container, 
  Row, Col,
  Navbar, NavbarBrand, Nav,
  Button,
  Input
} from 'reactstrap';

const uuidv4 = require('uuid/v4');

class Landing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {code: ''};

    this.onInputChange = this.onInputChange.bind(this);
    this.onNewMatch = this.onNewMatch.bind(this);
    this.onJoinMatch = this.onJoinMatch.bind(this);
  }

  onInputChange(event) {
    this.setState({code: event.target.value});
  }
  
  onNewMatch() {
    window.location = window.location.origin + "/?p=0&m=" + uuidv4();
  }

  onJoinMatch() {
    if(this.state.code) {
      window.location = window.location.origin + "/?p=1&m=" + this.state.code;
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
          <Nav>
           
          </Nav>
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
                  <p>Start a new match as player 1 (White)</p>
                  <Button onClick={this.onNewMatch} color="primary">Start Match</Button>
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
                  <p>Join a match as player 2 (Black)</p>
                  <Input type="text" name="code" id="matchCode" placeholder="Code" value={this.state.code} onChange={this.onInputChange} />
                  <br />
                  <Button onClick={this.onJoinMatch} color="primary">Join Match</Button>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Landing;