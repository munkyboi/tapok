import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostStory from '../story/PostStory';
import Notifications from './Notifications';
import { logoutUser } from '../../redux/actions/userActions';
// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import ExitIcon from '@material-ui/icons/ExitToApp';
// Icons
import HomeIcon from '@material-ui/icons/Home';

const styles = {
  root: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: '80px',
    height: 'auto'
  },
  menuButton: {
    marginRight: 2,
  },
  title: {
    flexGrow: 1,
  },
  loginButton: {
    backgroundColor: '#BD1550',
    color: '#ffffff'
  }
};

class Navbar extends Component {
  state = {
    loading: true
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      authenticated,
      loading
    } = this.props;

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Button
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              component={Link} to="/"
            >
              <img className={classes.logo} src='/logo-white.png' />
            </Button>
            <Typography variant="h6" className={classes.title}>
            </Typography>
            {authenticated ? (
              <Fragment>
                <PostStory />
                <Notifications />
                <MyButton tip="Logout" onClick={this.handleLogout}>
                  <ExitIcon />
                </MyButton>
              </Fragment>
            ) : (
              <Fragment>
                <Button className={classes.loginButton} component={Link} to="/login">
                  Login
                </Button>
                <Button className={classes.signupButton} color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </Fragment>
            )}
          </Toolbar>
          {loading &&
            <LinearProgress color="secondary" />
          }
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  loading: state.user.loading
});

const mapActionsToProps = { logoutUser };

export default connect(
    mapStateToProps,
    mapActionsToProps
  )(withStyles(styles)(Navbar));
