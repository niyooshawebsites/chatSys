import "./onlineUsers.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../../../socket";

const OnlineUsers = ({ name }) => {
  const [onlineUsers, setOnlineUsers] = useState(() => []);
  // fetching online users using useEffect hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios("http://localhost:5500/api/v1/all-online-users").then((data) => {
          console.log(data.data.users);
          setOnlineUsers([...data.data.users]);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    // Listen for 'userJoined' event from the server to update online users
    socket.on("userJoined", (newUser) => {
      setOnlineUsers((prevOnlineUsers) => [...prevOnlineUsers, newUser]);
    });

    // Cleanup socket event listener
    return () => {
      socket.off("userJoined");
    };
  }, []);
  return (
    <div className="col-md-3 p-3 display-online-members">
      {/* Show the name of the current logged in user */}
      <h3 className="text-light text-center">{`Howdy, ${name}`}</h3>
      <h4
        className="text-light text-center rounded py-2"
        style={{ backgroundColor: "limegreen" }}
      >
        Online
      </h4>
      <ol className="list-group">
        {onlineUsers.map((onlinUser) => {
          return (
            <li className="list-group-item" key={onlinUser._id}>
              {onlinUser.name}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default { OnlineUsers };
