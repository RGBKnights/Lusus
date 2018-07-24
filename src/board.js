import React from 'react';
import PropTypes from 'prop-types';
import { 
  Container, 
  Row, 
  Col,
  Alert
} from 'reactstrap';

function ConnectionStatus(props) {
  if (props.connected) {
    return (
      <Alert color="success"><strong>Connected!</strong></Alert>
    );
  } else {
    return (
      <Alert color="danger"><strong>Disconnected!</strong></Alert>
    );
  }
}

export default class ChessBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
  };

  render() {
    let connected = (this.props.isMultiplayer && this.props.isConnected);

    return (
      <Container>
        <Row>
          <Col>
            <h1>Project Lusus</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum diam non nibh pretium, non ornare felis faucibus. Nulla massa sem, luctus in lectus a, consectetur euismod felis. Donec bibendum mauris vel nisl gravida laoreet. Vivamus posuere mauris auctor quam tempus, sed ornare diam vulputate. Sed vitae eleifend dui. Nulla facilisi. Duis volutpat velit erat, eu pretium turpis sodales in. Ut interdum, eros quis ultrices tincidunt, erat eros molestie erat, eget semper nunc nisi eu est.</p>
            <ConnectionStatus connected={connected}></ConnectionStatus>
          </Col>
        </Row>
      </Container>
    );
  }
}