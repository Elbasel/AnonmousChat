import { useState } from "react";
import Home from "./components/Home";
import PubSub from "pubsub-js";
import ChatRoom from "./components/ChatRoom";
import Parse from "parse";
import { subscribe } from "on-screen-keyboard-detector";
import SignIn from "./components/SignIn";

function App() {
  const [currentView, setCurrentView] = useState("Home");

  // / Import Parse minified version
  // Your Parse initialization configuration goes here
  const PARSE_APPLICATION_ID = "1Gm3vrKF5fVmvcw5RQsGJX7bNK2gsgq9dOIN7RTx";
  const PARSE_HOST_URL = "https://parseapi.back4app.com/";
  const PARSE_JAVASCRIPT_KEY = "WJMgkit1KlrQuxT9TpCn8DfqhkUoGl6LAfjW4wRy";
  Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
  Parse.serverURL = PARSE_HOST_URL;

  const client = new Parse.LiveQueryClient({
    applicationId: "1Gm3vrKF5fVmvcw5RQsGJX7bNK2gsgq9dOIN7RTx",
    serverURL: "wss://anonmsg.b4a.io", // Example: 'wss://livequerytutorial.back4app.io'
    javascriptKey: "WJMgkit1KlrQuxT9TpCn8DfqhkUoGl6LAfjW4wRy",
  });
  client.open();

  const query = new Parse.Query("Message");
  query.ascending("createdAt");
  const subscription = client.subscribe(query);

  subscription.on("create", (msg) => {
    render();
  });

  const getResults = async () => {
    const query = new Parse.Query("Message").ascending();
    const results = await query.find();

    PubSub.publish("messageArrayChanged", results);

    return results;
  };

  const render = async () => {
    PubSub.publish("messagesRequested");
  };

  render();

  PubSub.subscribe("messagesRequested", () => {
    getResults();
  });

  PubSub.subscribe("user-logged-in", (msg, user) => {
    setCurrentView("ChatRoom");
  });

  PubSub.subscribe("new-user-created", (msg, user) => {
    setCurrentView("ChatRoom");
  });

  PubSub.subscribe("logout-requested", () => {
    window.location.reload();
  });

  subscribe((visibility) => {
    if (visibility === "hidden") {
      PubSub.publish("keyboardHidden");
    } else PubSub.publish("keyboardShown");
  });

  // if (Parse.User.current()) {
  //   setCurrentView("ChatRoom");
  // }

  return (
    <div>
      {Parse.User.current() ? (
        <ChatRoom username={Parse.User.current().get("username")} />
      ) : (
        <div className=" App bg-colors-black">
          {currentView === "Home" ? <Home /> : null}
          {currentView === "ChatRoom" ? (
            <ChatRoom username={Parse.User.current().get("username")} />
          ) : null}
        </div>
      )}
    </div>
  );
}
export default App;
