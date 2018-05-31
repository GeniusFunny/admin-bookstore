import React, {Compoent} from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import {withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = {
  root: {
    marginLeft: 30 + 'px',
    marginRight: 10 + 'px',
    marginTop: 15 + 'px',
    marginBottom: 15 + 'px'
  },
  Input: {
    width: 350 + 'px'
  }
}
const bsInput = (props) => {
  function bindInputChange(e) {
    props.changeInputValue(e.target.id, e.target.value)
  }
  const {classes} = props
  const data = props.data
  return (
    <FormControl className={classes.root}>
      <InputLabel
        htmlFor="custom-css-input"
      >
        {data.name}
      </InputLabel>
      <Input
        value={data.value}
        className={classes.Input}
        type={data.type}
        onInput={bindInputChange}
        id={data.id}
      />
    </FormControl>
  )
}

bsInput.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(bsInput)