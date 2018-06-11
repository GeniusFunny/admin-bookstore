import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {editBookCount, getBookList, cancelSelectBook, selectBook, deleteBook, purchase, asyncDeleteBook, asyncGetBookList, asyncEditBookCount} from '../actions/court'
import classNames from 'classnames'
import {Checkbox, IconButton, Table, TableBody, TableHead, TableCell, TableFooter, TableRow, Input} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {withStyles} from '@material-ui/core/styles'
import {GetBooksInCourt, EditCourtBookCount, DeleteBookFromCourt} from "../api/Api"
import Message from '../components/Message'
import SelectAllIcon from '@material-ui/icons/SelectAll'
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
    this.dispatch = this.props.dispatch
    this.state = {
      Message: {
        message: '获取购物车失败',
        type: 'error',
        open: false
      }
    }
  }
  render () {
    const {classes, state} = this.props
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
            {/*<TableBody>*/}
              {/*{*/}
                {/*state.map(item => (*/}
                  {/*<TableRow key={item.bookId}>*/}
                    {/*<TableCell>*/}
                      {/*<Checkbox*/}
                        {/*checked={item.isSelected}*/}
                        {/*id={item.bookId}*/}
                      {/*/>*/}
                    {/*</TableCell>*/}
                    {/*<TableCell>{item.bookName}</TableCell>*/}
                    {/*<TableCell>{item.author}</TableCell>*/}
                    {/*<TableCell>*/}
                      {/*<Input*/}
                        {/*value={item.count}*/}
                        {/*type='number'*/}
                        {/*className={classNames(classes.count, classes.input)}*/}
                        {/*onChange={this.handleCountChange}*/}
                        {/*onBlur={this.editBookCount}*/}
                        {/*id={item.bookId}*/}
                      {/*/>*/}
                    {/*</TableCell>*/}
                    {/*<TableCell>{item.price * item.count}.00</TableCell>*/}
                    {/*<TableCell>*/}
                      {/*<IconButton onClick={this.handleDeleteBook} id={item.bookId}>*/}
                        {/*<DeleteIcon/>*/}
                      {/*</IconButton>*/}
                    {/*</TableCell>*/}
                  {/*</TableRow>*/}
                {/*))*/}
              {/*}*/}
            {/*</TableBody>*/}
            <TableFooter>
              <TableRow>
                <TableCell>
                  <IconButton>
                    <SelectAllIcon/>
                  </IconButton>
                </TableCell>
                <TableCell/>
                <TableCell/>
                <TableCell>{this.state.totalCount || 0}</TableCell>
                <TableCell>{this.state.totalMoney || 0}.00</TableCell>
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
    console.log(this.props)
    // this.dispatch(asyncGetBookList())
    // this.getCourt()
  }
  handleDeleteAllBook = () => {
    console.log(123)
  }
  getCourt = () => {
    GetBooksInCourt()
      .then(res => {
        if (res.status === 0) {
          this.dispatch(getBookList(res.data.map(item => ({
            ...item,
            isSelected: false
          }))))
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
    this.dispatch(editBookCount(id, value))
  }

  handleDeleteBook = (e) => {
    let id = parseInt(e.currentTarget.id)
    DeleteBookFromCourt({bookId: id})
      .then(res => {
        console.log(res)
        this.dispatch(deleteBook(id))
      })
  }

  editBookCount = (e) =>  {
    let id = parseInt(e.target.id)
    let count = parseInt(e.target.value)
    EditCourtBookCount({bookId: id, count: count})
      .then(res => {
        this.dispatch(editBookCount(id, count))
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
  }
  computedBooksMoney = (data) => {
    if (data.length === 0) {
      return 0
    } else if (data.length === 1) {
      return data[0].price * data[0].count
    } else {
      return data.reduce((current, next) => current.price * current.count + next.price * next.count)
    }
  }
  computedBooksCount = (data) => {
    if (data.length === 0) {
      return 0
    } else if (data.length === 1) {
      return data[0].count
    } else {
      return data.reduce((current, next) => current.count + next.count)
    }
  }
}

Court.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const {court, postsByCourt} = state
  const res = postsByCourt[asyncGetBookList]
  return {
    res
  }
}

const mapDispatchToProps = dispatch => ({
  data: (id, count) => dispatch(editBookCount(id, count))
})
export default connect(mapStateToProps)(withStyles(styles)(Court))