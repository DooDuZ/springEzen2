import React, {useEffect, useState} from 'react'
import axios from "axios";
import Pagination from 'react-js-pagination'
export default function BoardList(){

    const [ pageInfo, setPageInfo ] = useState({bcno : 0, page : 1, key : "", keyword : ""});
    const [  pageDto , setPageDto ] = useState({list : []});
    const [ bcategory, setBcategoryList ] = useState([]);

    const getBoardList = () => {
        axios.post("/board/boardlist", pageInfo).then(res => {
            console.log(res.data);
            setPageDto(res.data);
        })
            .catch(err => {console.log(err)})
    }

    useEffect( getBoardList , [ pageInfo ]);

    function getBcategory(){
        axios.get("/board/bcategorylist").then( res => { setBcategoryList(res.data) }).catch( err => { console.log(err) } )
    }
    useEffect(getBcategory , [])

    const onCategory = (bcno) => {
        setPageInfo( {bcno : bcno, page : 1, key :"", keyword: ""} )
    }

    const onPage = (page) => {
        setPageInfo( {bcno : pageInfo.bcno, page : page, key : pageInfo.key, keyword: pageInfo.keyword})
    }

    const onSearch = () => {
        setPageInfo(
            {
                bcno : pageInfo.bcno,
                page : 1,
                key : document.querySelector('.key').value,
                keyword: document.querySelector('.keyword').value
            }
        )
    }

    function loadView( bno ){
        window.location.href = "/board/view/"+bno;
    }

    return (
        <div>
            <div className="searchBox">
                <select className="key">
                    <option value="btitle"> 제목 </option>
                    <option value="bcontent"> 내용 </option>
                </select>
                <input type={"text"} className="keyword" />
                <button type="button" onClick={onSearch}> 검색 </button>
            </div>


            <a href="/board/write">글쓰기[로그인했을때만표시]</a>
            <h1> 글 목록 페이지 </h1>
            <div className="bcategorybox">
                <button type={"button"} onClick={()=>{onCategory(0)}}>전체보기</button>
                {
                    bcategory.map( (c) => {
                        return(
                            <button type="button" onClick={ ()=>{onCategory(c.bcno) }}> {c.bcname} </button>
                        )
                    })
                }
            </div>
            <table className="btable">
                {
                    pageDto.list.map( (b) => {
                        return(
                            <tr>
                                <td>{b.bno}</td>
                                <td onClick= { () => loadView(b.bno) } > {b.btitle} </td>
                                <td>{b.memail}</td>
                                <td>{b.bview}</td>
                                <td>{b.bdate}</td>
                            </tr>
                        )
                    })
                }
            </table>

            <Pagination activePage={pageInfo.page} itemsCountPerPage={3}
                        totalItemsCount ={pageDto.totalBoards } pageRangeDisplayed={5} onChange={onPage} />
        </div>
    );
}