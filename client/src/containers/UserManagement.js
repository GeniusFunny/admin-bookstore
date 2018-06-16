import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core'
const styles = () => ({
  root: {

  }
})
const UserManagement = (props) => {
  const {classes, userList} = props
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>昵称</TableCell>
            <TableCell>手机号</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            userList.map(item => (
              <TableRow key={item.userId}>
                <TableCell>{item.userId}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.phone}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

UserManagement.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(UserManagement)

