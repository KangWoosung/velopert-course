import React, { useState, useRef } from 'react';


function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });

  //  useRef() 로 Ref 객체를 만들어 훅을 걸어줄 DOM 에 바인딩해주면 된다.
  const nameInput = useRef();

  //  inputs 는 객체로, onChange 바인딩 된 모든 input 객체를 모은 객체이고,
  //  현 시점에서 inputs 객체를 풀어쓰면,
  //  { name: 'dwsew2', nickname: '32r3fsfvw'}
  //  이렇다.
  //   console.log(inputs);
  const {name, nickname} = inputs; // 비구조화 할당을 통해 값 추출
  //  name 은 input[name=name] 객체의 value 이다.
  //   console.log(name);
  //   console.log(nickname);

  const onChange = (e) => { 
    // 우선 e.target 에서 name 과 value 를 추출
    const { value, name } = e.target;
    // 스프레드 문법으로, 업데이트될 객체의 복사본을 만들고 업데이트 항목의 값을 집어넣는다.
    const updateObj = {...inputs, [name]: value}
    // 업데이트된 객체를 setState 함수에 전달해준다.
    setInputs(updateObj);
  }
  const onReset = (e) => {
    setInputs({
      name: '',
      nickname: '',
    });
    nameInput.current.focus()
  }

  return (
    <div>
      {/* input 태그에 value 가 꼭 들어가야만 한다. 그렇지 않으면 input 의 값은 초기화가 되지 않는다. */}
      {/* useRef 로 만들어준 훅을 DOM 객체에 ref 로 걸어준다. 이렇게 해서 DOM 에 접근할 수 있다.   */}
      <input name='name' placeholder='이름' onChange={onChange} value={name} 
        ref={nameInput}
      />
      <input name='nickname' placeholder='닉네임' onChange={onChange} value={nickname}/>
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;