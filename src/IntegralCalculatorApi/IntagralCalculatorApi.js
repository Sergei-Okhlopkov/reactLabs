import React, {  useState, useRef } from "react";
import "./IntegralCalculatorApi.css"
import "../Answer/AnswerListItem.js"
import AnswerListItem from "../Answer/AnswerListItem.js";
//import API from "./../API/API.js";
import axios from 'axios';


export default function IntegralCalculatorApi(){

    const [A, setA] = useState(0);
    const [B, setB] = useState(10);
    const [get_N, set_N] = useState(100);
    const [textHeader, setTextHeader] = useState("Рассчёт интеграла");
    const [integralFormula, setIntegralFormula] = useState("x");
    const [AnswerList, setAnswerList] = useState([1,2,3]);

    const aValue = useRef(null);
    const bValue = useRef(null);
    const NValue = useRef(null);
    const formulaValue = useRef(null);

    function WriteToState(id){
        switch(id){
                case "a": setA(aValue.current.value);  break;
                case "b": setB(bValue.current.value);break;
                case "N": set_N(NValue.current.value);break;
                case "formula": setIntegralFormula(formulaValue.current.value);break;
            }
    };

    function deleteOne(index){
        let answerList = AnswerList;
        answerList.splice(index, 1); //удаляем элемент массива
        setAnswerList(answerList.slice()); //заменяем старый массив на новый
    };

    function deleteAll() {
        let answerList = AnswerList;
        answerList.splice(0, answerList.length); //удаляем элемент массива
        setAnswerList(answerList.slice()); //заменяем старый массив на новый
    };

    function solution(){
        //Метод трапеций

        console.log(`Нажатие + ${integralFormula}`);
        let a = A;
        let b = B;
        let N = get_N;
        
        let summ = 0;
        
        let postData = {
            expression: integralFormula,
            A: a,
            B: b,
            N: N
        }


        console.log(process.env.REACT_APP_URL_TO_SERVER);
        let newAnswerList = AnswerList;

        axios.post(process.env.REACT_APP_URL_TO_SERVER, postData)
        .then(res =>{
            newAnswerList.unshift(res.data);
            setAnswerList(newAnswerList.slice());
        }).catch(error => console.log(error));

    };

    let ansList = AnswerList.map((answerValue, index, arr )=>{
        if (index===0) {

            return (<AnswerListItem
                    id= {index}
                    key = {index}
                    answer={answerValue}
                    onDelete={()=>deleteOne(index)}
                    className = "checked"
                    />);
        } 
        else {
            
            return (<AnswerListItem
                    id= {index}
                    key = {index}
                    answer={answerValue}
                    onDelete={()=>deleteOne(index)}
                    
                    />);}
    });

    return(<div>
        <header>
            {textHeader}
        </header>
        <div className="subheader">
            Формула интеграла: 
            
            <input id="formula" ref={formulaValue} onChange={(e) =>WriteToState(e.target.id)} placeholder="формула интеграла"/>
            
        </div>
        <div className="params">
            <input id="a" ref={aValue} onChange={(e) => WriteToState(e.target.id)} placeholder="Введите нижнюю границу (a)"/>
            <input id="b" ref={bValue} onChange={(e) => WriteToState(e.target.id)} placeholder="Введите верхнюю границу (b)"/>
            <input id="N" ref={NValue} onChange={(e) => WriteToState(e.target.id)} placeholder="Введите количество разбиений (N)"/>
        </div>
        <div className="buttons">
            <button onClick={()=>solution()}>Рассчитать</button>
            <button onClick={()=>deleteAll()}>Очистить</button>
        </div>
        <div className="listAnswers">
            <div>Ответы:</div>
            {ansList}
        </div>
    </div>)
    // state = {
    //     a: 0,
    //     b: 10,
    //     N: 100,
    //     textHeader: "Рассчёт интеграла",
    //     integralFormula: "x",
    //     AnswerList: [1,2,3]
    // }

    // constructor(props){
    //     super(props);
    //     this.WriteToState = this.WriteToState.bind(this);
    //     this.func = this.func.bind(this);
    //     this.solution = this.solution.bind(this);
    //     this.deleteAll = this.deleteAll.bind(this);
    //     this.deleteOne = this.deleteOne.bind(this);
    //     this.solution = this.solution.bind(this);
    // }

    // WriteToState(event){
    //     //заносим по изменению input значения переменных в State 
    //     // eslint-disable-next-line
    //     switch(event.target.id){
    //         case "a": this.setState({a:event.target.value}, ()=>{console.log(this.state.a);});  break;
    //         case "b": this.setState({b:event.target.value});break;
    //         case "N": this.setState({N:event.target.value});break;
    //         case "formula": this.setState({integralFormula:event.target.value});break;
    //     }

    // }

    // deleteOne(index){
    //     let answerList = this.state.AnswerList;
    //     answerList.splice(index, 1); //удаляем элемент массива
    //     this.setState({ AnswerList: answerList }); //заменяем старый массив на новый
    // }

    // deleteAll() {
    //     let answerList = this.state.AnswerList;
    //     answerList.splice(0, answerList.length); //удаляем элемент массива
    //     this.setState({ AnswerList: answerList }); //заменяем старый массив на новый

    //     // let placeHolder = document.getElementById("placeHolder");
    //     // placeHolder.removeAttribute("hidden");
    //     // placeHolder.setAttribute("hidden","");
    //     // console.log("Удалены все ответы");
    // }

    // func(x){
    //     return Math.pow(x, 3)/(3.0 + x);
    // }

    // solution(){
    //     //Метод трапеций
    //     let a = this.state.a;
    //     let b = this.state.b;
    //     let N = this.state.N;
    //     let integralFormula = this.state.integralFormula;

    //     let postData = {
    //         expression: integralFormula,
    //         A: a,
    //         B: b,
    //         N: N
    //     }

    //     let answer = 50;
    //     //console.log(postData);
    //     console.log(process.env.REACT_APP_URL_TO_SERVER);
    //     let newAnswerList = this.state.AnswerList;

    //     axios.post(process.env.REACT_APP_URL_TO_SERVER, postData)
    //     .then(res =>{
    //         newAnswerList.unshift(res.data);
    //         this.setState({newAnswerList});
    //     }).catch(error => console.log(error));

        
    //     //this.setState({newAnswerList});


    // }

    // render(){

    //     let ansList = this.state.AnswerList.map((answerValue, index, arr )=>{
    //         if (index===0) {
                
    //             return (<AnswerListItem
    //         id= {index}
    //         key = {index}
    //         answer={answerValue}
    //         onDelete={this.deleteOne.bind(this, index)}
    //         className = "checked"
    //         />);
    //         } 
    //         else {
                
    //             return (<AnswerListItem
    //         id= {index}
    //         key = {index}
    //         answer={answerValue}
    //         onDelete={this.deleteOne.bind(this, index)}
            
    //         />);}
    //     });


    //     return <div>
    //         <header>
    //             {this.state.textHeader}
    //         </header>
    //         <div className="subheader">
    //         Формула интеграла: 
    //             <input id="formula" onChange={this.WriteToState}  placeholder="формула интеграла"/>
    //         </div>
    //         <div className="params">
    //             <input id="a" onChange={this.WriteToState} placeholder="Введите нижнюю границу (a)"/>
    //             <input id="b" onChange={this.WriteToState} placeholder="Введите верхнюю границу (b)"/>
    //             <input id="N" onChange={this.WriteToState} placeholder="Введите количество разбиений (N)"/>
    //         </div>
    //         <div className="buttons">
    //             <button onClick={this.solution}>Рассчитать</button>
    //             <button onClick={this.deleteAll}>Очистить</button>
    //         </div>
    //         <div className="listAnswers">
    //             <div>Ответы:</div>
    //             {ansList}
    //         </div>
    //     </div>
    // }
}