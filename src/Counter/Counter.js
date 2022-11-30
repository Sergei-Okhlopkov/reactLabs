import React, { useState } from "react";

export default function Counter(props){
    
    const [counter, setCounter] = useState(props.defaultValue);

    function increment(){
        setCounter(parseInt(counter)+parseInt(props.step));
        
    };

    function decrement(){
        setCounter(counter-props.step);
    };

    return (<div>
            <p>Счётчик: {counter}</p>
            <div>
                <button onClick={() => increment()}>+</button>
                <button onClick={() => decrement()}>-</button>
            </div>
        </div>);

}