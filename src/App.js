import './App.css'

import { useState } from 'react';
import { Sun, Moon, Plus, Minus, X, Divide, Equal } from 'lucide-react';

const Calculator = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumberStarted, setNewNumberStarted] = useState(true);

  const handleNumber = (num) => {
    if (newNumberStarted) {
      setDisplay(num);
      setNewNumberStarted(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op) => {
    setOperation(op);
    setFirstNumber(parseFloat(display));
    setNewNumberStarted(true);
  };

  const calculate = () => {
    if (firstNumber === null || operation === null) return;
    
    const secondNumber = parseFloat(display);
    let result;

    switch (operation) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '*':
        result = firstNumber * secondNumber;
        break;
      case '/':
        result = firstNumber / secondNumber;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setFirstNumber(null);
    setOperation(null);
    setNewNumberStarted(true);
  };

  const clear = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
    setNewNumberStarted(true);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const baseClasses = isDarkMode 
    ? "bg-gray-900 text-white" 
    : "bg-gray-50 text-gray-900";

  const buttonBaseClasses = isDarkMode
    ? "bg-gray-800 hover:bg-gray-700 text-white"
    : "bg-white hover:bg-gray-100 text-gray-900";

  const operatorClasses = isDarkMode
    ? "bg-orange-600 hover:bg-orange-500 text-white"
    : "bg-orange-400 hover:bg-orange-300 text-white";

  const buttons = [
    ['AC', '±', '%'],
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.']
  ];

  return (
    <div className={`max-w-xs mx-auto p-6 rounded-3xl shadow-2xl transition-colors duration-300 ${baseClasses}`}>
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full ${buttonBaseClasses}`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="text-4xl font-light tracking-tight">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-3">
          {buttons.map((row, i) => (
            <div key={i} className="grid grid-cols-3 gap-3 mb-3">
              {row.map((btn) => (
                <button
                  key={btn}
                  onClick={() => {
                    if (btn === 'AC') clear();
                    else if (btn === '±') setDisplay(String(-1 * parseFloat(display)));
                    else if (btn === '%') setDisplay(String(parseFloat(display) / 100));
                    else handleNumber(btn);
                  }}
                  className={`${buttonBaseClasses} p-4 rounded-2xl text-lg font-medium transition-colors duration-200
                    ${btn === '0' ? 'col-span-2' : ''}`}
                >
                  {btn}
                </button>
              ))}
            </div>
          ))}
        </div>
        
        <div className="flex flex-col gap-3">
          <button onClick={() => handleOperator('+')} className={`${operatorClasses} p-4 rounded-2xl transition-colors duration-200`}>
            <Plus size={20} className="mx-auto" />
          </button>
          <button onClick={() => handleOperator('-')} className={`${operatorClasses} p-4 rounded-2xl transition-colors duration-200`}>
            <Minus size={20} className="mx-auto" />
          </button>
          <button onClick={() => handleOperator('*')} className={`${operatorClasses} p-4 rounded-2xl transition-colors duration-200`}>
            <X size={20} className="mx-auto" />
          </button>
          <button onClick={() => handleOperator('/')} className={`${operatorClasses} p-4 rounded-2xl transition-colors duration-200`}>
            <Divide size={20} className="mx-auto" />
          </button>
          <button onClick={calculate} className={`${operatorClasses} p-4 rounded-2xl transition-colors duration-200`}>
            <Equal size={20} className="mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;