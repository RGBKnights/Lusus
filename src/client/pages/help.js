import React from 'react';

import { getCubitElement } from '../svg/cubits';
import { Token, Grid } from 'boardgame.io/ui';

// Bootstrap
import { 
  Container, 
  Row, Col,
  Navbar, NavbarBrand, Nav,
  Media
} from 'reactstrap';

import { Database } from '../../game/database';

class HelpPage extends React.Component {

  render() {
    let cubits = [];

    for (const key in Database.cubits) {
      if (Database.cubits.hasOwnProperty(key)) {
        const data = Database.cubits[key];
        const cubit = { type: data.key, ownership: '1'};
        let element = getCubitElement(cubit, true);

        let media = (
          <Media>
            <Media left href="#" className="p-1">
              <Grid rows={1} cols={1} style={{width:60}}>
                <Token x={0} y={0}>
                  { element }
                </Token>
              </Grid>
            </Media>
            <Media body>
              <Media heading>
                { data.name }
              </Media>
              { data.description }
            </Media>
          </Media>
        );

        cubits.push(media);
      }
    }

    return (
      <section className="p-0">
        <Navbar color="light" light expand="md" className="fixed-top rounded-bottom">
          <Container>
            <NavbarBrand className="p-0" href="/">
              <img className="p-1" height="32" src="/favicon.ico" alt="Logo"></img>
              <strong className="p-1">Lusus <small>Tactical Chess</small> Help</strong>
            </NavbarBrand>
            <Nav></Nav>
          </Container>
        </Navbar>
        <Container className="body">
          <Row>
            <Col>
            <h5>Rules</h5>
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
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 >Cubies</h5>
              { cubits }
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default HelpPage;
