import PersonalCenter from './containers/PersonalCenter'
import BookList from './containers/BookList'
import Court from './containers/Court'
import {Dashboard, LibraryBooks, ShoppingCart, Person} from '@material-ui/icons'
const routes = [
  {
    path: '/home',
    component: Dashboard,
    icon: Dashboard,
    sideBarName: 'Dashboard'
  },
  {
    path: '/bookList',
    component: BookList,
    icon: LibraryBooks,
    sideBarName: 'Book Market'
  },
  {
    path: '/court',
    component: Court,
    icon: ShoppingCart,
    sideBarName: 'Shopping Cart'
  },
  {
    path: '/personalCenter',
    component: PersonalCenter,
    icon: Person,
    sideBarName: 'User Profile'
  }
]
export default routes