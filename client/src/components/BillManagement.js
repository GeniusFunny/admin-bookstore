import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core'
const styles = () => ({
  root: {

  }
})
const BillManagement = (props) => {
  const {classes, billList} = props
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>用户</TableCell>
          <TableCell>金额</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          billList.map(item => (
            <TableRow key={item.billId}>
              <TableCell>{item.billId}</TableCell>
              <TableCell>{item.userId}</TableCell>
              <TableCell>{item.money}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}

BillManagement.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(BillManagement)

