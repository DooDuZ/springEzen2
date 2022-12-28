import React, {useState, useEffect, useRef} from 'react'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import Offcanvas from "react-bootstrap/Offcanvas";
import RoomCarousel from "./room/RoomCarousel";

export default function Home( props ) {

    // 사이드바
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [selectIndex, setSelectIndex] = useState(0);

    const tester= () => {
        axios.get("/test/tester").then(res=>{console.log(res);})
    }


    /* ---------  룸 데이터 ------------------*/
    const [ roomList , setRoomList ] = useState([{ getrimg : []}]);
    // useEffect( ()=>{ axios } , [] );
    useEffect( ()=>{
        axios.get("/room/getroomlist")
            .then( re => {  setRoomList(re.data ); console.log( re.data); } )
            .catch( e => { console.log( e ); } )
    } , [] )

    /*---------- 카카오 지도 api ------------*/
    const mapContainer = useRef( null );
    const { kakao } = window;
    const mapOption =  useRef(null);

        useEffect( () => {
        var map =  new kakao.maps.Map( mapContainer.current , { center: new kakao.maps.LatLng( 36.2683, 127.6358  ), level: 10 } ); // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        // 2.
        // 마커 클러스터러를 생성합니다
        var clusterer = new kakao.maps.MarkerClusterer({
            map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
            averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel: 10 // 클러스터 할 최소 지도 레벨
        });



        /* ------- 마커 이미지 --------------- */
        var markerImageUrl = '/static/media/roomicon.b818afd964f981aed393.png',
            markerImageSize = new kakao.maps.Size(40, 42), // 마커 이미지의 크기
            markerImageOptions = {
                offset : new kakao.maps.Point(20, 42)// 마커 좌표에 일치시킬 이미지 안의 좌표
            };
        var markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerImageSize, markerImageOptions);

        var markers = roomList.map( ( position, i ) => { // 데이터를 가져와서 마커 생성후에 클러스터에 추가
            // 가져온 데이터의 좌표들을 반복문 돌리면서 [ 1. * 마커 생성 ]
            // [ 2. 생성된 마커들을 markers 에 저장 ] map반복문 return
            let marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng( position.rlat, position.rlng ), // 마커의 좌표
                image : markerImage, // 마커의 이미지
                map: map // 마커를 표시할 지도 객체
            });

            kakao.maps.event.addListener(marker, 'click', function (){
                setSelectIndex(i);
                setShow(true);
            })

            return marker;
        });
        clusterer.addMarkers(markers); // 클러스터러에 마커들을 추가합니다
    }, [roomList])

    return(
        <>
            {/* 부트스트랩 사이드 바 */}
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    { selectIndex }
                    <RoomCarousel imges={roomList[selectIndex]} />
                </Offcanvas.Body>
            </Offcanvas>
            <div>
                <button onClick={tester}>tester</button>
            </div>

            <div>
                <div id="map" ref={ mapContainer } style={{width:'100%',height:'600px'}} ></div>
            </div>

        </>
    )
}