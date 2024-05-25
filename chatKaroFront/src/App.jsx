import "./App.css";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Private/chat/Chat";
import { Provider } from "react-redux";
import centralStore from "./store/CentralStore";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  const authToken = sessionStorage.getItem("authToken");
  return (
    <>
      <Provider store={centralStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute authToken={authToken} />}>
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
