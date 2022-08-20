import { useState } from "react";
import Home from "./components/Home";
import PubSub from "pubsub-js";
import ChatRoom from "./components/ChatRoom";
import Parse from "parse";
import { subscribe } from "on-screen-keyboard-detector";

function App() {
  const [currentView, setCurrentView] = useState("Home");

  subscribe((visibility) => {
    if (visibility === "hidden") {
      PubSub.publish("keyboardHidden");
    } else PubSub.publish("keyboardShown");
  });

  PubSub.subscribe("user-logged-in", (msg, user) => {
    setCurrentView("ChatRoom");
  });

  PubSub.subscribe("new-user-created", (msg, user) => {
    setCurrentView("ChatRoom");
    console.dir(Parse.User.current());
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
