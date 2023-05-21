import React, {useState, useReducer} from "react";

function reducer(state, action) {
  //  새로운 상태를 만드는 로직
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      //  아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}

function Counter() {
  // const [number, setNumber] = useState(0)
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({type: "INCREMENT"});
    // setNumber(prevNumber => prevNumber + 1);
    //console.log('+1')
  };
  const onDecrease = () => {
    dispatch({type: "DECREMENT"});
    // setNumber(prevNumber => prevNumber - 1);
    //console.log('-1')
  };

  return (
    <div>
      <h1>{number}</h1>
      {/* 이벤트에 함수를 연결해줄 때, 함수 리터럴 값을 지정해줘야한다. 함수() 라고 지정해주면 안된다. 렌더링 시점에 함수가 트리거된다. */}
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
