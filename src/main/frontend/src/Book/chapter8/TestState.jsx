import React, {useState} from "react";

export default function TestState(){
    const [ state, setState ] = useState(0);

    const stateAdd = () => {
        setState(state + 1 )
        setState(state + 2 )
        setState(state + 3 )
        setState(state + 4 )
        setState(state + 5 )
    }

    const stateAdd2 = () => {
        setState((prevState) => prevState + 1 )
        setState((prevState) => prevState + 2 )
        setState((prevState) => prevState + 3 )
        setState((prevState) => prevState + 4 )
        setState((prevState) => prevState + 5 )
    }

    return (
        <div>
            <div> state에 저장된 값 : { state } </div>
            <button onClick={stateAdd}> 클릭 이벤트 </button>
            <button onClick={stateAdd2}> 클릭 이벤트 </button>
        </div>
    )
}