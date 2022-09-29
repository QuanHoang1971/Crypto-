import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";

import "./Admin.scss";
import SideBar from "./SideBar";
export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        {/* sau khi setCollapsed xong phai truyen toi Sidebar */}
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <FaBars onClick={() => setCollapsed(!collapsed)} />
        </div>
        <div className="admin-main">
          {" "}
          <Outlet />{" "}
        </div>
      </div>
    </div>
  );
}
