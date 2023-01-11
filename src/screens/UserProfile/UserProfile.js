import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Loader, MainScreen } from "../../components/index";
import { useUpdateUserMutation, useGetUserQuery } from "../../services/authAPI";

function UserProfile() {
  const token = localStorage.getItem("token");
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const { data: userInfo } = useGetUserQuery();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setName(userInfo?.data[0]?.name);
    setEmail(userInfo?.data[0]?.email);
    setPic(userInfo?.data[0]?.pic);
  }, [navigate, userInfo]);

  useEffect(() => {
    if (!token || token === undefined) {
      navigate("/");
    }
  }, [navigate, token]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Entered Password and Confirm Password not Matched");
    } else {
      setMessage(null);
      try {
        setLoading(isUpdating);
        await updateUser({ name, email, password, pic });
        setLoading(isUpdating);
        setError(false);
        localStorage.clear();
        navigate("/login");
      } catch (error) {
        setLoading(false);
        setError(error.responce.data);
        console.log(error);
      }
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an image");
    }
    setPicMessage(null);

    if (pics.type === "image/png" || pics.type === "image/jpeg") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "dmdghc5eo");
      fetch("https://api.cloudinary.com/v1_1/dmdghc5eo/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPicMessage("Please Select an Image");
    }
  };

  return (
    <MainScreen title="UPDATE PROFILE">
      <Container>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loader />}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        <Row>
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  type="text"
                  placeholder="Enter Your Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  value={email}
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  value={confirmPassword}
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </Form.Group>
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="pic" className="mb-3">
                <Form.Label>Upload Profile Picture</Form.Label>
                <Form.Control
                  onChange={(e) => postDetails(e.target.files[0])}
                  type="file"
                />
              </Form.Group>
              {isUpdating && <Loader />}
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Col>
          <Col>
            <img
              src={pic}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              alt="profile"
            />
          </Col>
        </Row>
      </Container>
    </MainScreen>
  );
}

export default UserProfile;
