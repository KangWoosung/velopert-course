import React, { useEffect } from 'react';

/*  2023-03-30 00:13:30
  useEffect 는, 컴포넌트의 onLoad(), onComplete() 같은 이벤트에서 state, prop 등의 변경을 주거나 캐치하는 데 쓰인다.
  이 예제에서, User 컴포넌트는 호출되는 횟수 만큼, 화면에 나타났다가 사라지기를 반복하게 된다.
  파라메터로 데이터오브젝트를 주면, 데이터의 내용이 변경될 때마다,
  JS 에서 onLoad(), doc.ready() 에 Ajax API 질의를 바인딩하는 방식과 비슷하게, 컴포넌트가 load 되는 시점에 외부 API 질의를 하고 받아오는 방식으로 활용할 수 있다.

  * 여기서 궁금한 점.. 
    User 컴포넌트가 5회 로드 되었다면, useEffect 훅은 5개가 메모리에 대기하고 있는 것인가?
    그렇다면, 대규모 iteration 에서는 비효율적인 방식 같은데...
  
  * GPT 선생의 정리...
  useEffect는 React 컴포넌트에서 Side Effect를 처리하는 가장 일반적인 방법 중 하나입니다. Side Effect란 컴포넌트가 렌더링될 때 발생하지 않는 외부에 의해 발생하는 작업을 말합니다. 주요 사용 사례는 다음과 같습니다.

  1. API 호출: useEffect를 사용하여 API를 호출하고, 해당 결과를 상태(state)에 저장하거나 컴포넌트에 전달합니다.
  2. 이벤트 리스너 등록: useEffect를 사용하여 브라우저 이벤트 리스너를 등록하거나 해제합니다.
  3. 타이머 설정: useEffect를 사용하여 타이머를 설정하고, 타이머가 만료되면 특정 작업을 수행합니다.
  4. 로컬 스토리지(Local Storage) 조작: useEffect를 사용하여 로컬 스토리지에 데이터를 저장하거나, 로컬 스토리지에서 데이터를 로드합니다.
  5. 애니메이션 구현: useEffect를 사용하여 CSS 애니메이션, SVG 애니메이션 등을 구현합니다.
  6. 컴포넌트 마운트 및 언마운트 처리: useEffect를 사용하여 컴포넌트가 마운트될 때, 언마운트될 때 처리해야 하는 작업을 처리합니다.
  useEffect는 비동기적으로 처리되므로, 애플리케이션의 성능에도 긍정적인 영향을 미칠 수 있습니다. 따라서, React에서 Side Effect를 처리해야 할 때는 useEffect를 적극 활용하는 것이 좋습니다.
*/

function User({ user, onRemove, onToggle }) {
  //  useEffect 안에서 사용하는 상태나, props 가 있다면, useEffect 의 [deps] 에 넣어주어야 합니다. 그렇게 하는게, 규칙입니다.
  useEffect(() => {
    console.log('user 값이 설정됨');
    console.log(user);
    return () => {
      console.log('user 가 바뀌기 전..');
      console.log(user);
    };
  }, [user]);
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'orange' : 'black'
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default UserList;