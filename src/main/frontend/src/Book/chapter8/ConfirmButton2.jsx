import React, {useState} from "react";

function ConfirmButton2(props){
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handlerConfirm = () => {
        setIsConfirmed( (preIsConfirmed) => !preIsConfirmed )
    }

    const handlerConfirm2 = () => {
        setIsConfirmed( (preIsConfirmed) => !preIsConfirmed )
    }

    return(
        <div>
            <button onClick={handlerConfirm} disabled={isConfirmed}>
                {isConfirmed ? "확인됨" : "확인하기"}
            </button>
            <button onClick={handlerConfirm2}>
                버튼
            </button>
            {isConfirmed && <input type="text" />}
        </div>
    )
}

export default ConfirmButton2