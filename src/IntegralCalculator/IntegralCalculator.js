import React from "react";
import "./IntegralCalculator.css"
import "../Answer/AnswerListItem.js"
import AnswerListItem from "../Answer/AnswerListItem.js";

export default class IntegralCalculator extends React.Component{

    state = {
        a: 0,
        b: 4,
        N: 10,
        textHeader: "Рассчёт интеграла",
        integralFormula: "x^3/(3.0+x)",
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
        let h = parseFloat((b-a)/N);
        let summ = 0;
        

        for(let i = 0; i< N-1; i++){
            let x = parseFloat(a+i*h);
            // eslint-disable-next-line
            summ += h* this.func(x);
        }
        let newAnswerList = this.state.AnswerList;
        newAnswerList.unshift(summ);
        this.setState({newAnswerList});


    }

    render(){

        let ansList = this.state.AnswerList.map((answerValue, index, arr )=>{
            if (index===0) {
                console.log("gfjhkik!!!");
                return (<AnswerListItem
            id= {index}
            answer={answerValue}
            onDelete={this.deleteOne.bind(this, index)}
            className = "checked"
            />);
            } 
            else {
                console.log("gfjhkik!!!");
                return (<AnswerListItem
            id= {index}
            answer={answerValue}
            onDelete={this.deleteOne.bind(this, index)}
            
            />);}
        });

        // let optionsList = this.state.AnswerList.map((currentElement, index, array)=>{
        //     if (array.length-1 === index )return <option key={index} className="lastAnswer">{array[index]}</option>;
        //     else return <option key={index}>{array[index]}</option>
        // });

        return <div>
            <header>
                {this.state.textHeader}
            </header>
            <div className="subheader">
                Формула интеграла: {this.state.integralFormula}
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