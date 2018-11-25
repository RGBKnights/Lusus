import React from 'react';
import PropTypes from 'prop-types';

// import { FaEye, FaUserAlt, FaClock, FaShareAlt, FaBolt, FaShoppingBag, FaChess, FaSquare } from 'react-icons/fa';
// import { FiWifiOff }from 'react-icons/fi';
// import { Token, Grid } from 'boardgame.io/ui';

// Bootstrap
import { 
  // Form, FormGroup, Label, Input, Button,
  // Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

export class PlayView extends React.Component {
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
  }

  render() {
    return (
      <div>GAME PLAY</div>
    );
  }
}