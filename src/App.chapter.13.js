import React, { useState, useRef } from 'react';
import Hello from './Hello';
import './App.css';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import UserList2 from './UserList2';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  //  이번에는 users 도 useState 를 사용하여 컴포넌트의 상태로서 관리해주세요.
  const [users, setUsers] = useState( [
    {
      id: 1,
      username: '미화',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: '혜진',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: '미선',
      email: 'liz@example.com'
    }
  ] );

  //  React 컴포넌트 내의 변수 값을 변경하면, 전체 페이지가 리렌더링된다.
  //  이를 방지하기 위해, useRef(4).current += 1, setVal( {...array, {} } ) 같은 방법이 사용된다.
  //  let useRefObject = useRef(4) 파라메터를 주면, useRefObject.current == 4 가 된다.
  /*
      컴포넌트는 그 컴포넌트의 state나 props가 변경될 때마다 호출되는데(re-rendering), 함수형 컴포넌트는 일반 자바스크립트 함수와 마찬가지로 호출될 때마다 함수 내부에 정의된 로컬 변수들을 초기화합니다. 따라서
      const nextId = { current: 4 };
      nextId.current는 함수가 호출될 때마다 4입니다.
      반면 useRef로 만들어진 객체는 React가 만든 전역 저장소에 저장되기 때문에 함수를 재 호출하더라도 마지막으로 업데이트한 current 값이 유지됩니다.
  */
  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    }
  /*  2023-03-25 17:30:43
      setUsers([...users, user]) 구문에 대한 이해와 숙련이 필요하다.
      여기서 users 는 배열이기 때문에, [] 로 감싸 준 것이다. 객체를 spread 할 때는 {} 를 사용해야 한다.
      setUsers(newArray) 가 결과적인 구문 형식인데, spread 는 앞 객체를 뒤 원소와 병합해줘서 리턴하므로, 결과적으로 하나의 배열을 파라메터로 갖게 된다.
  */
    setUsers([...users, user])
    //  setUsers(users.concat(user));   // spread 방식과 같은 결과를 갖는다.
    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
    console.log('nextId.current :'+nextId.current);
  }

  return (
    <>
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList2 users={users} />
    </>
  );
}

export default App;




