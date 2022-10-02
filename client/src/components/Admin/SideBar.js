import React from "react";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { FaGem, FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { Link } from "react-router-dom";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import sidebarBg from "../../assets/bg2.jpeg";
import "./Sidebar.scss";
export default function SideBar({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
}) {
  return (
    //  vi sao dung Fragment thay cho div
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <DiReact size={"3em"} color={"00bfff"} />
            <NavLink to="/" className="nav-link fs-4">
              Home
            </NavLink>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              Dashboard
              <Link to="/crypto" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            {/* <SubMenu icon={<FaGem />} title="Feature">
              <MenuItem>Users Manager</MenuItem>
              <Link to="/admins/manage-users" />
            </SubMenu> */}
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/QuanHoang1971?tab=repositories"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Hoàng Quân
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
}
