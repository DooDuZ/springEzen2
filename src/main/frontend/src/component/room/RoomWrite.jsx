import React, {useEffect, useRef, useState} from "react";
import {useDaumPostcodePopup} from "react-daum-postcode";
import axios from "axios";
import roomicon from "../../img/roomicon.png"


export default function RoomWrite(){

    const [ address, setAddress ] = useState({ name : '', lat : 33.450701, lng : 126.570667} );

    const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

    const handleComplete = (data) => {
        let fullAddress = data.address;
        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        axios.get("https://dapi.kakao.com/v2/local/search/address.json?query="+fullAddress,
            {headers : { Authorization : 'KakaoAK 8a11f63c7327b0680acf7baa14f7de2c'}})
            .then( res => {
                const location = res.data.documents[0];
                console.log(location.x);
                console.log(location.y);
                setAddress({ name : fullAddress , lat : location.y, lng : location.x});
            } );
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    var mapContainer = useRef(null);
    const { kakao } = window;

    const mapOption = {
        center: new kakao.maps.LatLng(address.lat, address.lng), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };
    useEffect( ()=>{
        // console.log(mapContainer);
        var map = new kakao.maps.Map(mapContainer.current, mapOption);

        var markerImageUrl = "http://localhost:8080/static/media/roomicon.b818afd964f981aed393.png",
            markerImageSize = new kakao.maps.Size(40, 42), // 마커 이미지의 크기
            markerImageOptions = {
                offset : new kakao.maps.Point(20, 42)// 마커 좌표에 일치시킬 이미지 안의 좌표
            };

        // 마커 이미지를 생성한다
        var markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerImageSize, markerImageOptions);

        // 지도에 마커를 생성하고 표시한다
        var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(address.lat, address.lng), // 마커의 좌표
            image : markerImage, // 마커의 이미지
            map: map // 마커를 표시할 지도 객체
        });

    } )

    const onWrite = () => {
        // 1. 폼 전체
        let roomform = document.querySelector('.roomform')
        let formdata = new FormData(roomform);
        // 2. 폼 전체 + 주소 정보
        formdata.set( "rname" , address.name );
        formdata.set( "rlat" , address.lat );
        formdata.set( "rlng" , address.lng );
        // 3. 서버에게 요청
        axios.post( "/room/setroom" , formdata ,
            { headers: { 'Content-Type': 'multipart/form-data'  } } )
            .then( re => {
                if( re.data  == true  ){
                    alert("방 등록 성공");
                    window.location.href="/";
                }
                else{ alert("방 등록 실패"); }
            })
    }

    /*
          curl -v -X GET "https://dapi.kakao.com/v2/local/search/address.json" \
          -H "Authorization: KakaoAK ${REST_API_KEY}" \
          --data-urlencode "query=전북 삼성동 100"
     */
    return (
        <div>
            <h3>방 등록</h3>

            <form className="roomform">
                방 이름 : <input type={"text"} name={"rtitle"} />
                가격 : <input type={"text"} name={"rprice"} />
                거래방식 :
                    <select name={"rtrans"}>
                        <option value={"매매"}> 매매 </option>
                        <option value={"전세"}> 전세 </option>
                        <option value={"월세"}> 월세 </option>
                    </select>
                이미지 : <input type="file" multiple="multiple"  name="rimg"/>
                위치[좌표] : <div> { address.name }</div>
                <button type={"button"} onClick={handleClick} > 방 위치 찾기 </button>

                <div>
                    <div id="map" ref={mapContainer} style={{width : '100%' ,height: '350px' }}> </div>
                </div>

                <button type="button" onClick={ onWrite }>등록 </button>
            </form>
        </div>
    )
}