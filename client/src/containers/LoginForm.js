import React, {Component} from 'react'
import {Button} from '@material-ui/core'
import BSInput from '../components/Input'
import {withStyles} from '@material-ui/core/styles'
import {Login} from '../api/Api'

const styles = () => ({
  body: {
    boxShadow: '10px 10px 5px #888888',
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 300,
    left: '50%',
    borderRadius: 20,
    transform: 'translate(-50%, -50%)',
    width: 500,
    padding: 30,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    background: 'linear-gradient(45deg, #64B5F6 30%, #18FFFF 90%)',
    color: '#ffffff',
    borderRadius: '30px',
    fontWeight: 200,
    width: 120,
    marginTop: 30
  },
  input: {
    width: 100
  },
  title: {
    fontSize: 20,
    fontWeight: 300
  }
})
class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.form = {
      username: (value) => ({
        name: '用户名',
        value: value,
        type: 'text',
        id: 'username',
        maxLength: 11
      }),
      password: (value) => ({
        name: '密码',
        value: value,
        type: 'password',
        id: 'password',
        maxLength: 12
      })
    }
    this.state = {
      username: this.form.username(),
      password: this.form.password()
    }
  }
  changeInputValue = (key, value) => {
    this.setState({
      [key]: this.form[key](value)
    })
  }
  buttonClick = () => {
    Login({username: this.state.username.value, password: this.state.password.value})
      .then(res => {
        console.log(res)
      })
  }
  render () {
    const {classes} = this.props
    return (
      <article className={classes.root}>
        <main className={classes.body}>
          <h3 className={classes.title}>前端杂货铺</h3>
          <div>
            <BSInput
              data={this.state.username}
              changeInputValue={(key, value) => this.changeInputValue(key, value)}
              width={270}
            />
          </div>
          <div>
            <BSInput
              data={this.state.password}
              changeInputValue={(key, value) => this.changeInputValue(key, value)}
              width={270}
            />
          </div>
          <Button
            className={classes.button}
            onClick={this.buttonClick}
          >
            Login
          </Button>
        </main>
      </article>
    )
  }
}

export default withStyles(styles)(LoginForm)