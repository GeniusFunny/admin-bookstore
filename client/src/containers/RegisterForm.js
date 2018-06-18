import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import BSInput from '../components/Input'
import {asyncRegister} from '../actions/register'

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    background: 'linear-gradient(135deg, #edd5d1 5%, #e9edf3 15%)',
    minHeight: 100 + 'vh',
  },
  header: {
    container: {
      textAlign: 'center'
    },
    title: {
      color: '#333',
      fontSize: 22 + 'px',
      fontWeight: 300
    },
    intro: {
      color: '#666'
    }
  },
  body: {
    backgroundColor: '#ffffff'
  },
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
    border: '1px solid #e5e5e5',
    borderRadius: 5 + 'px',
    padding: 30 + 'px'
  },
  label: {
    fontSize: 12 + 'px',
    color: '#a1a1a1',
    fontWeight: 200,
    marginRight: 20 + 'px'
  },
  option: {
    container: {
      marginTop: '30px',
      textAlign: 'center'
    },
    checkBox: {
      fontSize: 12 + 'px',
      color: '#afafaf',
      fontWeight: 200,
    },
    button: {
      color: '#fff',
      padding: '12px 0px',
      marginRight: 30 + 'px',
      border: 'none',
      borderRadius: 100 + 'px',
      fontSize: 16 + 'px',
      width: 160 + 'px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      fontWeight: 200
    }
  },
  footer: {
    textAlign: 'center'
  }
}


class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.form = {
      password: (value = '') =>  (
        {
          name: '密码',
          value: value,
          type: 'password',
          id: 'password',
          maxLength: 16
        }
      ),
      phone: (value = '') => (
        {
          name: '手机号',
          value: value,
          type: 'text',
          id: 'phone',
          maxLength: 11
        }
      )
    }
    this.state = {
      phone: this.form.phone(),
      password: this.form.password(),
      isAgree: true
    }
  }

  changeInputValue = (key, value) => {
    this.setState({
      [key]: this.form[key](value)
    })
  }
  buttonClick = () => {
    this.props.onRegister(this.getInfo())
  }
  checkBoxClick = () => {
    this.setState({
      isAgree: !this.state.isAgree
    })
  }
  getInfo = () => ({
    password: this.state.password.value,
    phone: parseInt(this.state.phone.value)
  })
  render() {
    console.log(this.props)
    const {isAuth} = this.props
    if (isAuth) {
      return <Redirect to='/personalCenter'/>
    }
    return (
      <section style={styles.container}>
        <header style={styles.header.container}>
          <h3 style={styles.header.title}>Sign up, it's free.</h3>
          <p style={styles.header.intro}>It is a long established fact that a reader will be distracted</p>
        </header>
        <div style={styles.body}>
          <div style={styles.form}>
            <div>
              <BSInput
                data={this.state.phone}
                changeInputValue={(key, value) => this.changeInputValue(key, value)}
                width={250}
              />
              <label style={styles.label}>（手机号将作为登录名使用）</label>
            </div>
            <div>
              <BSInput
                data={this.state.password}
                changeInputValue={(key, value) => this.changeInputValue(key, value)}
                width={250}
              />
              <label style={styles.label}>（密码由6～16英文字母或阿拉伯数字组成）</label>
            </div>
            <div style={styles.option.container}>
              <Button
                onClick={this.buttonClick}
                disabled={!this.state.isAgree}
                variant="raised"
                color="secondary"
                style={styles.option.button}
              >
                注册
              </Button>
              <Checkbox
                onChange={this.checkBoxClick}
                checked={this.state.isAgree}
                color="primary"
              />
              <label style={styles.option.checkBox}>我已经阅读了<a href='/'>用户协议</a>，并且同意注册</label>
            </div>
            <p>
              已经注册？前往<Link to='/login'>登录</Link>
            </p>
          </div>
        </div>
      </section>
    )
  }
}
const stateMapToProps = (state) => ({
  isAuth: state.login.isAuth
})
const dispatchMapToProps = (dispatch) => ({
  onRegister: (data) => dispatch(asyncRegister(data))
})
export default connect(stateMapToProps, dispatchMapToProps)(RegisterForm)