import {useState} from "react";


import MultiRangeSlider from "multi-range-slider-react";
import "./sliderOverride.css"

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



    let handleOnChange = (values) => {
        setCurrMin(values.minValue)
        setCurrMax(values.maxValue)
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


    return (
        <>

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
            }}
        />

        </>

    );
}

export default Predictor;
