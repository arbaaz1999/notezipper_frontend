import React from 'react'
import {
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userInfo"))

    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link to='/'>Note Zipper</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className='m-auto'>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                        </Form>
                    </Nav>
                    <Nav
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {userData ?
                            (<Nav.Link>
                                <Link to='/mynotes'> My Notes </Link>
                            </Nav.Link>) : null}
                        {!userData ?
                            (<Nav.Link>
                                <Link to='/login'> Login </Link>
                            </Nav.Link>) :
                            (<NavDropdown title={userData.name} id="navbarScrollingDropdown">
                                <NavDropdown.Item>
                                    <Link to="/profile">My Profile</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => {
                                    localStorage.removeItem("userInfo")
                                    navigate("/")
                                }}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>)}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header