import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({    // 하나의 객체로 받을수 있음(let user)
    name : 'user',
    initialState : { name : 'kim', age : 20 }, //
    reducers : {
            changeName(state){    
                state.name = 'park';  //여기서 state를 this라고 생각하셈 state는 { name : 'kim', age : 20 }인듯????
            },
            increase(state, action){  //action는 파라미터 하나 더 뚫어서 1씩증가한다 10씩증가한다를 
                state.age = state.age + action.payload;  //payload(사전적 의미 : 화물 ) / 보통 리덕스에선 함수 파라미터를 이름정해놓는데 보통 action이라고 함
            },
        }
})  // {user : 'kim'} 이라고 생각하셈

export let { changeName, increase } = user.actions 
export default user;
