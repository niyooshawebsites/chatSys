import "./chat.css";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Chat = () => {
  const socket = io(`http://localhost:5173/chat`);

  const navigate = useNavigate();
  const msgRef = useRef();
  const [messages, setMessages] = useState(() => []);

  const msgSendHandle = async (e) => {
    e.preventDefault();

    // sending message to the server
    socket.on("recClientMsg", msgRef.current.value.trim());

    // emptying the input filed
    msgRef.current.value = "";
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

  // handle incoming messages from the server
  useEffect(() => {
    // listen for client messages from the server
    socket.on("broadcastedMsg", (message) => {
      // add the received/broadcasted message to the messages state
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    console.log(messages);

    // cleanup event listener
    return () => {
      socket.off("broadcastedMsg");
    };
  }, [socket]);

  return (
    <>
      <div className="chat-container">
        <div className="container pt-2">
          {/* App name */}
          <div className="app-name rounded mb-4">
            <div className="row">
              <div className="col">
                <h1 className="display-6 text-center text-light">{`Welcome to Chat Karo`}</h1>
              </div>
            </div>
          </div>

          {/* complete message display section */}
          <div className="row border rounded p-3">
            {/* show online members */}

            <div className="col-md-3 p-3 display-online-members">
              <h3 className="text-light text-center">{`Hi, There`}</h3>

              <button
                className="btn btn-outline-danger mb-3"
                style={{ width: "100%" }}
                onClick={logout}
              >
                Logout
              </button>

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
                <li className="list-group-item">Brad</li>
                <li className="list-group-item">James</li>
                <li className="list-group-item">Kiper</li>
                <li className="list-group-item">Jeff</li>
                <li className="list-group-item">Brad</li>
                <li className="list-group-item">James</li>
                <li className="list-group-item">Kiper</li>
                <li className="list-group-item">Jeff</li>
                <li className="list-group-item">Brad</li>
                <li className="list-group-item">James</li>
                <li className="list-group-item">Kiper</li>
                <li className="list-group-item">Jeff</li>
                <li className="list-group-item">Brad</li>
                <li className="list-group-item">James</li>
                <li className="list-group-item">Kiper</li>
                <li className="list-group-item">Jeff</li>
              </ol>
            </div>

            {/* Messages section */}

            <div className="col-md-9 display-msg-app">
              <div className="alert alert-success d-flex flex-column">
                <div className="details">
                  <span className="lead font-bold">Captain</span> :{" "}
                  <span>11.25 AM</span>
                </div>
                <div className="message">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quaerat veritatis consequuntur obcaecati a?
                  </p>
                </div>
              </div>

              <div className="alert alert-danger d-flex flex-column">
                <div className="details">
                  <span className="lead">Captain</span> : <span>11.25 AM</span>
                </div>
                <div className="message">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quaerat veritatis consequuntur obcaecati a?
                  </p>
                </div>
              </div>

              <div className="alert alert-primary d-flex flex-column">
                <div className="details">
                  <span className="lead">Captain</span> : <span>11.25 AM</span>
                </div>
                <div className="message">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quaerat veritatis consequuntur obcaecati a?
                  </p>
                </div>
              </div>

              <div className="alert alert-primary d-flex flex-column">
                <div className="details">
                  <span className="lead">Captain</span> : <span>11.25 AM</span>
                </div>
                <div className="message">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quaerat veritatis consequuntur obcaecati a?
                  </p>
                </div>
              </div>

              <div className="alert alert-primary d-flex flex-column">
                <div className="details">
                  <span className="lead">Captain</span> : <span>11.25 AM</span>
                </div>
                <div className="message">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quaerat veritatis consequuntur obcaecati a?
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Input message */}
          <div className="row container mx-auto py-4 fixed-bottom prompt-container">
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
    </>
  );
};

export default Chat;
