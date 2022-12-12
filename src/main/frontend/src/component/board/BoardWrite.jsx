import React, {useEffect, useState} from "react";
import axios from "axios";

let bcno = 0;
export default function BoardWrite(props){

    const [category, setCategory] = useState('');
    const [categoryList, setCategoryList] = useState([]);

    const setbcategory = () => {
        if(category != ''){
            axios.post("/board/setbcategory",{ bcname : category })
                .then( response => {
                    getbcategory();
                })
                .catch(err=>{console.log(err)});
        }else{
            alert('카테고리 이름을 입력해 주세요.')
        }
    }

    const getbcategory = () =>{
        axios.get("/board/bcategorylist").then(res=>{setCategoryList(res.data); console.log(res.data)}).catch(err=>{console.log(err)})
    }

    useEffect(getbcategory, []);

    const setboard = () => {
        if(bcno==0){alert('카테고리를 선택해주세요'); return;}

        let boardform = document.querySelector('.boardform');
        let formdata = new FormData(boardform);
        formdata.set( "bcno", bcno );

        axios.post("/board/setboard", formdata, {headers : {"Content-Type" : "multipart/form-data"}})
            .then( res => {
                console.log(res.data);
            })
    }

    return(
        <div>
            <h1> 글쓰기 페이지 </h1>

            <input type="text" value = {category} onChange={ (e)=> { setCategory(e.target.value ) } } />
            <button type="button" onClick={ setbcategory }>카테고리추가</button>
            <div className="bcategorylistbox">
                {
                    categoryList.map( c=>{
                        return(
                            <button type={"button"} key={c.bcno} onClick={ (e) =>{ bcno = c.bcno; alert(bcno); } }>
                                {c.bcname}
                            </button>
                        )
                    } )
                }
            </div>

            <form className="boardform">
                제목 : <input type="text" name="btitle" />
                내용 : <input type="text" name="bcontent" />
                첨부파일 : <input type="file" name="bfile" />
                <button type="button" onClick={setboard}>등록</button>
            </form>
        </div>
    );
}