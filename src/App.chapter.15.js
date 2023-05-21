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
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: '혜진',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: '미선',
      email: 'liz@example.com',
      active: false
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

  /*  2023-03-25 19:32:35
      onRemove... 
      Array.filter 펑션을 이용하면 sql 을 사용하는 것 처럼 편하다.
  */
  const onRemove = (id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers( users.filter( user => user.id !== id ) );
  }

  /*  2023-03-25 20:17:30
    onToggle...
    Array.map() 을 이용해서,
    id 값을 비교하고, id 가 다르다면 그대로 두고, 같다면 active 값을 반전시키도록 구현을 한다..
    map 에서 리턴해야 할 오브젝트는, 변경된 users 어레이다. 그리고, 그 users 어레이로, state 를 변경해야 한다.

    나의 오답:  users.map( userId => userId === id ? true : false )
    다른 코드:
      const onToggle = id => {
        let newUsers = users.map(user=>{
            user.active=(user.id===id?(!users.active):user.active);
            return user;
        });
        console.log(users, newUsers);
        setUsers(newUsers);
      };
  */
  /*  2023-03-25 20:49:23
      이 쯤에서 작동원리 정리..
      리액트에서 데이터, 스테이트 등이 변경되는 이벤트 처리 방법..
      1. onRemove, onToggle 등의 함수 리터럴을 App.js 에서 선언해서, 하위 콤포넌트에게 이벤트 핸들러 방식으로 전달해준다.
      2. 이 때, onRemove, onToggle 등의 함수 리터럴은, setState 함수 호출을 자신 안에 포함하고 있어야 한다.
      3. 하위 콤포넌트에서 onClick 등의 사용자 이벤트에, onRemove 등 함수 리터럴을 바인딩해준다. 이 때, 꼭 Arrow Function 을 써야 한다.
      4. onRemove 등 (setState 함수가 포함된) 함수 리터럴이 실행되면, 데이터, 스테이트 등에 실제 변동이 발생하고, DOM 리-렌더링이 실행된다.
  */
  const onToggle = (id) => {
    setUsers(
      users.map( user =>
        user.id === id ? {...user, active: !user.active} : user
      )
    )
  }

  return (
    <>
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList2 users={users} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
}

export default App;

