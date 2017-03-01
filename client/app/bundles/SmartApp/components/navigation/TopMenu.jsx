import React, { Component, PropTypes } from 'react'
import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ContentAdd from 'material-ui/svg-icons/content/add';


export default class TopMenu extends Component {

  render() {
    const { onLogoutClick } = this.props
    const style = {
      display: 'inline-block',
      margin: '16px 0 16px 32px',
    };
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton tooltip="Add"><ContentAdd /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <div style={style}>
            <Menu>
              <MenuItem primaryText="Maps" />
              <MenuItem primaryText="Books" />
              <MenuItem primaryText="Flights" />
              <MenuItem primaryText="Apps" />
            </Menu>
          </div>
          <div style={style}>
            <Menu>
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help &amp; feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Sign out" />
            </Menu>
          </div>
        </IconMenu>
        <IconMenu
          iconButtonElement={<IconButton><ActionSettings /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Sign Out" onTouchTap={() => onLogoutClick()}/>
        </IconMenu>
      </div>
    )
  }

}

TopMenu.propTypes = {
  onLogoutClick: PropTypes.func.isRequired
}