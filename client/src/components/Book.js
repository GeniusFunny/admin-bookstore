import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Card, CardActions, CardContent, CardMedia, Typography, IconButton} from '@material-ui/core'
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'
import Info from '@material-ui/icons/InfoOutline'
import PropTypes from 'prop-types'

const styles = (theme) => ({
  root: {
    padding: '10px'
  },
  card: {
    width: 250,
    height: 350,
    display: 'flex',
    paddingTop: 40,
    paddingLeft: 30,
    flexFlow: 'column nowrap',
  },
  media: {
    height: 200,
    width: 200
  },
  cardActions: {
    display: 'flex',
    flexFlow: 'row-reverse nowrap'
  },
  cardContent: {
    height: 50
  },
  cardContentPrice: {
    fontSize: '18px',
    color: 'red',
    textAlign: 'center',
    marginTop:10
  },
  cardContentTitle: {
    marginTop: 10,
    fontSize: '12px'
  }
})

const Book = (props) => {
  const {classes, data} = props
  function courtIconClick() {
    props.addBookToCourt(data.bookId)
  }
  return (
    <div className={classes.root}>
      <Card
        className={classes.card}
      >
        <CardMedia
          className={classes.media}
          image={data.image}
          title={data.bookName}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            component='h2'
            className={classes.cardContentTitle}
          >
            {data.bookName}---{data.author}
          </Typography>
          <Typography
            component='p'
            className={classes.cardContentPrice}
          >
            ¥{data.price}.00
          </Typography>
        </CardContent>
        <CardActions
          className={classes.cardActions}
        >
          <IconButton>
            <AddShoppingCart
              color="secondary"
              onClick={courtIconClick}
            />
          </IconButton>
          {/*<IconButton*/}
            {/*color="primary"*/}
          {/*>*/}
            {/*<Info/>*/}
          {/*</IconButton>*/}
        </CardActions>
      </Card>
    </div>
  )
}

Book.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

export default withStyles(styles)(Book)