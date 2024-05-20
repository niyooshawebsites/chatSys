import "./App.css";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Private/chat/Chat";
import { Provider } from "react-redux";
import centralStore from "./store/CentralStore";

function App() {
  return (
    <>
      <Provider store={centralStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
