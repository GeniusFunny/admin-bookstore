import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Checkbox, IconButton, Table, TableBody, TableHead, TableCell, TableFooter, TableRow, Input} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {withStyles} from '@material-ui/core/styles'
import {GetBooksInCourt, EditCourtBookCount, DeleteBookFromCourt} from "../api/Api"
import Message from '../components/Message'
import SelectAllIcon from '@material-ui/icons/SelectAll'
import {find} from '../utils/utils'

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
                <TableCell/>
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
                  <TableRow key={item.bookId}>
                    <TableCell>
                      <Checkbox
                        checked={item.isSelected}
                        id={item.bookId}
                      />
                    </TableCell>
                    <TableCell>{item.bookname}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>
                      <Input
                        value={item.count}
                        type='number'
                        className={classNames(classes.count, classes.input)}
                        onChange={this.handleCountChange}
                        onBlur={this.editBookCount}
                        id={item.bookId}
                      />
                    </TableCell>
                    <TableCell>{item.price * item.count}.00</TableCell>
                    <TableCell>
                      <IconButton onClick={this.handleDeleteBook} id={item.bookId}>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <IconButton>
                    <SelectAllIcon/>
                  </IconButton>
                </TableCell>
                <TableCell/>
                <TableCell/>
                <TableCell>199</TableCell>
                <TableCell>1000.00</TableCell>
                <TableCell>
                  <IconButton onClick={this.handleDeleteAllBook}>
                    <DeleteIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableFooter>
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
  handleDeleteAllBook = () => {
    console.log(123)
  }
  getCourt = () => {
    GetBooksInCourt()
      .then(res => {
        if (res.status === 0) {
          this.setState({
            data: res.data.map(item => ({
              ...item,
              isSelected: false
            })),
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
    let id = parseInt(e.target.id)
    let value = parseInt(e.target.value)
    this.setState({
      data: this.state.data.map(item => ({
        ...item,
        count: item.bookId === id? value: item.count
      }))
    })
  }
  handleDeleteBook = (e) => {
    let id = parseInt(e.currentTarget.id)
    DeleteBookFromCourt({bookId: id})
      .then(res => {
        console.log(res)
        this.setState({
          data: this.state.data.filter(item => item.bookId !== id)
        })
      })
  }
  editBookCount = (e) =>  {
    let id = parseInt(e.target.id)
    let count = parseInt(e.target.value)
    EditCourtBookCount({bookId: id, count: count})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
  }
  computedBooksCount = () => {
    let total = this.state.data.reduce()
  }
}

Court.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Court)