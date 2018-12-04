import React from 'react';

// Bootstrap
import { 
  Container, 
  Row, Col,
  Navbar, NavbarBrand, Nav,
} from 'reactstrap';

class BuildPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // List
    // - [Id,Name]

    // Build
    // - id
    // - name
    // - rules { passPlay, passMove, freePass, freeDraw }
    // * board [] { type, position: {x,y} }
    // * field [] { type, player, position: {x,y}, layout: {r,f} } // just changing position
    // - deck [] { type, amount }

    return (
      <section className="p-0">
        <Navbar color="light" light expand="md" className="fixed-top rounded-bottom">
          <Container>
            <NavbarBrand className="p-0" href="/">
              <img className="p-1" height="32" src="/favicon.ico" alt="Logo"></img>
              <strong className="p-1">Lusus <small>Tactical Chess</small> Builder</strong>
            </NavbarBrand>
            <Nav></Nav>
          </Container>
        </Navbar>
        <Container className="body">
          <Row>
            <Col>
              
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default BuildPage;