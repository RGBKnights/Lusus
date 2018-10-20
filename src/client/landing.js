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
              <h5 className="p-1">Welcome</h5>
              </div>
              <ul className="list-group list-group-flush ">
                <li className="list-group-item text-center">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pretium dictum sem, et scelerisque nisi rutrum vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed feugiat vulputate nulla. Donec non magna a ligula rhoncus fringilla. Integer dictum ligula quis tellus feugiat accumsan. Integer facilisis mi libero, et sodales lectus iaculis vel. Etiam consectetur ex a lorem bibendum, ac viverra mauris feugiat. Duis cursus suscipit lectus, sit amet efficitur metus aliquet semper. Proin fringilla odio mauris, faucibus commodo elit congue ut. Duis sit amet sem vitae augue cursus commodo ac sed mi. Phasellus at tempor ipsum.</p>
                  <p>Pellentesque vel lacus bibendum, consequat leo ac, consectetur tortor. Donec ut sapien suscipit ante tristique interdum at ut ante. Aliquam metus risus, venenatis non luctus eu, venenatis vel dolor. Aliquam erat volutpat. Donec in nisi mattis felis placerat commodo. Aliquam erat volutpat. Cras imperdiet scelerisque vestibulum. Nam ullamcorper, diam eu aliquet ornare, orci odio convallis enim, quis cursus lectus metus at tortor.</p>
                  <p>Suspendisse potenti. Suspendisse auctor pharetra facilisis. In hac habitasse platea dictumst. Nullam nec risus ut nisl pulvinar auctor quis at felis. Vestibulum pharetra tellus ut fermentum rutrum. Quisque mollis lectus ante, quis congue metus auctor non. Sed et turpis accumsan, pharetra turpis quis, condimentum orci. Integer sodales accumsan neque a venenatis.</p>
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