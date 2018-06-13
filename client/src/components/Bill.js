import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table, TableCell, TableRow, TableHead, TableBody} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = () => ({
  root: {

  }
})
const Bill = (props) => {
  const {classes, billList} = props
  return (
    <Table className={classes.root}>
      <TableHead>
        <TableRow>
          <TableCell>账单ID</TableCell>
          <TableCell>缘由</TableCell>
          <TableCell>金额</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          billList.map(item => (
            <TableRow key={item.billId}>
              <TableCell>{item.billId}</TableCell>
              <TableCell>购买书籍</TableCell>
              <TableCell>-{item.money}.00元</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}

Bill.propTypes = {
  classes: PropTypes.object.isRequired,
  billList: PropTypes.array.isRequired
}

export default withStyles(styles)(Bill)