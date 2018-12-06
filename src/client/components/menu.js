import React from 'react';
import PropTypes from 'prop-types';

// Bootstrap
import {
  Collapse,
  Row, Col,
  Navbar, NavbarBrand, NavbarToggler, Badge
} from 'reactstrap';

export class Menu extends React.Component {
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
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
  };

  constructor(params) {
    super(params);

    this.menuToggle = this.menuToggle.bind(this);

    this.state = {
      menuOpen: false,
    };
  }

  menuToggle() {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  render() {
    let defaults = {
      className: 'm-1'
    };

    const childern = React.Children.map(this.props.children, child => {
      let params = {...defaults, ...child.props};
      return React.cloneElement(child, params);
    });

    return (
    <Navbar color="light" light expand="md" className="p-0 fixed-top rounded-bottom">
      <NavbarBrand className="p-0" href="/">
        <img className="p-1" height="40" src="/favicon.ico" alt="Logo"></img>
        <strong className="p-1">Lusus</strong>
      </NavbarBrand>
      <Collapse  isOpen={this.state.menuOpen} navbar>
        <Row>
          <Col xs="12">
            <div className="text-light">
              <div title="Player"  className="d-inline p-1">
                Player <Badge>{ this.props.playerID === '0' ? 'white' : 'black' }</Badge>
              </div>
              <div title="Actions" className="d-inline p-1">
              Actions <Badge>{ this.props.G.players[this.props.playerID].actions }</Badge>
              </div>
              <div title="Bag" className="d-inline p-1">
                Bags <Badge>{ this.props.G.players[this.props.playerID].bag.length }</Badge>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="p-1">
          <Col xs="12">
            <div className="text-light">
              <div title="Turn" className="d-inline p-1">
                Turn <Badge>{ this.props.ctx.turn }</Badge>
              </div>
              <div title="Phase"  className="d-inline p-1">
                Phase <Badge>{ this.props.ctx.currentPlayer === '0' ? 'white' : 'black' }</Badge> <Badge>{ this.props.ctx.phase }</Badge>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="p-1">
          <Col xs="12">
            { childern }
          </Col>
        </Row>
      </Collapse>
      <NavbarToggler onClick={this.menuToggle} />
    </Navbar>
    );
  }
}