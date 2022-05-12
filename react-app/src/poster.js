import {useState} from "react";
import {Container, Row, Col} from "react-bootstrap";


function Poster() {


    const [currMin, setCurrMin] = useState(1);
    const [currMax, setCurrMax] = useState(2);
    const [prediction, setPrediction] = useState(30)


    return (
        <>
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

        </>
    );
}

export default Poster;
