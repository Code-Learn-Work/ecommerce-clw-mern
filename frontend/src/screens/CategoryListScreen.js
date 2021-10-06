import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listCategories, deleteCategory, createCategory } from '../actions/categoryActions'

const CategoryListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const categoryList = useSelector((state) => state.categoryList)
  const { loading, error, category } = categoryList

  const categoryDelete = useSelector((state) => state.categoryDelete)

  const categoryCreate = useSelector((state) => state.categoryCreate)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCategory(id))
    }
  }
  const createCategoryHandler = () => {
    dispatch(createCategory())
  }

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryDelete
  
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    category: createdCategory,
  } = categoryCreate

  useEffect(() => {
      if (!userInfo || !userInfo.isAdmin) {
          history.push('/login')
      }

      if (successCreate) {
          history.push(`/admin/category/${createdCategory._id}/edit`)
      } else {
          dispatch(listCategories())
      }
  }, [dispatch, history, successDelete, userInfo, successCreate, createdCategory])

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createCategoryHandler}>
            <i className='fas fa-plus'></i> Create Category
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>DESCRIPTION</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {category.map((cat) => (
              <tr key={cat._id}>
                <td>{cat._id}</td>
                <td>{cat.name}</td>
                <td>{cat.description}</td>
                <td>
                  <LinkContainer to={`/admin/category/${cat._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(cat._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default CategoryListScreen
