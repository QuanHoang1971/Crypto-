// Layout phụ trách ứng dụng có route j sẽ hiển thị ở đây
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import Admin from "./components/Admin/Admin";
import ManageUser from "./components/Admin/Content/ManageUser";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Crypto from "./components/Crypto/Crypto";
import HomePage from "./components/Home/HomePage";
export default function Layout(props) {
  return (
    <>
      <Routes>
        {/* mỗi lần vào route nào thì sẽ render element tương ứng */}
        <Route path="/" element={<App />}>
          {/* nếu ko có thằng con nào match thì sẽ cho Route index vào, App trùng vs Homepage, ko cần path */}
          <Route index element={<HomePage />} />

          {/* 3 component nay có quan hệ vs nhau nên phải đóng tag ở /Route nthe */}
          <Route path="crypto/*" element={<Crypto />} />
        </Route>

        <Route path="/admins" element={<Admin />}>
          {/* mặc định luôn có dashboard */}
          {/* <Route index element={<DashBoard />} /> */}
          <Route path="manage-users" element={<ManageUser />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* dùng Fragment để thêm các component ntn, ko render vào giao diện ,ko bị vỡ */}
      {/* khai báo Toast ở đây để dùng đc nhiều nơi khi cần hiện thông báo */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

// nếu code ở dưới nữa thì nó sẽ vào tất cả các component trên
// Route chỉ phân chia component thôi, ko code logic trong này
// muốn code thì vào thằng con
