import Message from "./Message";
import PubSub from "pubsub-js";
import { useState } from "react";

const ChatArea = () => {
  const [raised, setRaised] = useState(false);

  PubSub.subscribe("keyboardHidden", () => {
    setRaised(false);
  });

  PubSub.subscribe("keyboardShown", () => {
    setRaised(true);
    document.querySelector(".chatArea").scrollTop =
      document.querySelector(".chatArea").scrollHeight;
  });

  return (
    <div
      className={`${
        raised ? "padBottom" : ""
      } chatArea overflow-auto scrollbar-hide flex-1 gap-3 flex flex-col min-h-[607px] mt-[75px] max-h-20 scroll-smooth sm:w-[80vh]`}
    >
      {[
        { id: "id-a", username: "elbasel" },
        { id: "id-b", username: "elbasel" },
        { id: "id-c", username: "elbasel" },
        { id: "id-d", username: "elbasel" },
        { id: "id-e", username: "elbasel" },
        { id: "id-A", username: "pink" },
      ].map((msg, index, array) => {
        let currentUser, nextUser;
        let profileImgUrl = "https://pbs.twimg.com/media/EZqRRpTUMAABaHI.jpg";
        let groupedMessage = true;

        if (array[index + 1]) {
          nextUser = array[index + 1].username;
        }

        currentUser = msg.username;

        if (currentUser !== nextUser) {
          groupedMessage = false;
        }
        // console.log(currentUser);

        return (
          <Message
            key={msg.id}
            messageBody={msg.id}
            username={msg.username}
            groupedMessage={groupedMessage}
            sentAt="10:00 pm"
            messageNumber={index}
            profileImgUrl={profileImgUrl}
          />
        );
      })}
    </div>
  );
};

export default ChatArea;
