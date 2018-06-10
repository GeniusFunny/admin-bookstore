import React from 'react'
import PropTypes from 'prop-types'
import {List, ListItemIcon,ListItem, ListItemText} from '@material-ui/core'
import {Link, Route} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import BookIcon from '@material-ui/icons/LibraryBooks'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const styles = () => ({
  root: {
    width: '100%',
    maxHeight: 360,
    background: 'linear-gradient(45deg, #e9edf3 30%, #edd5d1 90%)',
  }
})

const NavList = (props) => {
  const {classes, list} = props
  return (
    <div className={classes.root}>
      <List component='nav'>
        {/*{*/}
          {/*list.map(item => (*/}
            {/*<ListItem button>*/}
              {/*<Link to={item.path}>*/}
                {/*<ListItemIcon children={item.icon} />*/}
                {/*<ListItemText primary={item.siderBarName}/>*/}
              {/*</Link>*/}
              {/*<Route path={item.path} component={item.component}/>*/}
            {/*</ListItem>*/}
          {/*))*/}
        {/*}*/}
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon/>
          </ListItemIcon>
          <ListItemText primary='Dashboard'/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BookIcon/>
          </ListItemIcon>
          <ListItemText primary='Book Market'/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon/>
          </ListItemIcon>
          <ListItemText primary='Shopping Cart'/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon/>
          </ListItemIcon>
          <ListItemText primary='User Profile'/>
        </ListItem>
      </List>
    </div>
  )
}

NavList.protoTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired
}

export default withStyles(styles)(NavList)