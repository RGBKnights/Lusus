import React from 'react';
import PropTypes from 'prop-types';

import { Database } from '../../game/database';

export class Help extends React.Component {
  static propTypes = {
    selection: PropTypes.any,
    playerID: PropTypes.string,
  };

  static defaultProps = {
    selection: null,
    playerID: null,
  };

  render() {
    if(this.props.playerID == null || this.props.selection == null ) {
      return <div></div>;
    }

    let obj = this.props.selection;
    let cubit = Database.cubits[obj.type];
    let unit = Database.units[obj.type];
    if(cubit) {
      if(cubit.hidden && obj.ownership !== this.props.playerID) {
        return (
          <div className="text-light">
            <strong>Hidden</strong><br />
            <span>Cubit</span> - <span>Unknown</span> - <span>Unknown</span><br />
          </div>
        );
      } else {
        return (
          <div className="text-light">
            <strong>{cubit.name}</strong><br />
            <span>Cubit</span> - <span>{cubit.type}</span> - <span>{cubit.subordinate}</span><br />
            <span>{cubit.description}</span>
          </div>
        );
      }
    } else if(unit) { 
      return (
        <div className="text-light">
          <strong>{unit.name}</strong><br />
          <span>Unit</span><br />
          <span>{unit.description}</span>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}