import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditNoteMutation, useGetNoteQuery } from "../../services/notesAPI";
import { Button, Card, Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Loader, MainScreen } from "../../components/index";

const EditNote = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const id = useParams();
  console.log(id.id);
  const { data: notes, isLoading } = useGetNoteQuery(id.id);
  console.log(notes);
  const [editNote, { isLoading: isUpdating }] = useEditNoteMutation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    setTitle(notes?.data?.title);
    setContent(notes?.data?.content);
    setCategory(notes?.data?.category);
  }, [navigate, notes]);

  useEffect(() => {
    if (!token || token === undefined) {
      navigate("/");
    }
  }, [navigate, token]);

  if (isLoading) return <Loader />;

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const submitHandler = async () => {
    try {
      await editNote({ id, title, content, category });
      navigate("/my-notes");
    } catch (error) {
      console.log("Error occured while updating note", error);
    }
  };

  return (
    <MainScreen title="UPDATE NOTE">
      <Card>
        <Card.Header>Update Your Note</Card.Header>
        <Card.Body>
          {console.log(title, content, category)}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {isUpdating && <Loader size={50} />}
            <Button type="submit" variant="primary">
              Update Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default EditNote;
