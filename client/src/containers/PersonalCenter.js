import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {asyncGetBill} from '../actions/bill'
import {asyncGetUserInfo} from '../actions/info'
import {withStyles} from '@material-ui/core/styles'
import Bill from '../components/Bill'
import Info from '../components/Info'
import Collect from '../components/Collect'

const styles = () => ({
  root: {},
  content: {
    display: 'flex',
    flexFlow: 'row nowrap'
  }
})

class PersonalCenter extends Component {
  componentDidMount () {
    this.props.loadInfo()
    this.props.loadBill()
  }
  render () {
    const {classes, state} = this.props
    return (
      <article className={classes.root}>
        <main className={classes.content}>
          <Info info={state.info}/>
          <Collect/>
          <Bill billList={state.billList}/>
        </main>
      </article>
    )
  }
}


PersonalCenter.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  state: state.personalCenter,
  isAuth: state.login.isAuth
})
const mapDispatchToProps = (dispatch) => ({
  loadBill: () => dispatch(asyncGetBill()),
  loadInfo: () => dispatch(asyncGetUserInfo())
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PersonalCenter))