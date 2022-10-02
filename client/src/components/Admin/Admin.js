import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";

import "./Admin.scss";
import ManageUser from "./Content/ManageUser";
import SideBar from "./SideBar";
export default function Admin() {
  // const [collapsed, setCollapsed] = useState(false);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        {/* sau khi setCollapsed xong phai truyen props toi thằng con Sidebar */}
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          {/* gọi đến setCollapsed ở trên */}
          <FaBars onClick={() => setCollapsed(!collapsed)} />
        </div>
        <ManageUser />
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
