/*
    리액트 : SPA , 컴포넌트 단위 개발
       State : 데이터 관리 변수
       // 1. 클래스 : 생성자에서 this.state 선언
       // 2. 함수 : useState 라이브러리
*/
// ------- 1. 현재 페이지에서 사용될 라이브러리 import ------ //
import React, {useEffect, useState} from 'react';
// * 오류 : return 한번이기때문에 재 렌더링 불가능
//export default function Counter( props ) {
//    // ------- 2. JS 혹은 라이브러리 ----------------------------- //
//    var count = 0;
//    // ------- 3. 렌더링 되는 HTML + JSX 표현식 { } + 컴포넌트 ---- //
//    return (
//        <div>
//            <p> 총 { count }번 클릭했습니다. </p>
//            <button onClick={ () => count++ }>
//                클릭
//            </button>
//        </div>
//    );
//}
// * 해결책 : 리액트 훅 이라는 곳에서 useState 라이브러리 사용하자
export default function Counter( props ) {
    // ------- 2. JS 혹은 라이브러리 ----------------------------- //
    const [ count , setCount ] = useState(0); // ** 데이터관리 / 변화에 따른 재 렌더링
        // const : 상수 선언
        // useState( 초기값 ) : 배열[ 변수명 , set함수명 ]이 리턴   / 생명주기[ 생성 , 업데이트 , 초기화]
        // [ count , setCount ]
            // count : 1.변수명 [ 식별자 ]
            // setCount : 2.해당 변수의 값을 변경하는 함수명 [ setter ]
    // ------- 3. 렌더링 되는 HTML + JSX 표현식 { } + 컴포넌트 ---- //

    useEffect( () =>{
            document.title = `총 ${count}번 클릭했습니다.`
        }
    )

    return (
        <div>
            <p> 총 { count }번 클릭했습니다. </p>
            <button className="btn" onClick={ () => setCount( count+1 ) }>
                클릭
            </button>
        </div>
    );
}
