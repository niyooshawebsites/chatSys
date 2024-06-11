import "./chat.css";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { socket } from "../../../socket";
import { RiSendPlane2Fill } from "react-icons/ri";
import axios from "axios";

const Chat = () => {
  // connect the socket
  socket.connect();

  const navigate = useNavigate();
  const msgRef = useRef();
  const msgContainer = useRef(null);
  const [messages, setMessages] = useState(() => []);
  // const [updateOnlineUsers, setUpdateOnlineUsers] = useState(false);
  // const [msgColor, setMsgColor] = useState("alert-danger");

  // const updateMsgColor = (id) => {
  //   if (socket.id === id) {
  //     setMsgColor("alert-success");
  //   }
  // };

  // updateMsgColor(socket.id);

  const scrollToBottom = () => {
    msgContainer.current.scrollTop = msgContainer.current.scrollHeight;
  };

  const msgSendHandle = async (e) => {
    e.preventDefault();

    // setting up the client msg to be sent to the server with payload
    const clientMsg = {
      text: msgRef.current.value.trim(),
      senderId: socket.id,
    };

    const takeAction = () => {
      // sending the msg to the server
      socket.emit("clientMsg", clientMsg);

      // emptying the input filed
      msgRef.current.value = "";
    };

    !msgRef.current.value.trim()
      ? alert("Please type something....")
      : takeAction();
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("chatKaro_username");
    sessionStorage.removeItem("isVerified");
    socket.disconnect();
    navigate("/");
  };

  // handle incoming messages from the server

  useEffect(() => {
    // listen for client messages coming from the server
    socket.on("msgFromServer", (msg) => {
      // add the received/broadcasted message to the messages state
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // staying at the last message all the time
    scrollToBottom();

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
            <h1 className="display-6 text-center text-light">{`Gup Shup`}</h1>

            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>

          {/* complete message display section */}
          <div className="row border rounded p-3">
            {/* show online members */}
            <div className="col-md-3 p-3 display-online-members">
              {/* Show the name of the current logged in user */}
              <h3 className="text-light text-center">{`Hi, ${sessionStorage.getItem(
                "chatKaro_username"
              )}`}</h3>

              <h4
                className="text-light text-center rounded py-2"
                style={{ backgroundColor: "limegreen" }}
              >
                Online
              </h4>
              <ol className="list-group">
                {useEffect(() => {
                  axios("http://localhost:5500/api/v1/all-online-users").then(
                    (data) => {
                      console.log(data.data.users);
                      data.data.users.map((user) => {
                        return (
                          <li className="list-group-item" key={user._id}>
                            {user.name}
                          </li>
                        );
                      });
                    }
                  );
                })}
              </ol>
            </div>

            {/* Messages section */}

            <div className="col-md-9 display-msg-app d-flex flex-column justify-content-between">
              <div className="actual-mgs" ref={msgContainer}>
                {messages.map((msg, index) => {
                  console.log(msg);
                  return (
                    <div
                      className={`d-flex flex-column justify-self-start py-n2 alert ${msgColor}`}
                      key={index}
                    >
                      <div className="details">
                        <span className="lead">{msg.user}</span>:{" "}
                        <span>{msg.time}</span>
                      </div>
                      <div className="message">{msg.msg}</div>
                    </div>
                  );
                })}
              </div>
              {/* Input message */}
              <div className="row container mx-auto py-4 prompt-container">
                <form action="">
                  <div className="row">
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="inlineFormInput"
                        placeholder="Type here...."
                        ref={msgRef}
                        required
                      />
                    </div>
                    <div className="col-md-2">
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={msgSendHandle}
                      >
                        Send <RiSendPlane2Fill />
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
