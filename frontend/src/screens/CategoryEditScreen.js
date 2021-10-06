import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { FaArrowLeft } from 'react-icons/fa'
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'
import {updateCategory, getCategoryById } from '../actions/categoryActions'

const CategoryEditScreen = ({ match, history }) => {
  const categoryId = match.params.id

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { loading, error, category } = categoryDetails

  const categoryUpdate = useSelector((state) => state.categoryUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET })
      history.push('/admin/categorylist')
    } else {
      if (!category.name || category._id !== categoryId) {
        dispatch(getCategoryById(categoryId))
      } else {
        setName(category.name)
        setDescription(category.description)
      }
    }
  }, [dispatch, history, categoryId, category, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    history.push('/admin/categorylist')
    dispatch(updateCategory({ _id: categoryId, name, description}))
  }

  return (
    <>
      <Link to='/admin/categorylist' className='btn btn-light my-3'>
        <FaArrowLeft style={{paddingBottom: 2}} />{" "}Go Back
      </Link>
      <FormContainer>
        <h1>Edit/Create Category</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default CategoryEditScreen
