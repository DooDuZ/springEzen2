import React,{useState} from "react";
import ToolBar from "./ToolBar";

export default function LandingPage(props){
    ///1.state선언 : const[변수명 set함수명] = useState(초기값)
    const [isLoggedIn , setIsLoggedIn] = useState(true); //초기값 false
    //2.함수
    const onClickLogin = () => {setIsLoggedIn(true);}
    //3.함수
    const onClickLogout = () => {setIsLoggedIn(false);}
    //4.랜더링
    return(
        <div>
            <ToolBar
                isLoggedIn={isLoggedIn}
                onClickLogin={onClickLogin}
                onClickLogout={onClickLogout} />
        </div>
    )
}