import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Loader, MainScreen } from "../../components/index";
import { useLoginMutation } from "../../services/authAPI";

function LoginScreen() {
  console.log("component start");
  const navigate = useNavigate();
  const [login, mutationResult] = useLoginMutation();
  const { data, isLoading, error } = mutationResult;
  console.log("login data is", data);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // const [error, setError] = useState(false);

  if (isLoading) return <Loader />;

  const handleChangeEvent = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (e) => {
    console.log("inside submithandler 1");
    await login(credentials);
    if (data) {
      let token = data?.data?.token;
      let name = data?.data?.name;
      console.log(token, name);
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
    } else return undefined;
    navigate("/");
    console.log("inside submit handler 2");
    e.preventDefault();
  };

  console.log("component end");

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
