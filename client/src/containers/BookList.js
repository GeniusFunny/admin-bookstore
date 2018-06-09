import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {LinearProgress} from '@material-ui/core'
import Search from '../components/Search'
import {GetBookList, SearchBook, AddBookToCourt} from '../api/Api'
import Book from '../components/Book'
import Message from '../components/Message'
const styles = (theme) => ({
  root: {

  },
  header: {
    textAlign: 'center'
  },
  body: {
    display: 'flex',
    flexFlow: 'row wrap'
  }
})

class BookList extends Component {
  constructor(props) {
    super(props)
    this.messageMap = {
      'success': () => ({
        open: true,
        message: '成功加入购物车',
        type: 'success'
      }),
      'error': () => ({
        open: true,
        message: '加入购物车失败',
        type: 'error'
      })
    }
    this.state = {
      bookList: [],
      keyWord: '',
      loading: true,
      Message: {
        open: false,
        message: '加入购物车成功',
        type: 'success'
      }
    }
  }
  render() {
    const {classes} = this.props
    return (
      <div>
        <Message
          message={this.state.Message.message}
          type={this.state.Message.type}
          open={this.state.Message.open}
          close={() => this.messageClose()}
        />
        <header className={classes.header}>
          <Search
            data='可输入书名、作者进行搜索'
            keyWord={this.state.keyWord}
            changeKeyWord= {value => this.bindKeyWordChange(value)}
            clickSearch={() => this.searchClick()}
          />
          <LinearProgress value="0" hidden={!this.state.loading}/>
        </header>
        <div
          className={classes.body}
        >
          {
            this.state.bookList.map((item, index) => {
              return <Book
                data={item}
                key={index}
                addBookToCourt={bookid => this.addBookToCourt(bookid)}
              />
            })
          }
        </div>
      </div>
    )
  }
  messageClose = () => {
    this.setState({
      Message: {
        ...this.state.Message,
        open: false
      }
    })
  }
  bindKeyWordChange = (value) => {
    this.setState({
      keyWord: value
    })
  }
  addBookToCourt = (bookId) => {
    AddBookToCourt({bookId: bookId})
      .then((res) => {
        if (res.status === 0) {
          this.setState({
            Message: this.messageMap['success']()
          })
        } else {
          this.setState({
            Message: this.messageMap['error']()
          })
        }
      })
  }
  searchClick = () => {
    this.setState({
      loading: true
    })
    SearchBook({keyword: this.state.keyWord})
      .then(data => {
        this.setState({
          bookList: data,
          loading: false
        })
      })
  }
  getBookList = async () => {
    let data = await GetBookList()
    return data
  }
  parseBookList = async () => {
    let data = await this.getBookList()
    this.setState({
      bookList: data,
      loading: false
    })
  }
  componentDidMount() {
    this.parseBookList()
  }
}
BookList.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(BookList)