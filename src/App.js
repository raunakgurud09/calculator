import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./style.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
    // console.log(state)
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.previousOperand === null && state.currentOperand === null) {
        return state;
      }

    if(state.currentOperand === null){
        return {
            ...state,
            operation:payload.operation
        }
    }
     
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: null,
          currentOperand: state.currentOperand,
        }
      }

      return{
        ...state,
        operation:payload.operation,
        previousOperand:evaluate(state),
        currentOperand:null
      }

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.EVALUATE:
        if(state.currentOperand == null || state.previousOperand == null || state.operation == null ) return {...state}


      return {
        ...state,
        operation:null,
        currentOperand:null,
        previousOperand:evaluate(state)
      }

    default:
      break;
  }
}


function evaluate({currentOperand, previousOperand, operation}){
    const previous = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if(isNaN(previous) && isNaN(current)){return ""}
    let computation = ""
    switch (operation) {
        case '+':
            computation = previous + current
            break;
        case '-':
            computation = previous - current
            break;
        case '*':
            computation = previous * current
            break;
        case '/':
            computation = previous / current
            break;
        default:
            console.log('error')
            break;
    }
    console.log(computation)
    return computation.toString();
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  //   dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 } });

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-output">
          {previousOperand}
          {operation}
        </div>
        <div className="current-output">{currentOperand}</div>
      </div>
      <button
        className="span-2"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >AC</button>
      <button>DEL</button>
      <OperationButton dispatch={dispatch} operation="/" />
      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <OperationButton dispatch={dispatch} operation="*" />
      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <OperationButton dispatch={dispatch} operation="+" />
      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} operation="-" />
      <DigitButton dispatch={dispatch} digit="." />
      <DigitButton dispatch={dispatch} digit="0" />
      {/* <OperationButton dispatch={dispatch} operation="=" /> */}
      <button className="span-2" onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
