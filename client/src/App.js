import "./App.scss";
import Header from "./components/Header/Header";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container"></div>
      <div className="sidenav-container"></div>
      <div className="app-content">
        {/* nested route, chia sẻ đc các route dùng chung 
      App là thằng cha bọc ngoài, muốn render thằng con ở đâu thì đặt ở đấy
      Outlet sẽ thay thế app-content*/}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
