import React from "react";

class Ex1_Event extends React.Component (){

    constructor(props) {
        super(props);
        this.state = {isToggleOn : true};
        this.handlerClick = this.handlerClick.bind(this);
    }

    handlerClick(){
        this.setState(
            prevState =>({
                isToggleOn : !prevState.isToggleOn
            })
        )
    }

    render(){
        return(
            <button onClick={this.handlerClick}>
                {this.state.isToggleOn ? '켜짐' : '꺼짐'}
            </button>
        );
    }
}

export default Ex1_Event