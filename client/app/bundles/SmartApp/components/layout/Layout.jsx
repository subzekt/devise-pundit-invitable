import React, {Component, PropTypes} from 'react';
// import Title from 'react-title-component';
import AppBar from 'material-ui/AppBar';
import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {darkWhite, lightWhite, grey900, orangeA700, green500} from 'material-ui/styles/colors';
import AppNavDrawer from './AppNavDrawer';
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';
import Title from 'react-title-component';
import {Link} from 'react-router'
import Login from '../session/Login'
import Logout from '../session/Logout'
import { loginUser, logoutUser } from '../../actions/sessionActionCreators';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    width: PropTypes.number.isRequired,
    user: PropTypes.object
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object,
  };

  state = {
    navDrawerOpen: true,
  };

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }


  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme({
        palette: {
          warningColor: orangeA700,
          successColor: green500
        }
      }),
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  }


  getStyles() {
    const styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        paddingBottom: 50,
        minHeight: 400,
      },
      content: {
        margin: spacing.desktopGutter,
      },
      contentWhenMedium: {
        // margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      contentWhenLarge: {
        // margin: `${spacing.desktopGutter * 2}px`,
      },

      footer: {
        backgroundColor: grey900,
        color: darkWhite,
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356,
      },
      browserstack: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: '25px 15px 0',
        padding: 0,
        color: lightWhite,
        lineHeight: '25px',
        fontSize: 12,
      },
      browserstackLogo: {
        margin: '0 3px',
      },
      iconButton: {
        color: darkWhite,
      },
    };

    if (this.props.width === MEDIUM) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }
    if (this.props.width === LARGE) {
      styles.content = Object.assign(styles.content, styles.contentWhenLarge);
    }

    return styles;
  }

  handleTouchTapLeftIconButton = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  };

  handleChangeRequestNavDrawer = (open) => {
    this.setState({
      navDrawerOpen: open,
    });
  };

  handleChangeList = (event, value) => {
    this.context.router.push(value);
    this.setState({
      navDrawerOpen: false,
    });
  };

  handleChangeMuiTheme = (muiTheme) => {
    this.setState({
      muiTheme: muiTheme,
    });
  };

  render() {

    const { location, children, dispatch, user, isAuthenticated, errorMessage} = this.props;

    let {
      navDrawerOpen,
      loggedIn
    } = this.state;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const router = this.context.router;
    const styles = this.getStyles();
    const title =
      router.isActive('/dashboard') ? 'Dashboard' : '';

    let docked = false;
    let showMenuIconButton = true;
    if (this.props.width === LARGE ) {

      docked = true;
      navDrawerOpen = true;
      showMenuIconButton = false;

      styles.navDrawer = {
        zIndex: styles.appBar.zIndex - 1,
      };
      styles.root.paddingLeft = 256;
      styles.footer.paddingLeft = 256;
    }
    let sessionMarkup =
      isAuthenticated ?
        <Logout onLogoutClick={() => dispatch(logoutUser())} /> : ''

    return (
      <div>
        <Title render="Material-UI" />
        <AppBar
          onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
          title={title}
          zDepth={0}
          iconElementRight= {sessionMarkup}
          style={styles.appBar}
          showMenuIconButton={showMenuIconButton}
        />
        { isAuthenticated ?
          (title !== '' ?
              <div style={prepareStyles(styles.root)}>
                <div style={prepareStyles(styles.content)}>
                  {React.cloneElement(children, {
                    onChangeMuiTheme: this.handleChangeMuiTheme,
                    isAuthenticated: isAuthenticated,
                    user: user
                  })}
                </div>

              </div> :

              React.cloneElement(children, {
                onChangeMuiTheme: this.handleChangeMuiTheme,
                isAuthenticated: isAuthenticated,
                user: user
              })
          ) :
          <div style={prepareStyles(styles.root)}>
            <div style={prepareStyles(styles.content)}>
              <Login
                errorMessage={errorMessage}
                onLoginClick={ creds => dispatch(loginUser(creds)) }
              />
            </div>
          </div>
        }
        <AppNavDrawer
          style={styles.navDrawer}
          location={location}
          docked={docked}
          onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
          onChangeList={this.handleChangeList}
          open={navDrawerOpen}
          isAuthenticated = {isAuthenticated}
          dispatch={dispatch}
          user={user}
        />
        <div style={styles.footer}>
          <strong>Copyright © 2017 | All rights reserved. |  Powered by <a href="http://danpheinfotech.com" target="_blank">Danphe InfoTech</a>.</strong> | <a href="/terms">Terms</a>
        </div>
      </div>
    );
  }
}

export default withWidth()(Layout);