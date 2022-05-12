import {useState} from "react";
import {Container, Row, Col} from "react-bootstrap";


function Poster(props) {



    return (
        <div className={props.display} style={{backgroundColor: "White"}}>
            <Row>
                Crime Predictors

            </Row>

            <Row>
                <Col>
                    <Row>
                        The dataset
                    </Row>
                    <Row>
                        Problem + Hypothesis
                    </Row>
                </Col>
                <Col>
                    <Row>
                        Results + Visualization
                    </Row>
                </Col>
                <Col>
                    <Row>
                        Methodology
                    </Row>
                    <Row>
                        Significance + Ramifications
                    </Row>
                </Col>

            </Row>

        </div>
    );
}

export default Poster;
