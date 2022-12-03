import React from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ErrorMessage, Loader, MainScreen } from "../../components/index";
import { useGetNotesQuery } from "../../services/notesAPI";

const MyNotes = () => {
  const { data: notes, error, isLoading, isError } = useGetNotesQuery();
  const name = localStorage.getItem("name");
  if (isLoading) return <Loader />;

  return (
    <MainScreen title={`Welcome back ${name}`}>
      <Link to="/create-notes">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          <Link to="/create-note" style={{ textDecoration: "none" }}>
            Create New Note
          </Link>
        </Button>
      </Link>
      {isError && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {!notes ? (
        <div>No notes created yet!</div>
      ) : (
        notes?.map((note) => (
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
                    <Button variant="primary">Edit</Button>
                    <Button variant="danger" className="mx-2">
                      Delete
                    </Button>
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
