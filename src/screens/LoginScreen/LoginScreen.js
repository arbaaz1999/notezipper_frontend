import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorMessage, Loader, MainScreen } from '../../components/index';
import { userAuth } from '../../features/auth/authThunk'



function LoginScreen() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeEvent = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        })
    }



    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            dispatch(userAuth({ ...credentials }))
            setLoading(false)
            navigate("/")
        } catch (error) {
            setError(error)
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <MainScreen title="LOGIN">
            <Container>
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            value={credentials.email}
                            name='email'
                            type="email"
                            placeholder="Enter email"
                            onChange={handleChangeEvent}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={credentials.password}
                            name='password'
                            type="password"
                            placeholder="Password"
                            onChange={handleChangeEvent}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Form>
                <Row className='py-3'>
                    <Col>New User ? <Link to='/register'>Register Now</Link></Col>
                </Row>
            </Container>
        </MainScreen>
    )
}

export default LoginScreen