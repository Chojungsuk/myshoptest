import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'; //이거 추가해줌.
import { useState} from 'react';  //이거 추가해줌
import { useSelector, useDispatch } from 'react-redux'; //이거 추가해주셈. / useDispatch는 갖다붙이는거임.
import { changeName, increase } from '../store/userSlice'; 
import { addCount, subItem } from '../store';

function Cart() {

    let mydata = useSelector((state)=>{return state;});
    //store.js에 있는 익스포트한 데이터를 얘(useSelector)가 가져오는거임
    //전달인자를 줄수있는데 유즈셀렉터를 통해서 가져온 스테이트가 state 파라미터로 옮.
    // 걔를 리턴하면 왼쪽에서 변수를 통해 받아주면
    // mydata라는 변수에는 내가 통에서 가져온 모든 state값이 mydata로 들어옴. 그러면 끝
    // mydata(스테이트 여러개 있음)에서 내가 원하는거 뽑아서 사용하면 됨

    let dispatch = useDispatch(); //객체 하나 만듦.

    console.log(mydata);

  return (
    <div>
      <h3>{mydata.user.name} {mydata.user.age}의 장바구니 </h3>
      <button onClick={()=>{
        dispatch(increase(100))   //dispatch(부탁하는함수)로 호출해야함
      }}>나이증가</button>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
          <th>삭제하기</th>
        </tr>
      </thead>
      <tbody>
        {
          mydata.cart.map((a, i)=>{
            return(
              <tr key={i}>  
              {/* 루프돌땐 키값 줘야 개발자도구에서 에러 안뜸 */}
                  <td>{mydata.cart[i].id}</td>
                  <td>{mydata.cart[i].name}</td>
                  <td>{mydata.cart[i].count}</td>
                  <td>
                      <Button onClick={()=>{
                        dispatch(addCount(mydata.cart[i].id));
                        // 체인지내임을 내가 직접호출하는게 아니라 부탁하는거라고 생각하셈!
                        // 디스패치로 하여금 쟤좀 호출해달라고 부탁하는거임.
                        // 그냥 changeName(); 이렇게 해서는 호출 안됨!
                        // 콜백함수랑 원리가 비스무리하다고 함.

                        //dispatch(addCount(0)); -> action(store.js에 있음)으로 0이 넘어감
                        //dispatch(addCount(mydata.cart[i].id));  -> action(store.js에 있음)으로 mydata.cart[i].id이 넘어감
                      }} variant = "primary">+</Button>
                  </td>
                  <td>
                  <Button onClick={()=>{
                        dispatch(subItem(i));
                        //아이디에 해당되는 애를 날리기보다는 해당 인덱스에 대한 데이터를 날리면 될거 같음!
                        //dispatch(subItem(1)); -> 액션스(store.js에 있음)로 1이라는 값이 전달됨.
                      }} variant = "danger">x</Button>
                  </td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
    </div>
  );
}

export default Cart;