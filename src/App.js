import { useReducer } from "react";

export default function App() {
  return(
    <>
      <DateCounter />
    </>
  );
}

const initialState = {count: 0, step: 1};

function reducer(state, action) {
  // console.log(state, action);
  switch(action.type) {
    case 'inc':
      return { ...state, count: state.count + state.step }

    case 'dec':
      return { ...state, count: state.count - state.step }
    
    case 'setCount':
      return { ...state, count: action.payload }

    case 'setStep':
      return { ...state, step: action.payload }

    case 'reset':
      return { count: 0, step: 1 }
    
    default: 
      return 'Undefined action performed';
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const reset = function () {
    dispatch({type: 'reset'})
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => dispatch({type: 'setStep', payload: Number(e.target.value)})}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({type: 'dec'})}>-</button>
        <input value={count} onChange={(e) => dispatch({type: 'setCount', payload: Number(e.target.value)})} />
        <button onClick={() => dispatch({type: 'inc'})}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
