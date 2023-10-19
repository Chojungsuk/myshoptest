import { useParams, useNavigate } from "react-router-dom"; //유즈네비게이트 추가 
import styled from 'styled-components';
import { useEffect, useState, useContext } from "react";
import { Nav } from 'react-bootstrap';
import { Context1 } from '../App.js';
import {addItem} from "../store.js";
import { useDispatch } from "react-redux";

// class Detail2 extends React.Component{
 
//   componentDidMount(){

//   }

//   componentDidUpdate(){

//   }

//   componentWillUnmount(){

//   }
  
//   render(){
//     return(
//       <div>

//       </div>
//     )
//   }
// }

//useEffect 훅
function Detail(props){

    let dispatch = useDispatch(); //객체 하나 생성.
    let navigate = useNavigate();
    let {재고} = useContext(Context1)

    let [fade2, setFade2] = useState('')

    let [tab, setTab] = useState(0);
    let [idx, setIdx] = useState(0);
    let[num, setNum] = useState('');
    let[alert, setAlert] = useState(true);
    let[count, setCount] = useState(0);
    let {id} = useParams();
    let findobj = props.shoes.find((obj) => obj.id == id)

    useEffect(()=>{
      let timer = setTimeout(()=>{
        setFade2('end');
      }, 100);

      if(isNaN(num) == true){
            window.alert('숫자가 아닙니다.');
      }

      setIdx(Number(id) + 1); //id + 1 ==> 11

      return (
        ()=>{
        //  기존 타이머를 제거해주세요~~~
          clearTimeout(timer);
          setFade2('');
        }
      )
    }, [])

    return(
      <div className={"container start " + fade2}>
        {/* {
          (alert == true) ?
            <div className="alert alert-warning">
              2초 이내 구매시 할인
            </div> 
            : null 
        } */}
      
        {/* {재고[1]} */}
          <div className="col-md-4">
            <img src ={`https://jamsuham75.github.io/image/shoes${idx}.jpg`} width="80%"></img>
          </div>

          {/* <input type = "text" onChange={(e)=>{
            setNum(e.target.value);
          }}></input> */}

          <div className = "col-md-6 mt-4">
            <h4 className="pt-5">{findobj.title}</h4>
            <p>{findobj.content}</p>
            <p>{findobj.price}</p>
            <p>{findobj.id}</p>

            <button className="btn btn-danger" onClick={
             ()=>{
              console.log('아이템 추가') //안되서 확인차 콘솔로그 찍어본거인듯.
              dispatch(addItem({id : findobj.id,  name : findobj.title, count : 1}))
              navigate('/cart');
             }}>주문하기</button><br></br>
             {/* findobj 안에 */}
          </div>   

          <Nav variant="tabs" defaultActiveKey="link-0">
            <Nav.Item>
              <Nav.Link onClick={()=>{ setTab(0)} } eventKey="link-0">상세정보</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={()=>{ setTab(1)} } eventKey="link-1">리뷰</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={()=>{ setTab(2)} } eventKey="link-2">문의사항</Nav.Link>
            </Nav.Item>
          </Nav>
          <TabContent shoes = {props.shoes} tab = {tab}></TabContent>
          
      </div>
    )
}

function TabContent({tab, shoes}){

  let [fade, setFade] = useState('');
  let {재고} = useContext(Context1);

  useEffect(()=>{
    // end를 저기 부착해주세요.
    let timer = setTimeout(()=>{setFade('end')}, 100);
    // setFade('end');
    return ()=>{
      clearTimeout(timer);
      setFade('');
    }
  }, [tab])

  return <div className={"start " + fade}>
    {[<div>{재고}</div>, <div>겁나 좋아요</div>, <div>언제 배송되나요?</div>][tab]}
  </div>
}

export default Detail;