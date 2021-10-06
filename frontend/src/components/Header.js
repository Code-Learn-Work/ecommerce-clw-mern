import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import Loader from './Loader'
import Message from './Message'
import { logout } from '../actions/userActions'
import { listCategories } from '../actions/categoryActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const categoryList = useSelector((state) => state.categoryList)
  const { loading, error, category} = categoryList 

  const logoutHandler = () => {
    dispatch(logout())
  }

  // const categoryhandler = () => {
  //   console.log(categoryList)
  // }

  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <LinkContainer to='/'>
            <Navbar.Brand>Code Learn Work</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              <NavDropdown title='Categories'>
                {
                  category.map((cat) => (
                  <LinkContainer key={cat._id} to={`/category/${cat._id}`}>
                    <NavDropdown.Item>{cat.name}</NavDropdown.Item>
                  </LinkContainer>
                ))
                }
              </NavDropdown>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Dashboard' id='adminmenu' style={{marginRight: '0px !important'}}>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/categorylist'>
                    <NavDropdown.Item>Categories</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                  <i className='fas fa-logout'></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header
