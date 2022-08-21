import { useState } from "react";
import Home from "./components/Home";
import PubSub from "pubsub-js";
import ChatRoom from "./components/ChatRoom";
import Parse from "parse";
import { subscribe } from "on-screen-keyboard-detector";

function App() {
  const [currentView, setCurrentView] = useState("Home");

  // / Import Parse minified version
  // Your Parse initialization configuration goes here
  const PARSE_APPLICATION_ID = "2JbJXUS3TCcnQ7WO7wbROMUEc64qCkrpjG8W6Q7w";
  const PARSE_HOST_URL = "https://parseapi.back4app.com/";
  const PARSE_JAVASCRIPT_KEY = "UciG0lunmmSEJzIyuhLDn6Jl67uGsp8pDCpkyDhr";
  Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
  Parse.serverURL = PARSE_HOST_URL;

  const client = new Parse.LiveQueryClient({
    applicationId: "2JbJXUS3TCcnQ7WO7wbROMUEc64qCkrpjG8W6Q7w",
    serverURL: "wss://chatroom.b4a.io", // Example: 'wss://livequerytutorial.back4app.io'
    javascriptKey: "UciG0lunmmSEJzIyuhLDn6Jl67uGsp8pDCpkyDhr",
  });
  client.open();

  const query = new Parse.Query("Message");
  query.ascending("createdAt");
  const subscription = client.subscribe(query);

  const render = async () => {
    const results = await query.find();
    PubSub.publish("messageArrayChanged", results);
  };
  render();

  subscription.on("create", (msg) => {
    render();
  });

  PubSub.subscribe("user-logged-in", (msg, user) => {
    setCurrentView("ChatRoom");
  });

  PubSub.subscribe("new-user-created", (msg, user) => {
    setCurrentView("ChatRoom");
  });

  subscribe((visibility) => {
    if (visibility === "hidden") {
      PubSub.publish("keyboardHidden");
    } else PubSub.publish("keyboardShown");
  });

  return (
    <div className=" App bg-colors-black">
      {currentView === "Home" ? <Home /> : null}
      {currentView === "ChatRoom" ? (
        <ChatRoom username={Parse.User.current().get("username")} />
      ) : null}
    </div>
  );
}
export default App;
