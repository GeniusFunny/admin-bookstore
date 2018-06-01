import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {IconButton, Input} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import red from '@material-ui/core/colors/red'

const styles = (theme) => ({
  root: {

  },
  input: {
    width: 400
  }
})

const Search = (props) => {
  const {classes, data, keyWord} = props
  function handleInputChange(e) {
    console.log(e.target.value)
    props.changeKeyWord(e.target.value)
  }
  function bindClick() {
    props.clickSearch()
  }
  return (
    <div className={classes.root}>
      <Input placeholder={data} className={classes.input} onInput={handleInputChange} value={keyWord}/>
      <IconButton color={red[500]}>
        <SearchIcon onClick={bindClick}/>
      </IconButton>
    </div>
  )
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Search)
