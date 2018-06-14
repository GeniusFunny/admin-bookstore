import React, {Component} from 'react'
import {connect} from 'react-redux'
import {asyncGetBookList, asyncAddBookToCourt, asyncSearchBook, updateKeyWord, closeMessage} from '../actions/bookList'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {LinearProgress} from '@material-ui/core'
import Search from '../components/Search'
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
  }
  render() {
    const {classes, state} = this.props
    return (
      <div>
        <Message
          message={state.message.message}
          type={state.message.type}
          open={state.message.open}
          close={() => this.messageClose()}
        />
        <header className={classes.header}>
          <Search
            data='可输入书名、作者进行搜索'
            keyWord={state.keyWord}
            changeKeyWord= {value => this.bindKeyWordChange(value)}
            clickSearch={() => this.searchClick()}
          />
          <LinearProgress value="0" hidden={!state.loading}/>
        </header>
        <div
          className={classes.body}
        >
          {
            state.data.map((item, index) => {
              return <Book
                data={item}
                key={index}
                addBookToCourt={bookId => this.addBookToCourt(bookId)}
              />
            })
          }
        </div>
      </div>
    )
  }

  messageClose = () => {
    this.props.close()
  }

  bindKeyWordChange = (value) => {
    this.props.changeKeyWord(value)
  }

  addBookToCourt = (bookId) => {
    this.props.addBook(bookId)
  }

  searchClick = () => {
    this.props.search(this.props.state.keyWord)
  }

  componentDidMount() {
    this.props.onLoad()
  }
}
BookList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  state: state.bookList
})
const mapDispatchToProps = (dispatch) => ({
  onLoad: () => dispatch(asyncGetBookList()),
  search: (keyWord) => dispatch(asyncSearchBook(keyWord)),
  addBook: (bookId) => dispatch(asyncAddBookToCourt(bookId)),
  changeKeyWord: (keyWord) => dispatch(updateKeyWord(keyWord)),
  close: () => dispatch(closeMessage())
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookList))