import React from 'react';
import { 
  Container, 
  Row, 
  Col
} from 'reactstrap';

export default class ChessBoard extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum diam non nibh pretium, non ornare felis faucibus. Nulla massa sem, luctus in lectus a, consectetur euismod felis. Donec bibendum mauris vel nisl gravida laoreet. Vivamus posuere mauris auctor quam tempus, sed ornare diam vulputate. Sed vitae eleifend dui. Nulla facilisi. Duis volutpat velit erat, eu pretium turpis sodales in. Ut interdum, eros quis ultrices tincidunt, erat eros molestie erat, eget semper nunc nisi eu est.</p>
          </Col>
        </Row>
      </Container>
    );
  }
}