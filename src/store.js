import {configureStore, createSlice} from "@reduxjs/toolkit";
import user from "./store/userSlice"; //이거 추가해줌
//리덕스에선 스테이트 변수를 슬라이스라고 부름.
// let user = createSlice({    // 하나의 객체로 받을수 있음(let user)
//     name : 'state 이름...',
//     initialState : '값'
// })
//리덕스에선 useState 사용하지 않음
//생소한 형식인데, 리덕스에서는 스테이트를 이렇게 보관함.
//이건 문법인데, 스테이트값을 네임이라는 키와 이시셜스테이트라는 키값으로 관리. 네임의 값으로 스테이트의 이름이 들어감
//그리고 이니셜스테이트에는 값이 들어감(초기값).
// let user = useState('kim');  -> 스테이트를 만들건데 스테이트의 변수의 값은 kim고 이름은 user. 






export let { changeName, increase } = user.actions    //increase 추가해주셈.
//액션스 안에 name : 'user',
    // initialState : 'kim',
    // reducers : {
    //     변경함수(){
    //         changeName(){
    //             return 'park' 이 정보들이 다 담김!
    //구조분해할당!  / 외부에서 changeName() 사용할수 있음

let stock = createSlice({    
    name : 'stock',
    initialState : [10, 11, 12],
    reducers : {
        changestock(){
        }
    } 
}) //{stock : [10, 11, 12]} 이렇게 생각하셈

let cart = createSlice({    
    name : 'cart',
    initialState : [
        {id : 0,  name : 'white and Black', count : 1},
        {id : 1,  name : 'Grey Yordan', count : 1},
      ],
      reducers : {
       addCount(state, action){
           

            let index = state.findIndex((a)=>{return action.payload === a.id})

        //findIndex : 내가 찾고자 하는 데이터가 있으면 이안에서 그걸 비교해서 해당 위치의 인덱스를 리턴해주는 애 
        //action.payload값과 findIndex안 콜백함수의 전달인자 a(배열의 요소가 하나씩 차례로 들어감) / a는 {id : 0,  name : 'white and Black', count : 1} 요 한줄임!

        state[index].count++;  //1씩 증가함

        //state는 [
    //     {id : 0,  name : 'white and Black', count : 1},
    //     {id : 1,  name : 'Grey Yordan', count : 1}
    //   ]임
     },
     addItem(state, action){ 
        state.push(action.payload) //state는 배열임.
        //{id : findobj.id,  name : findobj.title, count : 1}(Detail.js에 있음)가 action으로 넘어옴
     },
     subItem(state, action){
        //배열에서 특정 인덱스의 요소를 삭제
        console.log(state.length); 
        console.log(action.payload);
        state.splice(action.payload, 1);
        //splice함수의 사용방법 : 해당 배열에서 내가 삭제하고자하는 행의 인덱스를 첫번째 전달인자에 넣음. 두번째 전달인자엔 몇개를 삭제할건지를 넣음.
     }
    } 
})

export let { addCount, addItem, subItem } = cart.actions  //이거 추가해주셈 / 구조분해할당을 통해서! 

export default configureStore({
    reducer : {
        
        //리듀서라는 속성에 값을 넣어줄수 있음

        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer
        // user(외부에선 얘를 가져다 씀) : user(위에 let user =~~임).reducer
    }
})// 실제 외부에 드러날수잇게 해주는 인터페이스임.

//이해하려고 하지말고 이렇게 만들어놓고 쓰셈
// 리액트보면 객체지향구조랑 비슷함. 유저라는애가 통안에 갖혀잇는거고(캡슐화) 외부로 뺄땐 익스포트 키워드 통해서
// 변수자체를 노출하는게 아니라 인터페이스를 통해서 나갈수있게끔.
// 객체지향 개념 이해하고 잇으면 새로운거 접하더라도 형식이 비슷함.
//reducer : {user : user.reducer} -> 이 인터페이스 통해서 외부에 노출 한다는듯.

