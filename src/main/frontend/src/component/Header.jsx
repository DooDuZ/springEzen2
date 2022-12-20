
import React , { useState } from 'react'; // 컴포넌트 호출
import Styles from '../css/header.css'; // src->css->header.css
import logo from '../img/logo.png'    // 이미지 적용
import { HashRouter, BrowserRouter, Routes, Route, Link,  Router } from "react-router-dom";
import axios from 'axios'; // 터미널 npm i axios

export default function Header(){

    const [ login , setLogin ] = useState(null); // 로그인된 회원정보 state 생명주기 // 변경시 재 렌더링

    axios
        .get("/member/getloginMno")
        .then( (response) => { setLogin( response.data ); } )

    return (
        <div>
            <div className="header">
                <div className="header_logo">
                    <Link to="/" > <img className="logo" src={logo} /> </Link>
                </div>
                <ul className ="top_menu">

                    {login == "" ?
                        (
                            <>
                                <li> <Link to="/member/signup" > 회원가입   </Link> </li>
                                <li> <Link to="/member/login" > 로그인     </Link> </li>
                                <li> <Link to="/chatting" > 익명 채팅방 </Link> </li>
                            </>
                        ) : (
                            <>
                                <li> {login} </li>
                                <li> <a href="/member/logout"> 로그아웃     </a> </li>
                                <li> <a href="/room/write"> 방 등록     </a> </li>
                                <li> <Link to="/book/list" > 리액트 공부방 </Link> </li>
                            </>
                        )
                    }

                    <li> <Link to="/board/list" > 자유게시판 </Link> </li>
                </ul>
            </div>
        </div>
    );
}

/*

    // 1. 비동기통신 [ AJAX , Fetch(리액트내장라이브러리) , Axios(설치형라이브러리) ]
        // axios : Data type default json


        // .get("url")
        // .post("url" , data )
        // .put("url" , data )
        // .delete("url")
        // .then( 옵션메소드  )
        // .then( (응답 객체명 ) => { 응답 실행문 } )
            // 응답 객체명 : http 응답 정보 객체 반환
                // 응답 데이터 호출 : 객체명.data
    /*
         $.ajax({
             url : "/member/getloginMno" ,
             type : "get" ,
             success : function(re) {}
         })
    */
