import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner10 } from "react-icons/im";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // thư viện cho công cụ dispatch
  const dispatch = useDispatch();
  // h cần phải dishpatch 1 action từ React nói cho Redux biết muôn thực hiện j
  // tuong tu nhu dung navigate

  // hook xem có đang gọi API ko
  const [isLoading, setIsLoading] = useState(false);

  // validate Email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    // validate

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error(`Invalid Email`);
      return;
    }

    if (!password) {
      toast.error(`Invalid Password`);
      return;
    }

    setIsLoading(true);
    // ở đầu hàng cứ cho là true, trước khi gọi API sẽ off nút loading đi
    // khi on off đăng nhập thì tắt đi là false

    // submit api
    // 2 biến email, password do React quản lí ở trên useState
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      // action la 1 bien object {}
      dispatch(doLogin(data));
      dispatch({
        type: "FETCH_USER_LOGIN_SUCCESS",
        payload: data,
      });
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
      // false thì ko gọi API nữa
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        Don't have an account yet?
        <button onClick={() => navigate("/register")}>Sign Up</button>
      </div>

      <div className="title col-4 mx-auto ">Hoang Quan </div>
      <div className="welcome col-4 mx-auto">Hello, Who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            type={"password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        {/* cách để 2 cái đang ngang hàng , 1 cái xuống dòng là dùng  div */}
        <div>
          <button
            className="btn-submit"
            onClick={() => handleLogin()}
            disabled={isLoading}
          >
            {isLoading === true && <ImSpinner10 className="loader-icon" />}
            <span>Login to HoangQuan</span>
          </button>
        </div>
        <div className="text-center">
          <span
            className="back"
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            &#60;&#60;Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
}
