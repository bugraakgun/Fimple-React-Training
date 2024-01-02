import Successful from "./pages/Successful";
import Main from "./pages/Main";
import Query from "./pages/Query";
import Detail from "./pages/Detail";
import AdminMenu from "./pages/AdminMenu.jsx";
import Login from "./pages/Login";
import ApplicationListManagement from "./pages/ApplicationListManagement";
import ApplicationManagement from "./pages/ApplicationManagement";
import NotFound from "./pages/NotFound";
import { Navigate, Route, Routes } from "react-router-dom";
import "./assest/css/style.css";
import "./assest/css/main.css";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/basarili/:basvuruNo" element={<Successful />} />
        <Route path="/sorgulama" element={<Query />} />
        <Route path="/detay/:basvuruNo" element={<Detail />} />
        <Route path="/giris" element={<Login />} />
          <Route path="/admin" element={<AdminMenu />}>
            <Route index element={<Navigate to="basvuru-listesi" />} />
            <Route path="basvuru" element={<Navigate to="/admin/basvuru-listesi" />} />
            <Route path="basvuru-listesi" element={<ApplicationListManagement />} />
            <Route path="basvuru/:basvuruNo" element={<ApplicationManagement />} />
          </Route>
      </Routes>
  );
}

export default App;
