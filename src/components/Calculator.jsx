import { useState } from 'react';
import '../index.css';

const Calculator = () => {
    const [currentInput, setCurrentInput] = useState("");
    const [operator, setOperator] = useState("");
    const [previousInput, setPreviousInput] = useState("");
    const [shouldResetScreen, setShouldResetScreen] = useState(false);

    const appendNumber = (number) => {
        if (shouldResetScreen) resetScreen();
        setCurrentInput(prev => prev + number);
    };

    const appendDecimal = () => {
        if (!currentInput.includes(".")) {
            setCurrentInput(prev => prev + ".");
        }
    };

    const appendOperator = (op) => {
        if (currentInput === "" && previousInput === "") return;
        if (previousInput !== "") calculateResult();
        setOperator(op);
        setPreviousInput(currentInput);
        setCurrentInput("");
        setShouldResetScreen(false);
    };

    const clearDisplay = () => {
        setCurrentInput("");
        setPreviousInput("");
        setOperator("");
        setShouldResetScreen(false);
    };

    const toggleSign = () => {
        if (currentInput) {
            setCurrentInput((parseFloat(currentInput) * -1).toString());
        }
    };

    const percent = () => {
        if (currentInput) {
            setCurrentInput((parseFloat(currentInput) / 100).toString());
        }
    };

    const calculateResult = () => {
        if (previousInput === "" || currentInput === "") return;

        let result;
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);

        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "×":
                result = num1 * num2;
                break;
            case "÷":
                if (num2 === 0) {
                    alert("Cannot divide by zero!");
                    clearDisplay();
                    return;
                }
                result = num1 / num2;
                break;
            default:
                return;
        }

        setCurrentInput(result.toString());
        setPreviousInput("");
        setOperator("");
        setShouldResetScreen(true);
    };

    const resetScreen = () => {
        setCurrentInput("");
        setShouldResetScreen(false);
    };

    return (
        <div className="app">
            <h1>My Calculator</h1>

            <div className="calculator">
            <marquee behavior="alternate" direction="x">Made By Ethan Kusasirakwe        <span>&copy; 2025</span> </marquee>
                <div className="display">
                    <p>{currentInput || "0"}</p>
                </div>
                
                <div className="buttons">
                    <button className="btn gray" onClick={clearDisplay}>AC</button>
                    <button className="btn gray" onClick={toggleSign}>+/-</button>
                    <button className="btn gray" onClick={percent}>%</button>
                    <button className="btn orange" onClick={() => appendOperator('÷')}>÷</button>

                    <button className="btn dark" onClick={() => appendNumber(7)}>7</button>
                    <button className="btn dark" onClick={() => appendNumber(8)}>8</button>
                    <button className="btn dark" onClick={() => appendNumber(9)}>9</button>
                    <button className="btn orange" onClick={() => appendOperator('×')}>×</button>

                    <button className="btn dark" onClick={() => appendNumber(4)}>4</button>
                    <button className="btn dark" onClick={() => appendNumber(5)}>5</button>
                    <button className="btn dark" onClick={() => appendNumber(6)}>6</button>
                    <button className="btn orange" onClick={() => appendOperator('-')}>-</button>

                    <button className="btn dark" onClick={() => appendNumber(1)}>1</button>
                    <button className="btn dark" onClick={() => appendNumber(2)}>2</button>
                    <button className="btn dark" onClick={() => appendNumber(3)}>3</button>
                    <button className="btn orange" onClick={() => appendOperator('+')}>+</button>

                    <button className="btn dark wide" onClick={() => appendNumber(0)}>0</button>
                    <button className="btn dark" onClick={appendDecimal}>.</button>
                    <button className="btn orange" onClick={calculateResult}>=</button>
                </div>
            </div>
        </div>

    );
};

export default Calculator;