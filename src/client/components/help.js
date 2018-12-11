import React from 'react';
import PropTypes from 'prop-types';

import { Database } from '../../game/database';

// Bootstrap
import {
  Button,
} from 'reactstrap';

export class Help extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    playerID: PropTypes.string.isRequired,
    selection: PropTypes.any,
    onClearSelection: PropTypes.func,
    onAction:  PropTypes.func,
  };

  static defaultProps = {
    playerID: null,
    selection: null,
    onClearSelection: () => {},
    onAction: () => {},
  };

  onAction(e, action) {
    let event = {
      type: 'action',
      action: action,
      unit: this.props.selection.unit,
      cubit: this.props.selection.cubit,
    };
    this.props.onAction(event);
  }

  render() {
    if(this.props.playerID == null || this.props.selection == null ) {
      return <div></div>;
    }

    let deselection = <Button className="m-1" color="secondary" onClick={this.props.onClearSelection}>X</Button>;

    let obj = this.props.selection;
    if(obj.cubit) {
      let cubit = Database.cubits[obj.cubit.type];
      if(obj.cubit.ownership === this.props.playerID) {
        let actions = [];
        for (const action of cubit.actions) {
          if(action.phase === this.props.ctx.phase) {
            actions.push(<Button key={'action_' + action.type} className="m-1" color="primary" onClick={(e) => this.onAction(e, action)}>{action.name}</Button>);
          }
        }

        return (
          <div className="text-light">
            <div className="float-right">
              { actions }
              { deselection }
            </div>
            <strong>{cubit.name}</strong> - <span>Cubit</span> - <span>{cubit.type}</span> - <span>{cubit.subordinate}</span><br />
            <span>{cubit.description}</span>
          </div>
        );
      } if(cubit.hidden) { 
        return (
          <div className="text-light">
            <div className="float-right">
              { deselection }
            </div>
            <strong>Hidden</strong><br />
            <span>Cubit</span> - <span>Unknown</span> - <span>Unknown</span><br />
          </div>
        );
      } else {
        return (
          <div className="text-light">
            <div className="float-right">
              { deselection }
            </div>
            <strong>{cubit.name}</strong> - <span>Cubit</span> - <span>{cubit.type}</span> - <span>{cubit.subordinate}</span><br />
            <span>{cubit.description}</span>
          </div>
        );
      }
    } else if(obj.unit) {
      let unit = Database.units[obj.unit.type];
      let actions = [];
      for (const action of unit.actions) {
        if(action.phase === this.props.ctx.phase) {
          actions.push(<Button key={'action_' + action.type} className="m-1" color="primary" onClick={(e) => this.onAction(e, action)}>{action.name}</Button>);
        }
      }

      return (
        <div className="text-light">
          <div className="float-right">
            { actions }
            { deselection }
          </div>
          <strong>{unit.name}</strong> - <span>Unit</span><br />
          <span>{unit.description}</span>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}