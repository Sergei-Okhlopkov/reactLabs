import React from "react";
import "./IntegralGraphic.css"
import graphic from "../images/Graphic.png"


export default class IntegralGraphic extends React.Component{

    state = {
        textHeader: "График подинтегральной функции x^3/(3.0+x)"
    }
    
    
    render(){
        return <div>
            <header>{this.state.textHeader}</header>
            <img src={graphic}/>
        </div>
    }
}






