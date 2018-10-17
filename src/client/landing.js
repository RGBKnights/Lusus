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
      <Container fluid className="p-0">
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
          <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
            <div className="card">
              <div className="card-header text-center">
              <h5 className="p-1">Join Match</h5>
              </div>
              <ul className="list-group list-group-flush ">
                <li className="list-group-item text-center">
                  <Input type="text" name="code" id="matchCode" placeholder="Code" value={this.state.code} onChange={this.onInputChange} />
                  <br />
                  <Button onClick={this.onJoinMatch} color="primary">Join Match</Button>
                </li>
              </ul>
            </div>
            <br />
            <div className="card">
              <div className="card-header text-center">
                <h5 className="p-1">New Match</h5>
              </div>
              <ul className="list-group list-group-flush ">
                <li className="list-group-item  text-center">
                  <Button onClick={this.onNewMatch} color="primary">Start Match</Button>
                </li>
              </ul>
            </div>
            <br />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Landing;