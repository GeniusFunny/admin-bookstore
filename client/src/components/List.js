import React from 'react'
import PropTypes from 'prop-types'
import {List, ListItemIcon,ListItem, ListItemText} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import BookIcon from '@material-ui/icons/LibraryBooks'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const styles = theme => ({
  root: {
    width: '100%',
    maxHeight: 360,
    background: 'linear-gradient(45deg, #e9edf3 30%, #edd5d1 90%)',
  }
})

const NavList = (props) => {
  const {classes} = props
  return (
    <div className={classes.root}>
      <List component='nav'>
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
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavList)