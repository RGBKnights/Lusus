import React from 'react';

// Bootstrap
import { 
  Container, 
  Row, Col,
  Navbar, NavbarBrand, Nav
} from 'reactstrap';

class BuildPage extends React.Component {

  render() {
    // TODO: show grid and with tokens for each Cubit with selection for enabled/disabled

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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ante arcu, luctus sed turpis nec, commodo hendrerit massa. Cras sed tellus diam. Sed iaculis, lectus vitae ullamcorper mattis, velit lacus porttitor orci, a fermentum urna quam viverra orci. Aenean eu orci in tellus auctor faucibus. Nam et justo nec lectus mollis faucibus nec convallis dui. Integer scelerisque odio ex, vel interdum nisi bibendum non. Nulla mattis, risus id sagittis aliquam, magna dui varius leo, ut eleifend justo sapien ac felis. Nulla commodo luctus risus nec blandit. Cras non sapien sed velit feugiat ullamcorper ac at urna. Duis suscipit risus feugiat, mattis augue sit amet, blandit ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sagittis tristique lectus, non lobortis urna convallis hendrerit.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BuildPage;