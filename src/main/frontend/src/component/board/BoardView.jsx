import React from "react";
import { useParams } from "react-router-dom";

export default function BoardView(props){

    const params = useParams();

    return (
        <div>
            뷰 페이지로 들어옴 페이지 번호 : { params.bno }
        </div>
    )
}