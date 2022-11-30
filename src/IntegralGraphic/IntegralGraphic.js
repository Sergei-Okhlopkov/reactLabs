import React, { useEffect, useState, useRef } from "react";
import "./IntegralGraphic.css"
import {evaluate} from 'mathjs'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const pointsToDraw = 50;


export default function IntegralGraphic (){

    const [textHeader, setTextHeader] = useState("График подинтегральной функции");
    const [integralFormula, setIntegralFormula] = useState("x");
    const [data, setData] = useState([]);

    const formulaValue = useRef(null);

    function WriteToState(){

        setIntegralFormula(formulaValue.current.value);

    };

    function func(xarg){
        
        let scope = {
            x: xarg
        };

        return evaluate(`${integralFormula}`, scope);   
    };

    function Draw(){

        let dataGraphic = [];
        for (var i=-50;i<pointsToDraw;i++){
            dataGraphic.push({x:i, y: func(i)});
        
        }
        
        setData(dataGraphic.slice());
        

    };

    return <div>
                <header>
                <div className="subheader">
                Формула интеграла: 
                    <input id="formula"  ref={formulaValue} onChange={() =>WriteToState()}  placeholder="формула интеграла"/>
                    <button onClick={()=>Draw()}>Отобразить</button>
                </div></header>
                <div>{textHeader}</div>
                <LineChart width={800} height={600} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="y" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="x" />
                    <YAxis />
                </LineChart>
            </div>
   
}






