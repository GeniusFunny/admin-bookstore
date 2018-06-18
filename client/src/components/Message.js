import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classNames from 'classnames'
import {Snackbar, SnackbarContent, Icon, IconButton} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/Warning'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import CloseIcon from '@material-ui/icons/Close'

const styles = (theme) => ({
  root: {

  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    fontSize: 20
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  messageIcon: {
    marginRight: theme.spacing.unit,
    opacity: 0.9
  }
})

const typeIcon = {
  success: CheckCircleIcon,
  info: InfoIcon,
  warning: WarningIcon,
  error: ErrorIcon
}
class Message extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {message, close, type, classes, className, open} = this.props
    const Icon = typeIcon[type]
    if (open) {
      setTimeout(() => {
        close()
      }, 1500)
    }
    return (
      <Snackbar
        open={open}
        anchorOrigin={{horizontal: 'center', vertical: 'top'}}
      >
        <SnackbarContent
          className={classNames(classes[type], className)}
          message={
            <span className={classes.message}>
              <Icon className={classNames(classes.icon, classes.messageIcon)}/>
              {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={close}
            >
              <CloseIcon
                className={classes.icon}
              />
            </IconButton>
          ]}
        />
      </Snackbar>
    )
  }
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'info', 'error', 'warning']).isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}
export default withStyles(styles)(Message)
