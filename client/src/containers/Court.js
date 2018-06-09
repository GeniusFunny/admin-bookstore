import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import blue from '@material-ui/core/colors/blue'
import {Checkbox, IconButton, Table, TableBody, TableHead, TableCell, TableFooter, TableRow, Input} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {withStyles} from '@material-ui/core/styles'
import {GetBooksInCourt} from "../api/Api"
import Message from '../components/Message'

const styles = (theme) => ({
  root: {

  },
  header: {

  },
  main: {

  },
  item: {

  },
  count: {
    boxSizing: 'border-box',
    padding: 3,
    width: 40,
    fontSize: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class Court extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      Message: {
        message: '获取购物车失败',
        type: 'error',
        open: false
      }
    }
  }
  render () {
    const {classes} = this.props
    return (
      <article>
        {/*<header>购物车</header>*/}
        <main>
          <Message
            open={this.state.Message.open}
            type={this.state.Message.type}
            message={this.state.Message.message}
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox/>
                </TableCell>
                <TableCell>书名</TableCell>
                <TableCell>作者</TableCell>
                <TableCell>数量</TableCell>
                <TableCell>金额(元)</TableCell>
                <TableCell>
                  <div>
                    操作
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.data.map(item => (
                  <TableRow key={item.bookid}>
                    <TableCell>
                      <Checkbox/>
                    </TableCell>
                    <TableCell>{item.bookname}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>
                      <Input
                        value={item.count}
                        type='number'
                        className={classNames(classes.count, classes.input)}
                        onChange={this.handleCountChange}
                        id={item.bookid}
                      />
                    </TableCell>
                    <TableCell>{item.price * item.count}.00</TableCell>
                    <TableCell>
                      <IconButton>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </main>
        {/*<footer>*/}
          {/*提示*/}
        {/*</footer>*/}
      </article>
    )
  }
  componentDidMount () {
    this.getCourt()
  }
  getCourt = () => {
    GetBooksInCourt()
      .then(res => {
        if (res.status === 0) {
          this.setState({
            data: res.data
          })
        } else {
          this.setState({
            Message: {
              ...this.state.Message,
              open: true
            }
          })
        }
      })
  }
  handleCountChange = (e) => {
    this.setState({
      data: this.state.data.map((item, index) => ({
        ...item,
        count: index === e.target.id? e.target.value: item.count
      }))
    })
  }
}

Court.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Court)