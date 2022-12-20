import React, {useState, useEffect, useRef} from "react";

// useState -> state 상태가 바뀔 때마다 렌더링을 다시
    // prevState();
// useRef -> 재 렌더링 될 때 초기화되지 않는 메모리

export default function Chatting(props){

    const webSocketUrl = 'ws://localhost:8080/chat'
    const [ socketCon, setSocketCon ] = useState(false);
    const [ msgList, setMsgList ] = useState( [] );

    const onMsg = () => {
        let msg = document.querySelector('.msgInput').value;
        ws.current.send( JSON.stringify({message : msg}) );
        document.querySelector('.msgInput').value = '';
    }

    // 클라이언트 소켓
    let ws = useRef(null);

    // 컴포넌트가 mount될 때 서버소켓 연결 , unmount시 서버소켓 닫기
    useEffect( () => {
        if( !ws.current ){
            // 클라이언트 소켓 생성
            ws.current = new WebSocket(webSocketUrl);
            ws.current.onopen = () => { setSocketCon(true); console.log('채팅방 입장!'); }
            ws.current.onclose = (e) => { setSocketCon(false); console.log('채팅 종료! ' + e); }
            ws.current.onerror = (e) => { console.log('에러낫숑 ' + e); }
            ws.current.onmessage = (e) => {
                let data = JSON.parse(e.data);
                setMsgList( ( prevmsgList ) => [...prevmsgList, data] )

            }
        }
    } , [])

    return (
        <div>
            접속 상태 : {socketCon ? (<span>접속중</span>) : ( <span>접속 끊김</span> )}
            <div>
                채팅 입력 : <input type={"text"} className={"msgInput"} />
                <button type={"button"} onClick={onMsg}> 전송 </button>
            </div>

            <div>
                <h3>채팅 창</h3>
                <div className={"chatBox"}>
                    {
                        msgList.map( (msg)=>{
                            return(
                                <div>
                                    {JSON.stringify(msg)}
                                </div>
                            )
                        } )
                    }
                </div>
            </div>
        </div>
    )
}