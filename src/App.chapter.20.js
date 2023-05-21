import React, {
  useReducer,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Hello from "./Hello";
import "./App.css";
import Wrapper from "./Wrapper";
import Counter from "./Counter";
import InputSample from "./InputSample";
import UserList from "./UserList2";
import UserList16 from "./UserList.chapter.16";
import CreateUser from "./CreateUser";
import reducer from "./reducers/reducers.js";
import { initialState } from "./reducers/reducers.js";

//  2023-04-13 09:19:23
//  Reducer 를 이용한 학습 예제
//  일단은 코드가 작동하도록 문제를 추적해서 해결하고,
//  그 다음, reducer 함수를 파일로 분리하고 상태관리 상황을 조망해보자.
//  여기까지가 오늘 과제...
//  2023-04-13 17:09:47
//  reducer 를 외부 파일로 분리해주었고, 잘 작동한다.
//  GPT 말이, 디렉토리 트리구조가..
//  action 디렉토리를 두고,
//  또 reducers 디렉토리를 두던데..
//  그게 의미가 있겠다.

//  2023-04-13 17:58:17
//  이제 다음 과제로 내일은,
//  velopert 커리큘럼 다음 챕터로 넘어가서,
//  custom Hook, context API 를 마치자.
//  선행학습이 조금은 되어있어서, 많이 어렵진 않을 것 같다.
//  이 두가지면, 비기너 코스는 어느정도 마무리가 되어갈 듯..

//  2023-04-13 19:40:24
//  아니, 그 이전에,
//  이 예제를, action 을 분리하고, action 을 불러와 object 로 빌드해주는 방식으로 바꿔보자.
//  재미 있을 듯..

const countActiveUsers = (users) => {
  console.log("활성 사용자 수를 세는 중...");
  return users.filter((user) => user.active).length;
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users, inputs } = state;
  const { username, email } = inputs;
  const nextId = useRef(users.length + 1);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);
  const onCreate = useCallback(
    (e) => {
      dispatch({
        type: "CREATE_USER",
        user: {
          id: nextId.current,
          username,
          email,
        },
      });
      nextId.current += 1;
    },
    [username, email]
  );
  const onToggle = useCallback((id) => {
    console.log("toggle");
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);
  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
