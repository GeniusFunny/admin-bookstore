import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Table, TableHead, TableRow, TableBody, TableCell, IconButton, TableFooter, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core'
import Message from '../components/Message'
import {Edit, Delete, Add, Close, Update} from '@material-ui/icons'
const styles = () => ({
  root: {

  },
  dialog: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
class BookManagement extends Component{
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      dialogTitle: '',
      currentItem: 0,
      currentItemInfo: {
        bookName: '',
        author: '',
        price: '',
        image: ''
      },
      Message: {
        message: '更新失败',
        type: 'error',
        open: false
      }
    }
  }
  changeCurrentItem = (event) => {
    let currentId = parseInt(event.currentTarget.id)
    this.setState({
      open: true,
      dialogTitle: '编辑书籍资料',
      currentItem: currentId,
      currentItemInfo: this.props.bookList.find(item => item.bookId === currentId)
    })
  }
  handleChange = (event) => {
    this.setState({
      currentItemInfo: {
        ...this.state.currentItemInfo,
        [event.target.id]: event.target.value
      }
    })
  }
  handleClose = () => {
    this.setState({
      open: false
    })
  }
  handleAdd = () => {
    this.setState({
      open: true,
      dialogTitle: '新增书籍',
      currentItem: -1,
      currentItemInfo: {
        bookName: '',
        author: '',
        price: ''
      }
    })
  }
  handleUpdate = () => {
    if (this.state.dialogTitle === '编辑书籍资料') {
      this.props.editBook(Object.assign({}, this.state.currentItemInfo, {bookId: this.state.currentItem}))
    } else {
      this.props.addBook(Object.assign({}, this.state.currentItemInfo, {bookId: this.state.currentItem}))
    }
  }
  handleDelete = (e) => {
    let id = parseInt(e.currentTarget.id)
    this.props.deleteBook({bookId: id})
  }
  render () {
    const {classes, bookList} = this.props
    const {open, currentItemInfo, dialogTitle, Message} = this.state
    return (
      <main className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>书名</TableCell>
              <TableCell>作者</TableCell>
              <TableCell>单价</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              bookList.map(item => (
                <TableRow key={item.bookId}>
                  <TableCell>{item.bookId}</TableCell>
                  <TableCell>{item.bookName}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.price}.00元</TableCell>
                  <TableCell>
                    <IconButton id={item.bookId} onClick={this.changeCurrentItem}>
                      <Edit/>
                    </IconButton>
                    <IconButton id={item.bookId} onClick={this.handleDelete}>
                      <Delete/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell/>
              <TableCell/>
              <TableCell>
                <IconButton onClick={this.handleAdd}>
                  <Add/>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Dialog
          open={open}
          fullWidth={true}
          className={classes.dialog}
        >
          {/*<Message*/}
            {/*type={Message.type}*/}
            {/*open={Message.open}*/}
            {/*message={Message.message}*/}
          {/*/>*/}
          <DialogTitle>
            {dialogTitle}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id='bookName'
              label='书名'
              value={currentItemInfo.bookName}
              onChange={this.handleChange}
              fullWidth={true}
            />
            <br/>
            <TextField
              id='author'
              label='作者'
              value={currentItemInfo.author}
              onChange={this.handleChange}
              fullWidth={true}
            />
            <br/>
            <TextField
              id='price'
              label='单价'
              value={currentItemInfo.price}
              type='number'
              onChange={this.handleChange}
              fullWidth={true}
            />
            <br/>
            <TextField
              id='image'
              label='书籍封面链接'
              value={currentItemInfo.image}
              onChange={this.handleChange}
              fullWidth={true}
            />
            <br/>
            <IconButton onClick={this.handleUpdate}>
              <Update/>
            </IconButton>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={this.handleClose}>
              <Close/>
            </IconButton>
          </DialogActions>
        </Dialog>
      </main>
    )
  }
}

BookManagement.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(BookManagement)

