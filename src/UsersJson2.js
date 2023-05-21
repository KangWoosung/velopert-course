import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
  users: null,
  data: null,
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        data: action.data,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const UsersJson2 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchUsers = async () => {
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setTimeout(() => {
        dispatch({ type: "SUCCESS", data: response.data });
      }, 1500);
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const { loading, error, data: users } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
};

export default UsersJson2;
