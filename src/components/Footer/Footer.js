import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer style={{
            position: "relative",
            width: "100%",
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#158CBA"
        }}>
            <Container>
                <Row>
                    <Col className='text-center text-light py-3'>Copyright &copy; Note Zipper</Col>
                </Row>
            </Container>


        </footer>
    )
}

export default Footer