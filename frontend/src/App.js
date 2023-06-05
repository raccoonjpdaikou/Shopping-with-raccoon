import { HashRouter, Routes, Route } from "react-router-dom";
import "./styles/style.scss";
import Layout from "./components/Layout";
import Homepage from "./pages/Front/Homepage";
import Estimate from "./pages/Front/Estimate";
import Orders from "./pages/Front/Orders";
import Comments from "./pages/Front/Comments";
import Setting from "./pages/Front/Setting";
import Privacy from "./pages/Front/Privacy";
import Servicepolicy from "./pages/Front/Servicepolicy";
import Page404 from "./pages/Front/Page404";
import Login from "./pages/Admin/Login";
import Rate from "./pages/Admin/Rate";
import Announce from "./pages/Admin/Announce";
import Meh from "./pages/Admin/Meh";
import User from "./pages/Admin/User";
import Dashboard from "./pages/Admin/Dashboard";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route index element={<Homepage />}></Route>
        <Route path="/" element={<Layout />}>
          <Route path="estimate" element={<Estimate />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route path="comments" element={<Comments />}></Route>
          <Route path="setting" element={<Setting />}></Route>
          <Route path="privacy" element={<Privacy />}></Route>
          <Route path="servicepolicy" element={<Servicepolicy />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="admin" element={<Dashboard />}>
          <Route path="announce" element={<Announce />}></Route>
          <Route path="rate" element={<Rate />}></Route>
          <Route path="meh" element={<Meh />}></Route>
          <Route path="user" element={<User />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
