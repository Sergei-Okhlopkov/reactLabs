import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css"

export default class Menu extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav>
                        <NavLink to="/" end className={(navData) => navData.isActive ? "active" : "" }>Интеграл</NavLink>
                        <NavLink to="/calcBackEnd" className={(navData) => navData.isActive ? "active" : "" }>Интеграл API</NavLink>
                        <NavLink to="/graphic" end className={(navData) => navData.isActive ? "active" : "" }>График</NavLink>
                        <NavLink to="/methodInfo" className={(navData) => navData.isActive ? "active" : "" }>Информация о методе</NavLink>
                        <NavLink  to="/counter" className={(navData) => navData.isActive ? "active" : "" }>Счётчик</NavLink>
                        <NavLink  to="/test" className={(navData) => navData.isActive ? "active" : "" }>Тест</NavLink>
                </nav>
            </div>
        );
    }
}