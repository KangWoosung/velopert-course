import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";

//  2023-05-21 07:29:39
//  jsonplaceholder 에서 json 을 받아와서 출력해주는 예제를 useReducer 로 레퍼런스 참조 없이 만들어본다.

const initialState = {
  users: null,
  loading: true,
  error: null,
};
function reducer(state, actions) {
  console.log("reducer");
  switch (actions.type) {
    case "FETCH_USERS":
      //   console.log("FETCH_USERS", actions.users);
      return {
        ...state,
        users: actions.users,
        loading: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: actions.error,
        loading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${actions.type}`);
  }
  return initialState;
}

const UsersJson = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  // const fetchUsers = async () => {
  //   try {
  //     setError(null);
  //     setLoading(true);
  //     await axios
  //       .get("https://jsonplaceholder.typicode.com/users33")
  //       .then((response) => {
  //         setTimeout(() => {
  //           dispatch({
  //             type: "FETCH_USERS",
  //             users: response.data,
  //           });
  //           setLoading(false);
  //         }, 1500);
  //       });
  //   } catch (e) {
  //     console.log("error", e);
  //     setError(true);
  //   }
  // };
  const fetchUsers = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setTimeout(() => {
        dispatch({
          type: "FETCH_USERS",
          users: response.data,
        });
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!state.users) return null;
  return (
    <>
      <ul>
        {state.users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
};

export default UsersJson;
