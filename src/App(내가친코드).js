import { Button, Navbar, Container, Nav } from 'react-bootstrap'; 
import './App.css';
import bgm from './img/bg.png' 
import { useState, createContext, useContext } from 'react'; //createContext, useContext 추가해줌!!
import data from './data.js'; 
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom'; //useNavigate, Outlet 추가해줌
import Detail from './pages/detail(내가친코드).js'; 
import About  from './pages/About';   //페이지스 폴더에 파일 넣으면 자동으로 생김!
import axios from 'axios';   //이거 추가해줌!!


export let Context1 = createContext();
//createContext함수임. / Context1 요 객체를 받음.
//Context1 = 보관함임(재고,shoes담아놀거임) 익스포트해주면 외부에서 ~

function App() {

  let [shoes, setShoes] = useState(data);   // setShoes 새로 추가해줌
  let navigate = useNavigate(); //왼쪽(navigate)은 내가 그냥 이름지어준거임.  //네비게이트 객체 생성된거임.
  let [재고] = useState[(10, 11, 12)]; //재고라는 스테이트(변수)만듦. 재고는 어레이데이타.
  //신발 재고가 10개,11개,12개
  
  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">홈</Nav.Link>
            <Nav.Link href="/about">about</Nav.Link>
            <Nav.Link href="/detail">Pricing</Nav.Link>
            <Nav.Link onClick={()=>{navigate(-1)}}>back</Nav.Link>
            <Nav.Link onClick={()=>{navigate(1)}}>forward</Nav.Link>
          </Nav>
        </Container>
      </Navbar><br></br>
 
      {/* <Link to = '/'>홈 </Link>   */}
      {/* 홈 누르면 '/' 요 url로 감! */}
      {/* <Link to = '/detail'> 상세페이지</Link>   */}
      {/* 상세페이지 누르면 상세페이지로 감 */}

      <Routes> 
      <Route path="/" element = {
        <>
        <div className = "main-bg" style=
      {{backgroundImage : 'url(' + bgm + ')'}}></div>

<br></br>
<div className="container text-center">   
  <div className="row">
    {
      shoes.map((a, i)=>{ 
        return(
          <Card shoes = {shoes[i]} i = {i} key={i}></Card>  
        )
      })
    }
        </div>
    </div>
    <button className = "btn btn-warning" onClick={()=>{
      axios.get('https://jamsuham75.github.io/image/data2.json')  //겟방식으로 요청! / get('url넣으셈')
      .then((result)=>{
        console.log(result.data);
        console.log(shoes);

        //두개의 배열 합하는 방법 
        // 두 개의 배열을 각각 벗긴다. [...shoes] 슈즈라는 배열이 벗겨짐 / 
        // 두개의 데이터를 합친다      / 벗기고
        // 합친 데이터를 다시 배열로 만든다.

        let copy = [...shoes, ...result.data];
        //카피라는 변수로 받아줌
        console.log(copy);
        // shoes = copy; 이렇게 넘겨주면 안되고 아래문장처럼 해야함
        setShoes(copy);

      })
      .catch(()=>{
        console.log('실패');
      })
      

      //동시에 ajax 요청 여러개 하는 경우
      // Promise.all([axios.get('/url1'), axios.get('/url2')])
      // .then()
      // .catch()

      // fetch('https://jamsuham75.github.io/image/data2.json')
      // .then((result)=>{
      //   // result.json() //요런 변환과정 거쳐야 함!(페치는 이런 귀찮은 과정 있음)
      //   let a = result.json
      // })
    }}>상품 더보기</button>

   
        </>
      }></Route>
       
        
       <Route path="/detail/:id" element = {
        <Context1.Provider value={{재고}}>
          <Detail shoes = {shoes}></Detail>
        </Context1.Provider>
        }></Route>
        {/* 얘가 감싸고 있는건 재고 슈즈 공유할수 잇단듯??? */}
       
        {/* 컨텍스트1이 보관함이라고 생각하셈.  */}

        <Route path = "/about" element = {<About></About>}>
          <Route path = "member" element = {<div>멤버들 리스트</div>}></Route>
          <Route path = "location" element = {<div>회사 위치</div>}></Route>
         </Route> 
         {/* 이렇게 <Route></Route>로 감싸주면 예네들은 어바웃의 멤버, 어바웃의 로케이션이 되는거임 */}
         {/* 얘네들을 어디다 보이게 할지를 정해줘야지 화면에 나옴! */}
         {/* <Route path = "/event" element = {<TodayEvent></TodayEvent>}>
          <Route path = "one" element = {<div>첫 주문시 양배추즙 증정</div>}></Route>
          <Route path = "two" element = {<div>생일기념 쿠폰 받기</div>}></Route>
         </Route> */}

        <Route path = "*" element = {<div><h1>404에러</h1><br></br>없는 페이지입니다.</div>}></Route> 
      {/* 지금 너가 가지고 있는 정삭적인 페이지 루트 외에 나머지 모든 요청은 전부다 <div>404에러<br></br>없는 페이지입니다.</div> 이걸 보여줄거야!! */}
      </Routes>
      
    </div>
  );
}

// function TodayEvent(){
//   return(
//     <div>
//       <h1>오늘의 이벤트</h1>
//       <Outlet></Outlet>
//     </div>
//   )
// }



function Card(props){  

 
  let navigate = useNavigate();  // Card 안에도 이거 추가해줘야함! / 함수포인터임! 
  return(
        <div className="col-md-4" onClick={()=>{
          navigate('/detail/'+props.i)
        }}>
          <img src={process.env.PUBLIC_URL + '/shoes' + (props.i+1)+'.jpg'} width="80%"></img>
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.price}</p>
        </div>
  )
}



export default App;
