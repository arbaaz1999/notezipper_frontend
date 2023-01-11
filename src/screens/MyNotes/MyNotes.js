import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Loader, MainScreen } from "../../components/index";
import {
  useGetNotesQuery,
  useDeleteNoteMutation,
} from "../../services/notesAPI";

const MyNotes = () => {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const { data: notes, error, isLoading, isError } = useGetNotesQuery();
  const [
    deleteNote,
    { error: deleteError, isError: deleteIsError, isLoading: isDeleting },
  ] = useDeleteNoteMutation();

  useEffect(() => {
    if (!token || token === undefined) {
      navigate("/");
    }
  }, [navigate, token]);

  if (isLoading) return <Loader />;

  const deleteHandler = async (id) => {
    console.log("delete button clicked");
    await deleteNote(id);
  };

  return (
    <MainScreen title={`Welcome back ${name}`}>
      <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
        <Link to="/create-note" style={{ textDecoration: "none" }}>
          Create New Note
        </Link>
      </Button>
      {isError && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {isDeleting && <Loader />}
      {!notes?.data ? (
        <div>No notes created yet!</div>
      ) : (
        notes?.data?.map((note) => (
          <Accordion key={note._id}>
            <Card style={{ margin: 10 }}>
              <Accordion.Item>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                      border: "none",
                    }}
                  >
                    <Accordion.Header as={Card.Text}>
                      {note.title}
                    </Accordion.Header>
                  </span>
                  <div>
                    <Button
                      variant="primary"
                      onClick={() => {
                        navigate(`/edit-note/${note._id}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                    {console.log(
                      "isDeleteError ",
                      deleteIsError,
                      "and error is ",
                      deleteError
                    )}
                  </div>
                </Card.Header>
                <Accordion.Body>
                  <Card.Body>
                    <h4>
                      <Badge bg="success">Category - {note.category}</Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created on {note.createdAt}
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Body>
              </Accordion.Item>
            </Card>
          </Accordion>
        ))
      )}
    </MainScreen>
  );
};

export default MyNotes;
