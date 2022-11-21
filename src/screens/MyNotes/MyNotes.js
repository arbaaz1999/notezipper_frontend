import React, { useEffect, useState } from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ErrorMessage, MainScreen } from '../../components/index';
import axios from 'axios'
// import { useSelector } from 'react-redux';

const MyNotes = () => {
    const token = localStorage.getItem('token')
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(false)

    const fetchNotes = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`
            }
            const getData = await axios({
                method: 'GET',
                url: 'https://localhost:443/api/notes',
                headers: headers
            }).then(getData => {
                console.log(getData)
                setNotes(getData?.data)
            })
                .catch(error => { setError(error) })
            console.log(getData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log('inside useEffect of Mynotes', token)
        fetchNotes();
    }, [])

    return (
        <MainScreen title='Welcome Back...'>
            <Link to="/create-notes">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    <Link
                        to="/create-note"
                        style={{ textDecoration: "none" }}
                    >
                        Create New Note
                    </Link>
                </Button>
            </Link>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {
                notes?.map((note) => (
                    <Accordion key={note._id}>
                        <Card style={{ margin: 10 }}>
                            <Accordion.Item>
                                <Card.Header style={{ display: "flex" }}>
                                    <span style={{
                                        color: "black",
                                        textDecoration: "none",
                                        flex: 1,
                                        cursor: "pointer",
                                        alignSelf: "center",
                                        fontSize: 18,
                                        border: "none"
                                    }}>
                                        <Accordion.Header as={Card.Text}>
                                            {note.title}
                                        </Accordion.Header>
                                    </span>
                                    <div>
                                        <Button variant='primary'>Edit</Button>
                                        <Button variant='danger' className='mx-2'>Delete</Button>
                                    </div>
                                </Card.Header>
                                <Accordion.Body>
                                    <Card.Body>
                                        <h4>
                                            <Badge bg='success'>
                                                Category - {note.category}
                                            </Badge>
                                        </h4>
                                        <blockquote className="blockquote mb-0">
                                            <p>
                                                {note.content}
                                            </p>
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
            }
        </MainScreen>
    )
}

export default MyNotes