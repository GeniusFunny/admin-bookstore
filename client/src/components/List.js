import React from 'react'
import PropTypes from 'prop-types'
import {List, ListItemIcon,ListItem, ListItemText} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

const styles = () => ({
  root: {
    width: '100%',
    maxHeight: 360,
    // background: 'linear-gradient(45deg, #e9edf3 30%, #edd5d1 90%)',
  }
})

const NavList = (props) => {
  const {classes, list} = props
  return (
    <div className={classes.root}>
      <List component='nav'>
        {
          list.map(item => (
            <Link to={item.path} style={{textDecoration: 'none'}}>
              <ListItem button>
                <ListItemIcon>
                  <item.icon/>
                </ListItemIcon>
                <ListItemText primary={item.sideBarName}/>
              </ListItem>
            </Link>
          ))
        }
      </List>
    </div>
  )
}

NavList.protoTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired
}

export default withStyles(styles)(NavList)