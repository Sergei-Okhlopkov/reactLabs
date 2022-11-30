import React, {  useState, useRef } from "react";
import "./IntegralCalculator.css"
import "../Answer/AnswerListItem.js"
import AnswerListItem from "../Answer/AnswerListItem.js";
import {evaluate} from 'mathjs'


export default function IntegralCalculator() {

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

    function func(xarg){
        
        let scope = {
            x: xarg
        };

        return evaluate(`${integralFormula}`, scope) ;
    };

    function solution(){
        //Метод трапеций

        console.log(`Нажатие + ${integralFormula}`);
        let a = A;
        let b = B;
        let N = get_N;
        let h = parseFloat((b-a)/N);
        let summ = 0;
        

        for(let i = 0; i < N; i++){
            let x = parseFloat(a+i*h);
            // eslint-disable-next-line
            summ += h* func(x);
        }
        let newAnswerList = AnswerList;
        newAnswerList.unshift(summ);
        setAnswerList(newAnswerList.slice());


    }

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
}

