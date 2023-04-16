import React, { useRef, useState, useEffect } from "react";
import "./Login.css";
import Input from "./../components/Input";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import {useDispatch} from "react-redux";
import {login} from "../store/auth";
import CustomButton from "../components/CustomButton";

const Login = (props) => {
  const [message, setMessage] = useState(""); // state
  const [isWaiting, setIsWaiting] = useState(false); // state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef(); //tạo ra Ref gán vào usernameref
  const passwordRef = useRef(); //tạo ra Ref gán vào passwordref


  const submitHandler = (e) => {
    e.preventDefault(); // ngăn chặn refesh khi submit mặc định trên form, thẻ a > di chuyển trang;
    const username = usernameRef.current.value; //this.usernameRef.current tương đương vs document.getElementById(username)
    const password = passwordRef.current.value;
    // console.log(username, password);
    setIsWaiting(true)
    userService.login(username, password).then((res) => {
      setIsWaiting(false)
      if (res.errorCode === 0) {
        setMessage("");
        dispatch(login({
          token: res.data.accessToken,
          userInfo: res.data
        }))
        navigate("/");
      } else {
        setMessage(res.message);
      }
    });
    // if (username === "admin" && password === "123456") {
    //   setMessage('Ok');
    // } else {
    //   setMessage('Bad');
    // }
  };

  // document.getElementById('txtUsername').focus();

  useEffect(() => {
    usernameRef.current.focus();
  }, []); //! focus là thẻ input username khi render lại hoặc lần đầu truy cập

  return (
    <>
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-sm-8 col-lg-5">
            <div className="card bg-primary">
              <div className="card-header text-white">
                <h4 className="card-title mb-0">
                  <i className="bi-grid-3x3-gap-fill"></i> Login
                </h4>
              </div>
              <div className="card-body bg-white rounded-bottom">
                <p className="text-center text-danger">{message}</p>
                <form onSubmit={submitHandler}>
                  <Input
                    inputRef={usernameRef} //tạo lính canh để theo dõi
                    id="txtUserName"
                    label="User name"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter your username"
                    lastRow
                    // labelSize = "4"
                  />
                  <Input
                    inputRef={passwordRef}
                    id="txtPassword"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    lastRow
                  />
                  {/* 
                    <Input id="txtNote" rows="2" label="Note" /> */}

                  <div className="row">
                    <div className="offset-sm-3 col-auto">
                      <CustomButton type="submit" color="primary" isLoading={isWaiting} disabled={isWaiting} >
                        Sign dsd
                      </CustomButton>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
