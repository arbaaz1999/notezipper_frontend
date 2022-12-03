import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Loader, MainScreen } from "../../components/index";
import { useLoginMutation } from "../../services/authAPI";

function LoginScreen() {
  const [login, { data, isLoading }] = useLoginMutation();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <Loader />;

  const handleChangeEvent = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login({ ...credentials });
      let token = data?.data?.token;
      let name = data?.data?.name;
      if (token) {
        console.log(token);
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        navigate("/");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <MainScreen title="LOGIN">
      <Container>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={credentials.email}
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleChangeEvent}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={credentials.password}
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChangeEvent}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New User ? <Link to="/register">Register Now</Link>
          </Col>
        </Row>
      </Container>
    </MainScreen>
  );
}

export default LoginScreen;
