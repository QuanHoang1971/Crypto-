// đay là import trực tiếp từ thư viện
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
// vì store là obj nên cũng đổi nthe
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import "nprogress/nprogress.css";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();

// khi f5 trang thì sẽ mất dữ liệu nên phải bảo vs Redux lưu lại ở Local Storage
// khi nạp data vào store, vd máy bị chậm, quá trình nạp vào LocalStorage bị delay, máy lên rồi
// nhưng ko moi đc data để sử dụng đc dẫn đến bug, nên dùng PersistGate để app chỉ chạy khi data đc nạp thành công
