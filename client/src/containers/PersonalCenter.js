import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {asyncGetBill} from '../actions/bill'
import {asyncGetUserInfo} from '../actions/info'
import {withStyles} from '@material-ui/core/styles'
import {Divider, Tabs, Tab, AppBar} from '@material-ui/core'
import Bill from '../components/Bill'
import Info from '../components/Info'

const styles = () => ({
  root: {}
})

class PersonalCenter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: 0
    }
  }
  componentDidMount () {
    this.props.loadInfo()
    this.props.loadBill()
  }
  changeTab = (event, value) => {
    this.setState({
      tab: value
    })
  }
  render () {
    const {classes, state} = this.props
    const tab = this.state.tab
    return (
      <article className={classes.root}>
        <AppBar position='static' color='default'>
          <Tabs value={tab} onChange={this.changeTab}>
            <Tab label='个人信息'/>
            <Tab label='账单'/>
          </Tabs>
        </AppBar>
        <main>
          {tab === 0 && <Info info={state.info}/>}
          {tab === 1 && <Bill billList={state.billList}/>}
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