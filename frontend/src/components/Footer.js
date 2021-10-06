import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; <a href="https://code-learn-work-654ea.web.app/">Code Learn Work</a></Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
