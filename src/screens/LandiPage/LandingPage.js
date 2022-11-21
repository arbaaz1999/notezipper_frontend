import React from 'react';
import './LandingPage.css';
import { Button, Container, Row } from 'react-bootstrap';

const LandingPage = () => {

    return (
        <div className='main'>
            <Container>
                <Row>
                    <div className='intro-text'>
                        <div>
                            <h1 className='title'>Welcome to Note Zipper</h1>
                            <p className='subtitle'>One safe place for all your Notes</p>
                        </div>
                        <div className='buttonContainer'>
                            <a href='/login'>
                                <Button size='lg' className='landingButtons'>
                                    Login
                                </Button>
                            </a>
                            <a href='/register'>
                                <Button
                                    size='lg'
                                    className='landingButtons'
                                    variant='outline-primary'
                                >
                                    Sign Up
                                </Button>
                            </a>

                        </div>

                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage