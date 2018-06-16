import React from 'react'
import PropTypes from 'prop-types'
import {Table, TableCell, TableRow, TableHead, TableBody} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = () => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: 20
  },
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
    paddingLeft: 15,
    paddingBottom: 15,
    borderRadius: 20,
    minHeight: 400,
    fontSize: 15,
    width: 400,
    boxShadow: '10px 10px 5px #888888',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  }
})
const Bill = (props) => {
  const {classes, billList} = props
  return (
    <article className={classes.root}>
      <main className={classes.content}>
        <h3>我的账单</h3>
        <Table>
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
      </main>
    </article>
  )
}

Bill.propTypes = {
  classes: PropTypes.object.isRequired,
  billList: PropTypes.array.isRequired
}

export default withStyles(styles)(Bill)