import react from "react";
import { useReducer } from "react";
// import {initialState} from "../App.chapter.20.js"
/*
  2023-04-13 16:59:40
  initialState 가 App 에서 선언되었기 때문에 여기서는 못 읽는다.
  App 에서 선언된 initialState 를 App 에서 export 해주었고,
  여기서는 import {initialState} from "../App.chapter.20.js" 로 읽어왔다.
  끗.
*/

const initialState = {
  inputs: {
    username: "",
    email: "",
  },
  users: [
    {
      id: 1,
      username: "우성",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "미화",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "혜진",
      email: "liz@example.com",
      active: false,
    },
    {
      id: 4,
      username: "조인아",
      email: "liz@example.com",
      active: false,
    }
  ],
};

export default function reducer(state, action) {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.name]: action.value,
          },
        };
      case "CREATE_USER":
        return {
          inputs: initialState.inputs,
          users: state.users.concat(action.user),
          // users: [...state.users, action.user]
        };
      case "TOGGLE_USER":
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === action.id ? {...user, active: !user.active} : user
          ),
        };
      case "REMOVE_USER":
        return {
          ...state,
          users: state.users.filter((user) => user.id !== action.id),
        };
      default:
        return state;
    }
}


export {initialState}