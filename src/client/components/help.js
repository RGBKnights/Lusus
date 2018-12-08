import React from 'react';
import PropTypes from 'prop-types';

import { Database } from '../../game/database';

// Bootstrap
import {
  Button,
} from 'reactstrap';

export class Help extends React.Component {
  static propTypes = {
    playerID: PropTypes.string,
    selection: PropTypes.any,
    onClearSelection: PropTypes.func,
  };

  static defaultProps = {
    playerID: null,
    selection: null,
    onClearSelection: () => {},
  };

  render() {
    if(this.props.playerID == null || this.props.selection == null ) {
      return <div></div>;
    }

    let deselection = <div className="float-right"><Button color="secondary" onClick={this.props.onClearSelection}>X</Button></div>;

    let obj = this.props.selection;
    if(obj.cubit) {
      let cubit = Database.cubits[obj.cubit.type];
      if(cubit.hidden && obj.cubit.ownership !== this.props.playerID) {
        return (
          <div className="text-light">
            { deselection }
            <strong>Hidden</strong><br />
            <span>Cubit</span> - <span>Unknown</span> - <span>Unknown</span><br />
          </div>
        );
      } else { 
        return (
          <div className="text-light">
            { deselection }
            <strong>{cubit.name}</strong> - <span>Cubit</span> - <span>{cubit.type}</span> - <span>{cubit.subordinate}</span><br />
            <span>{cubit.description}</span>
          </div>
        );
      }
    } else if(obj.unit) {
      let unit = Database.units[obj.unit.type];
      return (
        <div className="text-light">
          { deselection }
          <strong>{unit.name}</strong> - <span>Unit</span><br />
          <span>{unit.description}</span>
        </div>
      );
    } else {
      return <div></div>;
    }

    /*
    let cubit = Database.cubits[obj.type];
    let unit = Database.units[obj.type];
    if(cubit) {
      if(cubit.hidden && obj.ownership !== this.props.playerID) {
        return (
          <div className="text-light">
            { deselection }
            <strong>Hidden</strong><br />
            <span>Cubit</span> - <span>Unknown</span> - <span>Unknown</span><br />
          </div>
        );
      } else {
        return (
          <div className="text-light">
            { deselection }
            <strong>{cubit.name}</strong> - <span>Cubit</span> - <span>{cubit.type}</span> - <span>{cubit.subordinate}</span><br />
            <span>{cubit.description}</span>
          </div>
        );
      }
    } else if(unit) { 
      return (
        <div className="text-light">
          { deselection }
          <strong>{unit.name}</strong> - <span>Unit</span><br />
          <span>{unit.description}</span>
        </div>
      );
    } else {
      return <div></div>;
    }
    */
  }
}