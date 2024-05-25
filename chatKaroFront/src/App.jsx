import "./App.css";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Private/chat/Chat";
import { Provider } from "react-redux";
import centralStore from "./store/CentralStore";
import { Outlet, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem("authToken");
  return (
    <>
      <Provider store={centralStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute authToken={authToken} />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
