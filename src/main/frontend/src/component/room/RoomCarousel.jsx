import Carousel from 'react-bootstrap/Carousel';
import React from "react";

function RoomCarousel(props) {
    return (
        <Carousel>
            {
                props.imges.getrimg.map( ( img )=>{
                    return(
                        <Carousel.Item>
                            <img src={"http://localhost:8080/static/media/"+img } style={{width : 300}} />
                            <Carousel.Caption>
                                <h3>사진이당</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                } )
            }
        </Carousel>
    );
}

export default RoomCarousel;