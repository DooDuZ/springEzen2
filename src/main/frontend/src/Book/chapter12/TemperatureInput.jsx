import React from "react";

const sacleNames = {
    c : "섭씨",
    f : "화씨",
}

export default function TemperatureInput(props){
    const handlerChange = (e) => {
        props.onTemperatureChange(e.target.value);
    }
    return (
        <fieldset>
            <legend>
                온도를 입력해주세ㅔ요 ( 단위 : { sacleNames[props.scale] } )
            </legend>
            <input type={"text"} value={props.temperature} onChange={handlerChange} />
        </fieldset>
    );
}