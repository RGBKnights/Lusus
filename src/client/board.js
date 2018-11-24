import React from 'react';
import PropTypes from 'prop-types';

// import { FaEye, FaUserAlt, FaClock, FaShareAlt, FaBolt, FaShoppingBag, FaChess, FaSquare } from 'react-icons/fa';
// import { FiWifiOff }from 'react-icons/fi';

import { ToastContainer, toast } from 'react-toastify';

// Bootstrap
import {
  Container,
  Row, Col,
  // Navbar, NavbarBrand, Nav, NavItem,
  // Button,
  // Badge,
  // Form, FormGroup, Label, Input 
} from 'reactstrap';

// UI
import { 
  // Token, Grid
} from 'boardgame.io/ui';

// import { getCubitElement } from './svg/cubits';
// import { getUnitElement } from './svg/units';

class GameTable extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    events: PropTypes.any.isRequired,
    gameID: PropTypes.string,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
  };

  constructor(params) {
    super(params);

    this.state = {
      selection: null,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.forceUpdate();
  };

  componentDidUpdate(props) {
    /*
    if(this.props.isActive === false) {
      return;
    }

    if (this.props.ctx.phase === GAME_PHASES.Play && props.ctx.phase !== GAME_PHASES.Play) {
      toast("Your Turn!");
    }
    */
  }

  render() {
    return (
      <Container className="game-board" fluid>
        <Row>
          <Col>
            <p>Test</p>
          </Col>
        </Row>
        <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_CENTER} />
      </Container>
    );
  }
}

export default GameTable;