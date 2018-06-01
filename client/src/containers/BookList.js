import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Grid, Button, Typography} from '@material-ui/core'
import Search from '../components/Search'
import {GetBookList, SearchBook} from '../api/Api'
import Book from '../components/Book'
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
    this.state = {
      bookList: [],
      keyWord: ''
    }
  }
  render() {
    const {classes} = this.props
    return (
      <div>
        <header className={classes.header}>
          <Search data='可输入书名、作者进行搜索' keyWord={this.state.keyWord} changeKeyWord= {value => this.bindKeyWordChange(value)} clickSearch={() => this.searchClick()}/>
        </header>
        <div className={classes.body}>
          {
            this.state.bookList.map((item, index) => {
              return <Book data={item} key={index}/>
            })
          }
        </div>
      </div>
    )
  }
  bindKeyWordChange = (value) => {
    this.setState({
      keyWord: value
    })
  }
  searchClick = () => {
    SearchBook({keyword: this.state.keyWord})
      .then(data => {
        this.setState({
          bookList: data
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
      bookList: data
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