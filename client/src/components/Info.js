import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {IconButton} from '@material-ui/core'
import {Edit} from '@material-ui/icons'

const styles = () => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: 20
  },
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
    paddingLeft: 15,
    paddingBottom: 15,
    borderRadius: 20,
    fontSize: 17,
    height: 300,
    width: 300,
    boxShadow: '10px 10px 5px #888888',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  item: {
    lineHeight: 3
  }
})

const Info = (props) => {
  const {classes, info} = props
  return (
    <article className={classes.root}>
      <main className={classes.content}>
        <h3>个人信息</h3>
        <div>
          <div className={classes.item}>
            <label>用户ID:&emsp;</label>
            <span>{info.userId}</span>
          </div>
          <div className={classes.item}>
            <label>昵称:&emsp;</label>
            <span>{info.username}</span>
          </div>
          <div className={classes.item}>
            <label>手机号:&emsp;</label>
            <span>{info.phone}</span>
          </div>
        </div>
        <IconButton color='primary'>
          <Edit/>
        </IconButton>
      </main>
    </article>
  )
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired
}

export default withStyles(styles)(Info)