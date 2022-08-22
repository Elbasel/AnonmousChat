import Message from "./Message";
import PubSub from "pubsub-js";
import { useEffect, useState } from "react";
import Parse from "parse";
import moment from "moment-js";

const ChatArea = () => {
  const [raised, setRaised] = useState(false);
  const [messagesArray, setMessagesArray] = useState([]);

  PubSub.subscribe("keyboardHidden", () => {
    setRaised(false);
  });

  PubSub.subscribe("keyboardShown", () => {
    setRaised(true);
    document.querySelector(".chatArea").scrollTop =
      document.querySelector(".chatArea").scrollHeight;
  });

  PubSub.subscribe("messageArrayChanged", (msg, array) => {
    console.log("arrayReceived", array);
    setMessagesArray(array);
  });

  var counter = 0;

  useEffect(() => {
    console.log(`ChatRoom render number:`, counter);
    document.querySelector(".chatArea").scrollTop =
      document.querySelector(".chatArea").scrollHeight;
  });

  return (
    <div
      className={`${
        raised ? "padBottom" : ""
      } chatArea overflow-auto scrollbar-hide flex-1 gap-1 flex flex-col min-h-[607px] mt-[75px] max-h-20 scroll-smooth sm:min-h-[80vh] pt-2`}
    >
      {messagesArray.map((msg, index, array) => {
        let profileImgUrl = msg.get("profileImgUrl");
        let prevUser, currentUser, nextUser;

        let showUsername = false;
        let groupedMessage = true;

        if (array[index - 1]) {
          prevUser = array[index - 1].get("username");
        }

        if (array[index + 1]) {
          nextUser = array[index + 1].get("username");
        }

        currentUser = msg.get("username");

        if (currentUser !== nextUser) {
          groupedMessage = false;
        }

        if (prevUser !== currentUser) {
          showUsername = true;
        }

        return (
          <Message
            key={msg.id}
            messageBody={msg.get("body")}
            username={msg.get("username")}
            sentAt={msg.createdAt.toLocaleString()}
            messageNumber={index}
            profileImgUrl={profileImgUrl}
            showUsername={showUsername}
            groupedMessage={groupedMessage}
          />
        );
      })}
    </div>
  );
};

export default ChatArea;
