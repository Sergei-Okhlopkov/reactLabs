import React from "react";
import "./IntegralCalculatorApi.css"
import "../Answer/AnswerListItem.js"
import AnswerListItem from "../Answer/AnswerListItem.js";
//import API from "./../API/API.js";
import axios from 'axios';


export default class IntegralCalculatorApi extends React.Component{

    state = {
        a: 0,
        b: 10,
        N: 100,
        textHeader: "Рассчёт интеграла",
        integralFormula: "x",
        AnswerList: [1,2,3]
    }

    constructor(props){
        super(props);
        this.WriteToState = this.WriteToState.bind(this);
        this.func = this.func.bind(this);
        this.solution = this.solution.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.solution = this.solution.bind(this);
    }

    WriteToState(event){
        //заносим по изменению input значения переменных в State 
        // eslint-disable-next-line
        switch(event.target.id){
            case "a": this.setState({a:event.target.value}, ()=>{console.log(this.state.a);});  break;
            case "b": this.setState({b:event.target.value});break;
            case "N": this.setState({N:event.target.value});break;
            case "formula": this.setState({integralFormula:event.target.value});break;
        }

    }

    deleteOne(index){
        let answerList = this.state.AnswerList;
        answerList.splice(index, 1); //удаляем элемент массива
        this.setState({ AnswerList: answerList }); //заменяем старый массив на новый
    }

    deleteAll() {
        let answerList = this.state.AnswerList;
        answerList.splice(0, answerList.length); //удаляем элемент массива
        this.setState({ AnswerList: answerList }); //заменяем старый массив на новый

        // let placeHolder = document.getElementById("placeHolder");
        // placeHolder.removeAttribute("hidden");
        // placeHolder.setAttribute("hidden","");
        // console.log("Удалены все ответы");
    }

    func(x){
        return Math.pow(x, 3)/(3.0 + x);
    }

    solution(){
        //Метод трапеций
        let a = this.state.a;
        let b = this.state.b;
        let N = this.state.N;
        let integralFormula = this.state.integralFormula;

        let postData = {
            expression: integralFormula,
            A: a,
            B: b,
            N: N
        }

        let answer = 50;
        //console.log(postData);
        console.log(process.env.REACT_APP_URL_TO_SERVER);
        let newAnswerList = this.state.AnswerList;

        axios.post(process.env.REACT_APP_URL_TO_SERVER, postData)
        .then(res =>{
            newAnswerList.unshift(res.data);
            this.setState({newAnswerList});
        }).catch(error => console.log(error));

        
        //this.setState({newAnswerList});


    }

    render(){

        let ansList = this.state.AnswerList.map((answerValue, index, arr )=>{
            if (index===0) {
                
                return (<AnswerListItem
            id= {index}
            key = {index}
            answer={answerValue}
            onDelete={this.deleteOne.bind(this, index)}
            className = "checked"
            />);
            } 
            else {
                
                return (<AnswerListItem
            id= {index}
            key = {index}
            answer={answerValue}
            onDelete={this.deleteOne.bind(this, index)}
            
            />);}
        });


        return <div>
            <header>
                {this.state.textHeader}
            </header>
            <div className="subheader">
            Формула интеграла: 
                <input id="formula" onChange={this.WriteToState}  placeholder="формула интеграла"/>
            </div>
            <div className="params">
                <input id="a" onChange={this.WriteToState} placeholder="Введите нижнюю границу (a)"/>
                <input id="b" onChange={this.WriteToState} placeholder="Введите верхнюю границу (b)"/>
                <input id="N" onChange={this.WriteToState} placeholder="Введите количество разбиений (N)"/>
            </div>
            <div className="buttons">
                <button onClick={this.solution}>Рассчитать</button>
                <button onClick={this.deleteAll}>Очистить</button>
            </div>
            <div className="listAnswers">
                <div>Ответы:</div>
                {ansList}
            </div>
        </div>
    }
}