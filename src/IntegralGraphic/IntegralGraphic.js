import React from "react";
import "./IntegralGraphic.css"
import {evaluate} from 'mathjs'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const pointsToDraw = 50;


export default class IntegralGraphic extends React.Component{

    state = {
        textHeader: "График подинтегральной функции x^3/(3.0+x)",
        integralFormula: "x",
        data: []
    }

    constructor(props){
        super(props);
        this.WriteToState = this.WriteToState.bind(this);
        this.Draw = this.Draw.bind(this);
        this.func = this.func.bind(this);

    }

    WriteToState(event){
        //заносим по изменению input значения переменных в State 
        switch(event.target.id){
            case "formula": this.setState({integralFormula:event.target.value});break;
        }

    }

    Draw(){

        let dataGraphic = [];
        for (var i=-50;i<pointsToDraw;i++){
            dataGraphic.push({x:i, y: this.func(i)});
        
        }
        //console.log(dataGraphic);
        //this.state.data = dataGraphic;
        this.setState({data: dataGraphic});
        //console.log(this.state.data);

    }

    func(xarg){
        
        let scope = {
            x: xarg
        };

        return evaluate(`${this.state.integralFormula}`, scope) ;
       
    }
    
    render(){
        return <div>
            <header>
            <div className="subheader">
            Формула интеграла: 
                <input id="formula" onChange={this.WriteToState}  placeholder="формула интеграла"/>
                <button onClick={this.Draw}>Отобразить</button>
            </div></header>
            <LineChart width={800} height={600} data={this.state.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="y" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="x" />
                <YAxis />
            </LineChart>
        </div>
    }
}






