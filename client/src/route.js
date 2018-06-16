import {Redirect, Route} from 'react-router-dom'
import React from 'react'
import PersonalCenter from './containers/PersonalCenter'
import BookList from './containers/BookList'
import Court from './containers/Court'
import Management from './containers/Management'
import {Dashboard, LibraryBooks, ShoppingCart, Person} from '@material-ui/icons'
const routes = [
  {
    path: '/management',
    component: Management,
    icon: Dashboard,
    sideBarName: '书店管理',
    isPublic: true
  },
  {
    path: '/bookList',
    component: BookList,
    icon: LibraryBooks,
    sideBarName: '图书市场',
    isPublic: true
  },
  {
    path: '/court',
    component: Court,
    icon: ShoppingCart,
    sideBarName: '购物车',
    isPublic: false
  },
  {
    path: '/personalCenter',
    component: PersonalCenter,
    icon: Person,
    sideBarName: '个人中心',
    isPublic: false
  }
]
const ManagementRoute = ({component: Component, role, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      role === 2 ? (
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
  PrivateRoute,
  ManagementRoute
}