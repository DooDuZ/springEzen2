import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BoardView(props){

    const params = useParams();

    const [board, setboard] = useState( { } );
    const [login, setLogin] = useState( null );

    let data = null;

    useEffect(()=>{ axios.get("/board/getboard",{params : {bno : params.bno}}).then(res=>{setboard(res.data); console.log(res.data)}) }, [] );
    useEffect(()=>{ axios.get("/member/getloginMno").then( res => { data = res.data.split('_')[0]; setLogin(data);} );  },[] );

    const onDelete = () => {
        axios.delete("/board/delboard", {params : {bno : params.bno}})
            .then( res=>{ alert('게시물 삭제 성공'); window.location.href='/board/list'; });
    }

    const onDownload = () => {
        axios.get("/board/filedownload", {params : { filename : board.bfilename }})
    }
    const getUpdate = () =>{
        window.location.href = '/board/update/'+params.bno;
    }

    return (
        <div>
            <div>{board.btitle}</div>
            <div dangerouslySetInnerHTML={ {__html : board.bcontent} }></div>
            { board.bfilename != '' && <a href={"/board/filedownload?filename="+board.bfilename}>{board.bfilename}</a> }
            <div>
                { login==board.memail && <button type={"button"} onClick={onDelete}>삭제</button> }
                { login==board.memail && <button type={"button"} onClick={getUpdate}>수정</button> }
            </div>
        </div>
    )
}