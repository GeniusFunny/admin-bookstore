import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {asyncGetBill} from '../actions/bill'
import {asyncGetUserInfo} from '../actions/info'
import {withStyles} from '@material-ui/core/styles'
import {Divider} from '@material-ui/core'
import Bill from '../components/Bill'
import Info from '../components/Info'

const styles = () => ({
  root: {
    padding: 15
  }
})

class PersonalCenter extends Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    this.props.loadInfo()
    this.props.loadBill()
  }
  render () {
    const {classes, state, isAuth} = this.props
    console.log(this.props)
    return (
      <article className={classes.root}>
        <div hidden={!isAuth}>
          <h4>我的信息</h4>
          <Info info={state.info}/>
          <Divider/>
          <h4>我的账单</h4>
          <Bill billList={state.billList}/>
        </div>
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