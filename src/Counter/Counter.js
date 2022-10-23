import React from 'react';

export default class Counter extends React.Component {
             
    constructor(props) {
        super(props);
        this.state = {counter: props.defaultValue};
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }
    
    increment(){
        this.setState(function(prevState, props){
            console.log("counter" + this.state.counter);
            return {
                counter: parseInt(prevState.counter) + parseInt(props.step)
            }   
        })
        
    }

    decrement(){
        this.setState(function(prevState, props){
            return {
                counter: parseInt(prevState.counter) - parseInt(props.step)
            }   
        })
    }

    render() {
        return <div>
            <p>Счётчик: {this.state.counter}</p>
            <div>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
            </div>
        </div>
    }
}