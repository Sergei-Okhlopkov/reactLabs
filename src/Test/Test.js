import React, {  useState, useEffect } from "react";
import axios from 'axios';
import TestQuestion from "./TestQuestion/TestQuestion";
import "./Test.css";

export default function Test(){
    const [isActive, setMarkShown] = useState(false);
    const [getQuestionList, setQuestionList] = useState([]);
    const [getAnswers, setAnswers] = useState([]);
    const [AnswerList, setAnswerList] = useState([0,0,0,0,0,0,0,0,0,0]);
    const [mark, setMark] = useState(0);

    useEffect(()=>{
        
        axios.get("http://localhost:5009/Integral/getQuestions")
        .then(res =>{            
            setQuestionList(res.data);
            
        }).catch(error => console.log(error));

        
        axios.get("http://localhost:5009/Integral/getAnswers")
        .then(res =>{            
            setAnswers(res.data);

        }).catch(error => console.log(error));

    },[]);


    function HandleRadio(event){
        let newAnswerList = AnswerList;
        newAnswerList[event.target.name] =event.target.value;
        setAnswerList(newAnswerList.slice());
        
    }

    function CheckResults(){
        
        axios.post("http://localhost:5009/Integral/checkAnswers", AnswerList)
        .then(res =>{
                setMark(res.data);
        }).catch(error => console.log(error));
        setMarkShown(true);
    }

    let qList = getQuestionList.map((answerValue, index, arr )=>{
                    return (<TestQuestion
                    name= {index}
                    key = {index}
                    HandleRadio={((e)=>HandleRadio(e))}
                    Answer={getAnswers[index]}
                    question = {getQuestionList[index]}
                    />);
            });

    return(
        <div>

            <form>
                {qList}
            </form>
            <button onClick={()=>{CheckResults()}}>Проверить ответы</button>
            <div className={isActive ? 'bg-salmon' : 'mark'}>
                <p>Ваша оценка: {mark}</p>
            </div>

        </div>
    )
}