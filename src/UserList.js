import React from 'react';


function User({ user }) {
    return (
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
        </div>
    );
}

function UserList() {
  const users = [
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
  ];

  return (
    //  어레이 내장함수로 처리..
    //  map() 과 forEach 함수로 모두 구현해보자...
    //  그러나, forEach 함수는 반환값이 없어서, 아무것도 출력되지 않는다.
    <div>
        { users.map(user => (
            <User user={user} />
        ) ) }
        { users.forEach( user => {
            <User user={user} />
        } ) }
    </div>
  );
}

export default UserList;