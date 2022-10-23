import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Counter from "./Counter/Counter";
import IntegralCalculator from './IntegralCalculator/IntegralCalculator';
import Menu from "./Menu/Menu";
import IntegralInfo from './IntegralInfo/IntegralInfo';
import IntegralGraphic from './IntegralGraphic/IntegralGraphic';



function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Menu/>
        <Routes>
          <Route path="/"  element={<IntegralCalculator/>}/>
          <Route path="/graphic" element={<IntegralGraphic />}/>
          <Route path="/methodInfo" element={<IntegralInfo/>}/>
          <Route path="/counter" element={<Counter  defaultValue="8" step = "3"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
