import React from "react";
import "./IntegralInfo.css"



export default class IntegralInfo extends React.Component{

    state = {
        textHeader: "Метод расчёта",
        methodName: "Метод трапеций",
        methodDescription: "Метод численного интегрирования функции одной переменной, заключающийся в замене подынтегральной функции"+ 
        "на многочлен нулевой степени, то есть константу, на каждом элементарном отрезке. Если рассмотреть график подынтегральной"+ 
        "функции, то метод будет заключаться в приближённом вычислении площади под графиком суммированием площадей конечного числа"+ 
        "прямоугольников, ширина которых будет определяться расстоянием между соответствующими соседними узлами интегрирования, а "+
        "высота — значением подынтегральной функции в этих узлах. Алгебраический порядок точности равен 0. (Для формулы средних п"+
        "рямоугольников равен 1)."     
    }

    constructor(props){
        super(props);
       
    }


    render(){

      
        return <div>
            <header>
                {this.state.textHeader}
            </header>
            <div className="methodDescription">
                <header>{this.state.methodName}</header>
                <p>{this.state.methodDescription}</p>
            </div>
        </div>
    }
}