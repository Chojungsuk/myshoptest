import { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router-dom";


function About(){

    return(
    <div className = "container">
      <h1>우리 회사 소개</h1>
      <Outlet></Outlet>

        {/* <div className="col-md-4">
            <img src="https://jamsuham75.github.io/image/shoes2.jpg"></img>
            </div>
            <div className = "col-md-6 mt-4"> 
            <h4 className = "pt-5">이창현</h4>
             <p>Born in Seoul</p>
             <p>1975</p>
             <button className="btn btn-warning">연락하기</button>
        </div> */}
      
      </div>
    )
  }

  export default About; //추가해줌