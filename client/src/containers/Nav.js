import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Drawer, AppBar, Toolbar, Typography, IconButton} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import NavList from '../components/List'
import {routes, PrivateRoute} from '../route'
import {GetBooksInCourt} from '../api/Api'
import Login from './LoginForm'
import Register from './RegisterForm'
const drawerWidth = 240

const styles =  theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // background: 'linear-gradient(85deg, #edd5d1 20%, #e9edf3 30%)',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    // background: 'linear-gradient(0deg, #e8edf0 90%, #edd5d0 30%)',
    height: 107 + 'vh',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    background:'linear-gradient(135deg, #edd5d1 5%, #e9edf3 15%)',
  }
})

class Nav extends Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    GetBooksInCourt()
    const { classes, theme, isAuth } = this.props

    return (
      <Router>
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap style={{fontSize: '18px', fontWeight: 300}}>
                前端杂货铺
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <NavList list={routes}/>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {
              routes.map(item => (
                item.isPublic ? <Route path={item.path} component={item.component} key={item.path}/> : <PrivateRoute path={item.path} component={item.component} key={item.path} isAuth={isAuth}/>
              ))
            }
            <Route
              path='/login'
              exact
              component={Login}
            />
            <Route
              path='/register'
              exact
              component={Register}
            />
          </main>
        </div>
      </Router>
    )
  }
}

Nav.protoTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}
const stateMapToProps = (state) => ({
  isAuth: state.login.isAuth
})
export default connect(stateMapToProps)(withStyles(styles, { withTheme: true})(Nav))

