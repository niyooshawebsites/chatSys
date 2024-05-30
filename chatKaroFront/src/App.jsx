import "./App.css";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Private/chat/Chat";
import { Provider } from "react-redux";
import centralStore from "./store/CentralStore";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Provider store={centralStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
