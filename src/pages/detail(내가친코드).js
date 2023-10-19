import { useParams } from "react-router-dom"; 
import styled from 'styled-components'  
import { useEffect, useState, useContext } from "react"; //useContext 추가해줌  
import  {Nav}  from 'react-bootstrap'; //이거 리액트부트스트랩 홈피에서 가져와서 붙여줌 Nav를 {Nav}로 수정해주셈
import { Context1 } from "../App(내가친코드).js";  //이거 추가해줌 /  ../ -> 나를기준으로 한칸위임 / 

// class Detail2 extends React.Component{
  
//   componentDidMount(){

//   } 

//   componentDidUpdate(){

//   }
// //데이터가 업데이트될때 처리해주고 싶으면 여기다 작성해주셈
//   componentWillUnmount(){

//   }
// //언마운트 되는 시점에 처리할게 있으면 여기다 작성해주셈!
//   render(){
//     return(
//     <div>

//     </div>
//     )
//   }
// }

//useEffect 훅  ->    앞에 use붙으면 훅임!!

function Detail(props){

  let {재고} = useContext(Context1)
  // 유즈콘텍스트가 해주는일은 보관함에 스테이트가 들어있는데 해체해주는 역할을함!!
  // 왼쪽에서 해체된 데이터를 받으면 됨. 
  // 구조분해할당임. 콘텍스트1안에 스테이트들이 한셋트 들어있으면 뽑아올수있음!
  let [fade2, setFade2] = useState('')

  let [tab, setTab] = useState(1);
  let [idx, setIdx] = useState(0); //이거 추가해줌 / idx라(타입은 정수)는 변수가 ~  
  let[num, setNum] = useState(''); 
  let[alert,setAlert] = useState(true);
  let[count,setCount] = useState(0);
  let {id} = useParams(); 
  let findobj = props.shoes.find((obj) => obj.id == id)

  useEffect(()=>{
    let timer = setTimeout(()=>{    
      setFade2('end');   
    }, 100);  

    if(isNaN(num) == true){
           window.alert('숫자가 아닙니다.');
    }
 
    setIdx(Number(id) + 1);  //이거 추가해줌! / 0이라는 숫자를 가져오더라도 타입은 문자열임. 그래서 id그대로 가져와서 쓰면 id가 0이 들어오면 id+1 ==>01 
    //파람스를 통해서 넘어온 id는 문자열임!   / 그래서 Number()로 타입캐스팅 해줌!

    return (
      ()=>{
        //기존 타이머를 제거해주세요~~~ 여기다가 이런 코드 작성하면 됨 // 정리하는 코드 : Cleanup Function
        clearTimeout(timer); 
        setFade2('');  
      }
    )
  }, [])
  
  
    return(
      <div className = {"container start " + fade2}>
        {/* {
          (alert == true) ? 
          <div className="alert alert-warning">
           2초 이내 구매시 할인
          </div> 
          : null
        } */}

  {재고[1]}
        <div className="col-md-4">
            <img src={`https://jamsuham75.github.io/image/shoes${idx}.jpg`} width="80%"></img>
           </div>

            {/* <input type = "text" onChange={(e)=>{
              // if(isNaN(e.target.value) == true){
              //   window.alert('숫자가 아닙니다.');
              // }
              setNum(e.target.value);
              //검사하는 방식은 비동기 방식으로 (검사하는 과정 오래걸릴수도 있음) -> 유즈스테이트에서 처리하는게 좋음!
            }}></input> */}

            <div className = "col-md-6 mt-4"> 
            <h4 className = "pt-5">{findobj.title}</h4>
             <p>{findobj.content}</p>
             <p>{findobj.price}</p>
             <button className="btn btn-danger" onClick={
              ()=>{
                setCount(count+1);
              }
             }>주문하기</button><br></br>
             {count}
            </div>
      
       <Nav variant="tabs" defaultActiveKey="link-0"> 
       {/* defaultActiveKey -> 시작할때 첫번째께 선택되도록 link-0 해줌  */}
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
    {/* TabContent는 여기서 호출함! */}
    
     </div>
    )
  }

function TabContent({tab, shoes}){

    let [fade, setFade] = useState('');
    //fade라는 변수선언. / 초기값이 빈값임.
    let {재고} = useContext(Context1);
    // 유즈콘텍스트가 해주는일은 보관함에 스테이트가 들어있는데 해체해주는 역할을함!!
    // 왼쪽에서 해체된 데이터를 받으면 됨. 
    // 구조분해할당임. 콘텍스트1안에 스테이트들이 한셋트 들어있으면 뽑아올수있음!

    useEffect(()=>{
     //end를 저기 부착해주세요 -> setFade('end')
     let timer = setTimeout(()=>{setFade('end')}, 100);
     // 0.1초 후에 end로 바뀌면????~

      //fade라는 값을 end로 바꿈!
      //탭이라는 스테이트 변경될때마다 이 루틴 탄다
      return ()=>{
        clearTimeout(timer); //기존에 타이머종료.
        setFade(''); //유즈이펙트 실행할때 먼저 얘를 실행하고 그 다음에 setFade('end'); 이걸 실행함 (이게 클린업펑션이엿던가?) -> 이건 수정되기 전에 코드내용인듯
      }
    }, [tab])
    
    return <div className={"start " + fade}>
      {/* fade라는애가 처음에는 빈값이라서 start만 있는건데, 클릭하게되면 탭이 변경됨(리뷰를누르면 탭이 1로 바뀜) -> 탭이 1로 넘어와 탭이라는애가 바꼈으니까 유즈이펙트탐 -> useEffect타면서 fade값을 end로 바꿈 */}
      {/* <div className="start end"> -> 클래스네임이 start엿다가 end 붙여서 나오면~. end를 뗏다가 붙이면 에니메이션효과가 나옴을 알수있다.  */}
      {[<div>{재고}</div>, <div>겁나 좋아요</div>, <div>언제배송되나요?</div>][tab]}
    </div>
   //return 다음에 <div>를 붙여줘야함. 안붙이면 return;이랑 같은 의미가 되버림.
}
  

  export default Detail; //추가해줌