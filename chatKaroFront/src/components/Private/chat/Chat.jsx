import "./chat.css";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { socket } from "../../../socket";
import { useSelector } from "react-redux";

const Chat = () => {
  // connect the socket
  socket.connect();

  const navigate = useNavigate();
  const msgRef = useRef();
  const [messages, setMessages] = useState(() => []);
  const { loggedinUsername } = useSelector(
    (state) => state.loggedin_user_slice
  );

  const msgSendHandle = async (e) => {
    e.preventDefault();

    socket.emit("clientMsg", msgRef.current.value.trim());

    // emptying the input filed
    msgRef.current.value = "";
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

  // handle incoming messages from the server

  useEffect(() => {
    // listen for client messages coming from the server
    socket.on("msgFromServer", (msg) => {
      // add the received/broadcasted message to the messages state
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    console.log(messages);

    // cleanup event listener
    return () => {
      socket.off("msgFromServer");
    };
  }, [messages]);

  return (
    <>
      <div className="chat-container">
        <div className="container pt-2">
          {/* App name */}

          <div className="px-5 d-flex justify-content-between align-items-center inner-header border app-name rounded mb-4">
            <div>
              <h1 className="display-6 text-center text-light">{`Chat Karo`}</h1>
            </div>
            <div className="d-flex justify-content-between align-items-center border">
              <button className="btn btn-outline-dark mb-3" onClick={logout}>
                Logout
              </button>
            </div>
          </div>

          {/* complete message display section */}
          <div className="row border rounded p-3">
            {/* show online members */}
            <div className="col-md-3 p-3 display-online-members">
              {/* Show the name of the current logged in user */}
              <h3 className="text-light text-center">{`Hi, ${loggedinUsername}`}</h3>

              <h4
                className="text-light text-center rounded py-2"
                style={{ backgroundColor: "limegreen" }}
              >
                Online
              </h4>
              <ol className="list-group list-group-numbered ">
                <li className="list-group-item">Brad</li>
                <li className="list-group-item">James</li>
                <li className="list-group-item">Kiper</li>
                <li className="list-group-item">Jeff</li>
              </ol>
            </div>

            {/* Messages section */}

            <div className="col-md-9 display-msg-app">
              {messages.map((msg, index) => {
                return (
                  <div
                    className="alert alert-danger d-flex flex-column"
                    key={index}
                  >
                    <div className="details">
                      {console.log(msg)}
                      <span className="lead font-bold">{msg.user}</span>:{" "}
                      <span>{msg.time}</span>
                    </div>
                    <div className="message">{msg.msg}</div>
                  </div>
                );
              })}

              {/* Input message */}
              <div className="row container mx-auto py-4 prompt-container">
                <form action="">
                  <div className="row">
                    <div className="col-md-11">
                      <input
                        type="text"
                        className="form-control"
                        id="inlineFormInput"
                        placeholder="Type here...."
                        ref={msgRef}
                      />
                    </div>
                    <div className="col-md-1">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={msgSendHandle}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
