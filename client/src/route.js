import {Redirect, Route} from 'react-router-dom'
import React from 'react'
import PersonalCenter from './containers/PersonalCenter'
import BookList from './containers/BookList'
import Court from './containers/Court'
import {Dashboard, LibraryBooks, ShoppingCart, Person} from '@material-ui/icons'
const routes = [
  {
    path: '/home',
    component: Dashboard,
    icon: Dashboard,
    sideBarName: 'Dashboard',
    isPublic: true
  },
  {
    path: '/bookList',
    component: BookList,
    icon: LibraryBooks,
    sideBarName: 'Book Market',
    isPublic: true
  },
  {
    path: '/court',
    component: Court,
    icon: ShoppingCart,
    sideBarName: 'Shopping Cart',
    isPublic: false
  },
  {
    path: '/personalCenter',
    component: PersonalCenter,
    icon: Person,
    sideBarName: 'User Profile',
    isPublic: false
  }
]
const PrivateRoute = ({ component: Component, isAuth, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      isAuth ? (
        <Component {...props}/>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: {from: props.location}
          }}
        />
      )
    }
    />
)
export {
  routes,
  PrivateRoute
}