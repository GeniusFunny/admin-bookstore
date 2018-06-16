import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'

const styles = () => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: 20
  },
  main: {
    display: 'flex',
    flexFlow: 'column nowrap',
    paddingLeft: 15,
    paddingBottom: 15,
    borderRadius: 20,
    height: 600,
    fontSize: 15,
    width: 400,
    boxShadow: '10px 10px 5px #888888',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  book: {
    width: 50,
    height: 50
  }
})
const Collect = (props) => {
  const {classes} = props
  return (
    <article className={classes.root}>
      <main className={classes.main}>
        <h3>我的收藏</h3>
        <div className={classes.content}>
          <div className={classes.book}/>
        </div>
      </main>
    </article>
  )
}

Collect.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Collect)