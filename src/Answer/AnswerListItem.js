import React from "react";
import "./AnswerListItem.css"

export default class AnswerListItem extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="answerListItem">
                <div className={this.props.className} >{this.props.answer}</div>
                <button onClick={this.props.onDelete}>X</button>
            </div>
        );
    }
}