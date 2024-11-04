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
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" 
    : "bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900";

  const calculatorClasses = isDarkMode
    ? "bg-black/30 backdrop-blur-xl"
    : "bg-white/30 backdrop-blur-xl";

  const buttonBaseClasses = isDarkMode
    ? "bg-gray-800/50 hover:bg-gray-700/50 text-white backdrop-blur-sm"
    : "bg-white/50 hover:bg-gray-100/50 text-gray-900 backdrop-blur-sm";

  const operatorClasses = isDarkMode
    ? "bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 text-white"
    : "bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-300 hover:to-pink-300 text-white";

  const buttons = [
    ['AC', '±', '%'],
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.']
  ];

  return (
    <div className={`min-h-screen w-full p-8 flex items-center justify-center ${baseClasses}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className={`relative max-w-sm w-full p-8 rounded-3xl shadow-2xl ${calculatorClasses} border border-white/10`}>
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={toggleTheme}
            className={`p-3 rounded-full ${buttonBaseClasses}`}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <div className="text-5xl font-light tracking-tighter">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            {buttons.map((row, i) => (
              <div key={i} className="grid grid-cols-3 gap-4 mb-4">
                {row.map((btn) => (
                  <button
                    key={btn}
                    onClick={() => {
                      if (btn === 'AC') clear();
                      else if (btn === '±') setDisplay(String(-1 * parseFloat(display)));
                      else if (btn === '%') setDisplay(String(parseFloat(display) / 100));
                      else handleNumber(btn);
                    }}
                    className={`${buttonBaseClasses} p-5 rounded-2xl text-lg font-medium transition-all duration-200 hover:scale-105
                      ${btn === '0' ? 'col-span-2' : ''}`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            ))}
          </div>
          
          <div className="flex flex-col gap-4">
            {[
              { op: '+', icon: <Plus size={24} /> },
              { op: '-', icon: <Minus size={24} /> },
              { op: '*', icon: <X size={24} /> },
              { op: '/', icon: <Divide size={24} /> },
              { op: '=', icon: <Equal size={24} /> }
            ].map(({ op, icon }) => (
              <button
                key={op}
                onClick={() => op === '=' ? calculate() : handleOperator(op)}
                className={`${operatorClasses} p-5 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;