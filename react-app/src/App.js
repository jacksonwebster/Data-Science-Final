import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap'
import Poster from './poster'
import predictor from './predictor'

import {Col, Container, Navbar, Row, Nav} from 'react-bootstrap';
import {useState} from "react";
import "./bootstrapOverride.css"



function showPoster(){
    return Poster()
}

function showPredictor(){
    return predictor()
}



function App() {

  const [currComp, setCurrComp] = useState("predictor");



  return (
    <div className="App" >
        <Navbar bg="light" expand="md" >
            <Container >
                <Navbar.Brand >Crime Predictors</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=> setCurrComp('predictor')}>Predictor</Nav.Link>
                        <Nav.Link onClick={()=> setCurrComp('poster')}>Poster</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


        <Container className="bg-image">
            <Row>
                <Col xs={1} />
                <Col xs={10} >
                    <Poster> </Poster>

                </Col>
                <Col xs={1}/>
            </Row>
        </Container>







    </div>
  );
}

export default App;
