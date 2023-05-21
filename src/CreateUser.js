import React from 'react';

//  2023-03-25 14:26:42
//  이번 컴포넌트에서는 상태관리를 CreateUser 에서 하지 않고 부모 컴포넌트인 App 에서 하게 하고, input 의 값 및 이벤트로 등록할 함수들을 props 로 넘겨받아서 사용해주겠습니다.

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default CreateUser;