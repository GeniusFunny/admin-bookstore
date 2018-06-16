import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Table, TableHead, TableRow, TableBody, TableCell, IconButton} from '@material-ui/core'
import {Edit} from '@material-ui/icons'
const styles = () => ({
  root: {

  }
})
const BillManagement = (props) => {
  const {classes, billList} = props
  return (
    <main>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>用户</TableCell>
            <TableCell>金额</TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            billList.map(item => (
              <TableRow key={item.billId}>
                <TableCell>{item.billId}</TableCell>
                <TableCell>{item.userId}</TableCell>
                <TableCell>{item.money}</TableCell>
                <TableCell>
                  <IconButton>
                    <Edit/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </main>
  )
}

BillManagement.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(BillManagement)

