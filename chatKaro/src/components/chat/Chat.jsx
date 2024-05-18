import "./chat.css";

const Chat = () => {
  return (
    <>
      <div className="chat-container">
        <div className="container pt-2">
          {/* App name */}
          <div className="app-name bg-danger mb-4">
            <div className="row">
              <div className="col">
                <h1 className="display-6 text-center text-light">Chat Karo</h1>
              </div>
            </div>
          </div>

          {/* complete message display section */}
          <div className="row border p-3">
            {/* show online members */}

            <div className="col-md-3 p-3  display-online-members">
              <h2 className="text-light text-center bg-danger">Online</h2>
              <ol className="list-group list-group-numbered">
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
              <div className="alert alert-primary d-flex flex-column">
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
                  />
                </div>
                <div className="col-md-1">
                  <button type="submit" className="btn btn-primary ">
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
