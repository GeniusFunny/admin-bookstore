import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Test, Register, GetBookList, AddBook} from "../api/Api";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
async function test() {
  const res = await Test()
  return res
}
async function register() {
  const res = await Register({username: 'genius', password: '19980812'})
  console.log(res)
  return res
}
async function getBookList() {
  const res = await GetBookList()
  console.log(res)
  return res
}
async function addBook() {
  const res = await AddBook({bookname: '黑客与画家', author: '阮一峰', price: 59})
  console.log(res)
  return res
}
const ButtonAppBar = (props)  => {
  const { classes } = props;
  // test()
  // register()
  // getBookList()
  // addBook()
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Title
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);