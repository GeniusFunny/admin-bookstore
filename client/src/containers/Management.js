import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {Tabs, Tab, AppBar} from '@material-ui/core'
import BillManagement from './BillManagement'
import BookManagement from './BookManagement'
import UserManagement from './UserManagement'
import {
  asyncGetUsers,
  asyncEditBill,
  asyncGetBill,
  asyncGetBookList,
  asyncAddBook,
  asyncEditBook,
  asyncDeleteBook,
  asyncFindBook
} from '../actions/management'
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    fontSize: 16,
    fontWeight: 200
  }
})

class Management extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: 0,
      keyWord: ''
    }
  }
  changeTab = (event, value) => {
    this.setState({
      tab: value
    })
  }
  render () {
    const {classes, addBook, editBook, deleteBook, findBook, editBill} = this.props
    const {tab, keyWord} = this.state
    const {userList, billList, bookList} = this.props.state
    return (
      <article className={classes.root}>
        <AppBar
          position='static'
          className={classes.appBar}
          color='default'
        >
          <Tabs value={tab} onChange={this.changeTab}>
            <Tab label='书籍管理'/>
            <Tab label='订单管理'/>
            <Tab label='会员管理'/>
          </Tabs>
        </AppBar>
        <main>
          {tab === 0 && <BookManagement bookList={bookList} addBook={addBook} editBook={editBook} deleteBook={deleteBook} findBook={findBook} keyWord={keyWord}/>}
          {tab === 1 && <BillManagement billList={billList} editBill={editBill}/>}
          {tab === 2 && <UserManagement userList={userList}/>}
        </main>
      </article>
    )
  }
  componentDidMount () {
    this.props.getBookList()
    this.props.getUserList()
    this.props.getBillList()
  }
}

const stateMapToProps = (state) => ({
  state: state.management
})
const dispatchMapToProps = (dispatch) => ({
  addBook: (data) => dispatch(asyncAddBook(data)),
  editBook: (data) => dispatch(asyncEditBook(data)),
  deleteBook: (bookId) => dispatch(asyncDeleteBook(bookId)),
  findBook: (keyWord) => dispatch(asyncFindBook(keyWord)),
  getBookList: () => dispatch(asyncGetBookList()),
  getUserList: () => dispatch(asyncGetUsers()),
  getBillList: () => dispatch(asyncGetBill()),
  editBill: (billId) => dispatch(asyncEditBill(billId))
})
Management.propTypes = {
  addBook: PropTypes.func.isRequired,
  editBook: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  findBook: PropTypes.func.isRequired,
  getBookList: PropTypes.func.isRequired,
  getUserList: PropTypes.func.isRequired,
  getBillList: PropTypes.func.isRequired,
  editBill: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
}
export default connect(stateMapToProps, dispatchMapToProps)(withStyles(styles)(Management))