import React, {  useState, useRef } from "react";
import "./TestQuestion.css";


export default function TestQuestion(props){

    return(
        <div>
                <div className="question">{props.question}</div>
                <ul>
                    <li><label><input name={props.name} value="1" type="radio" onChange={props.HandleRadio}/> {props.Answer[0]}</label></li>
                    <li><label><input name={props.name} value="2" type="radio" onChange={props.HandleRadio}/> {props.Answer[1]}</label></li>
                    <li><label><input name={props.name} value="3" type="radio" onChange={props.HandleRadio}/> {props.Answer[2]}</label></li>
                    <li><label><input name={props.name} value="4" type="radio" onChange={props.HandleRadio}/> {props.Answer[3]}</label></li>
                    
                </ul>
        </div>
    )
}