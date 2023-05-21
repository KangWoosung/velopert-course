import React, {useState, useRef, useEffect, useMemo} from "react";
import Hello from "./Hello";
import "./App.css";
import Wrapper from "./Wrapper";
import Counter from "./Counter";
import InputSample from "./InputSample";
import UserList from "./UserList";
import UserList16 from "./UserList.chapter.16";
import CreateUser from "./CreateUser";

//  2023-04-13 08:43:06
// function countActiveUsers(users) {
//   console.log("활성 사용자 수를 세는 중...");
//   return users.filter((user) => user.active).length;
// }

function App() {
  const countActiveUsers = (users) => {
    console.log("활성 사용자 수를 세는 중...");
    return users.filter((user) => user.active).length;
  };

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const {username, email} = inputs;
  const onChange = (e) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  //  이번에는 users 도 useState 를 사용하여 컴포넌트의 상태로서 관리해주세요.
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "미화",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "혜진",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "미선",
      email: "liz@example.com",
      active: false,
    },
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    /*  2023-03-25 17:30:43
      setUsers([...users, user]) 구문에 대한 이해와 숙련이 필요하다.
      여기서 users 는 배열이기 때문에, [] 로 감싸 준 것이다. 객체를 spread 할 때는 {} 를 사용해야 한다.
      setUsers(newArray) 가 결과적인 구문 형식인데, spread 는 앞 객체를 뒤 원소와 병합해줘서 리턴하므로, 결과적으로 하나의 배열을 파라메터로 갖게 된다.
  */
    setUsers([...users, user]);
    //  setUsers(users.concat(user));   // spread 방식과 같은 결과를 갖는다. concat 은 복제 오브젝트에 파라메터 데이터를 병합하여 리턴한다.
    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
    console.log("nextId.current :" + nextId.current);
  };

  /*  2023-03-25 19:32:35
      onRemove... 
      Array.filter 펑션을 이용하면 sql 을 사용하는 것 처럼 편하다.
  */
  const onRemove = (id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter((user) => user.id !== id));
  };

  const onToggle = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? {...user, active: !user.active} : user
      )
    );
  };
  //  input 에 keyup 이 되어도 이 함수가 호출된다... 이것은 원하지 않았던 것..
  // const count = countActiveUsers(users);
  //  useMemo 훅을 이용해서 이 문제를 해결한다.
  //  useEffect 처럼, [deps] 데이터를 넣어주면, deps 가 변경될 때에만 함수가 호출된다.
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList16 users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
