import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import bgm from './img/bg.png';
import { lazy, Suspense, useState, createContext, useContext} from 'react'; //lazy(늦은초기화) 추가해줌 / Suspense 추가해줌
import data from './data.js';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import About from './pages/About';

// import Detail from './pages/Detail.js'; 
// import Cart from './pages/Cart.js' 

const Detail = lazy(()=> import('./pages/Detail.js'));
//lazy라는 함수에 콜백함수
const Cart = lazy(()=> import('./pages/Cart.js'));
//이렇게 처리하면 단점이 이미 메모리에 올라와있는상태에서 이동하면 굉장히 스무스하게 이동하는데,
//이건 페이지이동할때 가지고 올거란말이야 이렇게되면 초기 로딩속도는 빨라졋지만 각 컴포넌트의 페이지로 이동할때 그때그때 성능은 느려짐. 

export let Context1 = createContext();

function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [재고] = useState([10, 11, 12]);

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

      <Suspense fallback={<div>로딩중임</div>}>
          {/* 카트에 접속해서 워낙 짧아서 나오진 않지만 로딩시간이 길다면 로딩하면서 시간이 지체가 된다면 화면에 로딩중임이 뜨게 될거임 */}
          {/* 지금은 워낙 빨라서 안보인다고 함. */}
      <Routes>
        <Route path = "/" element = {
          <>
              <div className = "main-bg" style = 
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

                // axios.get('https://jamsuham75.github.io/image/data2.json')
                // .then((result)=>{
                //   console.log(result.data);
                //   console.log(shoes);

                //   //두 개의 배열을 각각 벗긴다.
                //   //두 개의 데이터를 합친다.
                //   //합친 데이터를 다시 배열로 만든다.
                  
                //   let copy = [...shoes, ...result.data];
                //   console.log(copy);
                //   setShoes(copy);
                // })
                // .catch(()=>{
                //   console.log('실패');
                // })

                fetch('https://jamsuham75.github.io/image/data2.json')
                .then((result)=>{
                  return result.json();
                })
                .then((data) =>{
                  console.log(data);
                  console.log(shoes);

                  //두 개의 배열을 각각 벗긴다.
                  //두 개의 데이터를 합친다.
                  //합친 데이터를 다시 배열로 만든다.
                  
                  let copy = [...shoes, ...data];
                  console.log(copy);
                  setShoes(copy);
                })
     
            
                // 동시에 ajax 요청 여러개 하는 경우
                // Promise.all([axios.get('/url1') , axios.get('/url2')])
                // .then()
                // .catch()

            }}>상품 더보기</button>

          </>
        }></Route>
        <Route path = "/detail/:id" element = {
          <Context1.Provider value={{재고}}>
            <Detail shoes = {shoes}></Detail>
          </Context1.Provider>
        }></Route>
      
        <Route path = "/about" element = {<About></About>}>
          <Route path = "member" element = {<div>멤버들 리스트</div>}></Route>
          <Route path = "location" element = {<div>회사 위치</div>}></Route>
        </Route>

        <Route path = "/cart" element = {
        <Cart></Cart>
        }></Route>

        <Route path = "*" element = {<div><h1>404 에러</h1><br></br>없는 페이지입니다.</div>}></Route>
      </Routes>
      </Suspense>

    </div>
  );
}

function Card(props){
  let navigate = useNavigate();
  return(
      <div className="col-md-4" onClick={()=>{
        navigate('/detail/'+props.i)
      }}>
          <img src = {process.env.PUBLIC_URL + '/shoes' + (props.i+1)+ '.jpg'} width="80%"></img>
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.price}</p>
      </div>
  )
}




export default App;
