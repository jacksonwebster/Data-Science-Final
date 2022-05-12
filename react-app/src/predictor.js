import {useEffect, useState} from "react";


import MultiRangeSlider from "multi-range-slider-react";
import "./sliderOverride.css"
import {Row, Col, } from "react-bootstrap";

const maxPossibleTemp = 130
const minPossibleTemp = -20

const heatmap = [
"#282df3",
"#3538e5",
"#4142d7" ,
"#4e4dc9" ,
"#5b57bb" ,
"#6762ac" ,
"#9a8c74" ,
"#a69666" ,
"#b3a158" ,
"#c0ab4a" ,
"#ccb63b" ,
"#d9c02d" ,
"#e5cb1f" ,
"#f2d511",
"#f2d511",
"#f2c911",
"#f2bd11",
"#f2b011",
"#f2a411",
"#f29811",
"#f28c11",
"#f27f11",
"#f27311",
"#f26711",
"#f25b11",
"#f24e11",
"#f24211",
"#f23611",
"#f22a11",
"#f21d11",
"#f21111"
     ]



function Predictor() {

    useEffect(() => {
        let min = document.body.getElementsByClassName("label-min")[0].innerHTML
        document.body.getElementsByClassName("label-min")[0].innerHTML = min.split("º")[0] + "º"
        let max = document.body.getElementsByClassName("label-max")[0].innerHTML
        document.body.getElementsByClassName("label-max")[0].innerHTML = max.split("º")[0] + "º"
    }, [])



    let getPrediction = (min, max) => {
        fetch(`/predict?min=${min}&max=${max}`)
            .then(response => response.json())
            .then(data => setPrediction(data.crimes))
    }

    let handleOnChange = (values) => {
        setCurrMin(values.minValue)
        setCurrMax(values.maxValue)
        getPrediction(values.minValue, values.maxValue)
        setColors(values.minValue, values.maxValue)
    }

    let setColors = (min, max) => {
        let minLabel = document.body.getElementsByClassName("min-value")[0]
        let maxLabel = document.body.getElementsByClassName("max-value")[0]
        let minColor = pickColor(min)
        let maxColor = pickColor(max)
        minLabel.style.backgroundColor = minColor
        maxLabel.style.backgroundColor = maxColor
    }

    let pickColor = (temp) => {
        let ratio = (temp + Math.abs(minPossibleTemp)) / (maxPossibleTemp + Math.abs(minPossibleTemp))
        let index = Math.round(ratio * heatmap.length)
        return heatmap[index]
    }

    let getThirds = (sector) => {
        return minPossibleTemp + ((maxPossibleTemp + Math.abs(minPossibleTemp))/3)*sector
    }

    const [currMin, setCurrMin] = useState(getThirds(1));
    const [currMax, setCurrMax] = useState(getThirds(2));
    const [prediction, setPrediction] = useState(30)


    return (
        <div >
            <div className="white-transparent p-5 mt-5 align-content-center align-items-center">
                <Row style={{height: "15vh"}}></Row>
                <Row>
                    <Col  className="text-center  prediction-label">
                        PREDICTED NUMBER OF CRIMES
                    </Col>


                </Row>
                <Row>
                    <Col className="text-center prediction">
                        {prediction}
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <MultiRangeSlider
                        min={minPossibleTemp}
                        max={maxPossibleTemp}
                        step={1}
                        ruler={false}
                        label={true}
                        preventWheel={false}
                        minValue={currMin}
                        maxValue={currMax}
                        onInput={(e) => {
                            handleOnChange(e);
                        }}/>
                        </Col>
                 </Row>
            </div>
        </div>


    );
}

export default Predictor;
