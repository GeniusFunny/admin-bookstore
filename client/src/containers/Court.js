import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {Checkbox, IconButton, Table, TableBody, TableHead, TableCell, TableFooter, TableRow, Input} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {withStyles} from '@material-ui/core/styles'
import {getAllProducts, asyncEditBookCount, asyncDeleteBook, selectBook, selectBookAll} from '../actions/court'
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
    this.state = {
      Message: {
        message: '获取购物车失败',
        type: 'error',
        open: false
      }
    }
  }
  componentDidMount () {
    this.props.onLoad()
  }

  handleDeleteBook = (e) => {
    let id = parseInt(e.currentTarget.id)
    this.props.onDelete(id)
  }

  editBookCount = (e) =>  {
    let id = parseInt(e.target.id)
    let count = parseInt(e.target.value)
    this.props.onEdit(id, count)
  }
  selectBook = (e) => {
    let id = parseInt(e.target.id)
    this.props.onSelect(id)
  }
  selectAll = () => {
    this.props.onSelectAll()
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
            <TableBody>
              {
                state.data.map(item => (
                  <TableRow key={item.bookId}>
                    <TableCell>
                      <Checkbox
                        checked={item.isSelected}
                        id={item.bookId}
                        onChange={this.selectBook}
                      />
                    </TableCell>
                    <TableCell>{item.bookName}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>
                      <Input
                        value={item.count}
                        type='number'
                        className={classNames(classes.count, classes.input)}
                        onChange={this.editBookCount}
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
                  <IconButton onClick={this.selectAll}>
                    <SelectAllIcon/>
                  </IconButton>
                </TableCell>
                <TableCell/>
                <TableCell/>
                <TableCell>{state.totalCount || 0}</TableCell>
                <TableCell>{state.totalMoney || 0}.00</TableCell>
                <TableCell>
                  <IconButton>
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
}

const mapStateToProps = (state) => ({
  state: state.court
})
const mapDispatchToProps = (dispatch) => ({
  onLoad: () => dispatch(getAllProducts()),
  onEdit: (bookId, count) => dispatch(asyncEditBookCount(bookId, count)),
  onDelete: (bookId) => dispatch(asyncDeleteBook(bookId)),
  onSelect: (bookId) => dispatch(selectBook(bookId)),
  onSelectAll: () => dispatch(selectBookAll())
})
Court.propTypes = {
  classes: PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Court))