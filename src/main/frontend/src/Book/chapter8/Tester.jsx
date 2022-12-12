import React from "react";

class Tester extends React.Component{
    constructor(props) {
        super(props);
        this.handlerClick = this.handlerClick.bind(this)
    }

    handlerClick() {
        console.log('test')
    }

    render(){
        return(
            <button onClick={this.handlerClick}>
                test
            </button>
        )
    }
}

export default Tester