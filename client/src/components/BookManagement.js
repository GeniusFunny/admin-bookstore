import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core'
const styles = () => ({
  root: {

  }
})
const BookManagement = (props) => {
  const {classes, bookList} = props
  return (
    <div className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>书名</TableCell>
            <TableCell>作者</TableCell>
            <TableCell>单价</TableCell>
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
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

BookManagement.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(BookManagement)

