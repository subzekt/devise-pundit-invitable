import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500, cyan800, darkWhite} from 'material-ui/styles/colors';


const SelectableList = makeSelectable(List);

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan500,
    paddingLeft: spacing.desktopGutter,
  },
  company: {

    marginBottom: 8,
    padding: 20,
    paddingLeft: spacing.desktopGutter,
    fontSize: 20,
    // background: '#057b8a',
    background: cyan800,
    color: darkWhite
  },
  version: {
    paddingLeft: spacing.desktopGutterLess,
    fontSize: 16,
  },
};

class AppNavDrawer extends Component {
  static propTypes = {
    docked: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    onChangeList: PropTypes.func.isRequired,
    onRequestChangeNavDrawer: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    style: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    user: PropTypes.object
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  handleRequestChangeLink = (event, value) => {
    window.location = value;
  };

  handleTouchTapHeader = () => {
    this.context.router.push('/');
    this.props.onRequestChangeNavDrawer(false);
  };

  render() {
    const {
      location,
      docked,
      onRequestChangeNavDrawer,
      onChangeList,
      open,
      style,
      user,
      dispatch, isAuthenticated, errorMessage
    } = this.props;


    return (
      <Drawer
        style={style}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeNavDrawer}
        containerStyle={{zIndex: zIndex.drawer - 100}}
      >
        <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
          Smart Thing
        </div>
        {
          isAuthenticated ?
            (
              user.role == 'user' ? (
                <SelectableList
                  value={location.pathname}
                  onChange={onChangeList}
                >
                  <ListItem
                    primaryText="Dashboard"
                    value = '/dashboard'
                  />
                </SelectableList>
              ) : (

                <SelectableList
                  value={location.pathname}
                  onChange={onChangeList}
                >
                  { user.role == 'admin' ? (
                    <ListItem
                      primaryText="Manage Users"
                      value = '/dashboard/users'
                    />

                  ) : '' }


                  <ListItem
                    primaryText="Invite Users"
                    value = '/dashboard/invite-users'
                  />
                </SelectableList>
              )

            ) :
            ''
        }
      </Drawer>
    );
  }
}

export default AppNavDrawer;
