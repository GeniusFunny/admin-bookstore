import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'

const styles = () => ({
  root: {
    paddingLeft: 15,
    paddingBottom: 15,
    fontSize: 15,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between'
  }
})

const Info = (props) => {
  const {classes, info} = props
  return (
    <div className={classes.root}>
      <div>
        <label>昵称:&emsp;</label>
        <span>{info.username}</span>
      </div>
      <div>
        <label>手机号:&emsp;</label>
        <span>{info.phone}</span>
      </div>
      <div>
        <label>用户ID:&emsp;</label>
        <span>{info.userId}</span>
      </div>
    </div>
  )
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired
}

export default withStyles(styles)(Info)