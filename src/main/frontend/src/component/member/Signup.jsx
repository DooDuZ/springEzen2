import React from 'react';
import styles from './signup.css';
import axios from 'axios'; //   npm install axios 설치 했을경우만 가능

function Signup( props ){ // * 회원가입 컴포넌트 *
    // 1. setmember 이벤트 함수 정의 [ 화살표함수 정의 ]
    const setmember = () => {
        let info = {    // 2. 입력받은 값 가져오기
            memail : document.querySelector('.memail').value ,
            mpassword : document.querySelector('.mpassword').value ,
            mphone : document.querySelector('.mphone').value
        }
        //  @CrossOrigin(origins = "http://localhost:3000")
        axios           // 3. axios 비동기통신 이용한 서버[spring] 통신
            .post( "/member/setmember" ,  info )   // 요청
            .then( res => {
                let result = res.data;
                if(result > 0 ){
                    alert('가입됐숑');
                }else{
                    alert('안됐숑');
                }
            } )
            .catch(err => { alert (err) })// 응답
    }
    // 2. 인증코드 요청 함수
    const getauth = () => {   alert(" 클릭 이벤트 ")  }
    // 3. 타이머 함수
    const setimer = () => {   alert(" 클릭 이벤트 ")  }
    // 4. 인증 버튼 확인 함수
    const authcode = () => {   alert(" 클릭 이벤트 ")  }
    return(
            <div>
                <h3> 회원가입 </h3>
                <div>
                    이메일 : <input type="text" className="memail" />
                    <button type="button" onClick={ getauth } className="getauthbtn"> 인증코드받기 </button><br/>
                    <div className="authbox">
                        <input type="text" className="authinput" />
                        <button type="button" className="authbtn" onClick={ authcode } > 인증 </button>
                        <span className="timerbox"></span>
                    </div>
                </div>
                핸드폰 : <input type="text" className="mphone" /><br/>
                비밀번호 : <input type="text" className="mpassword" /><br/>
                <button type="button" onClick={ setmember } > 가입하기 </button>
            </div>
    );
}
export default Signup;

/*

    // class -> className 변경
    // onclick -> onClick 변경
        // 함수호출 -> { } jsx 표현식
    // 태그 닫기 /tag명


        // 비동기 통신  [ ajax vs fetch[react내장] vs axios[react별도설치] ]
            // axios 설치방법
                // npm : 라이브러리 빌드/관리 [ node.js ]
                // 1. [현재 프로젝트내] npm install axios


            // axios 비동기통신 함수
                // axios.MethodType( "통신URL" , 전송할data  )
                    // axios.post( ) , axios.get( )  , axios.put( )  , axios.delete( )

*/