import PubSub from "pubsub-js";
import Parse from "parse";

const Message = ({
  messageBody,
  username,
  sentAt,
  messageNumber,
  groupedMessage,
  profileImgUrl,
  showUsername,
}) => {
  const handleClick = (e) => {
    let messageElement = document.querySelector(
      `.${username}-${messageNumber}`
    );

    let timeElement = messageElement.querySelector(
      `.Time.${username}-${messageNumber}`
    );

    timeElement.classList.toggle("hidden");
    timeElement.classList.toggle("scale-0");
    PubSub.publish("MessagePressed", timeElement);
  };

  PubSub.subscribe("MessagePressed", (msg, target) => {
    if (!target.classList.contains(`${username}-${messageNumber}`)) {
      document
        .querySelector(`.Time.${username}-${messageNumber}`)
        .classList.add("hidden");
      document
        .querySelector(`.Time.${username}-${messageNumber}`)
        .classList.add("scale-0");
    }
  });

  return (
    <div
      className={` ${username}-${messageNumber} ${showUsername ? "mt-6" : ""} 
      


      ${
        username === Parse.User.current().get("username")
          ? "items-end "
          : "items-start"
      }
      
      Message w-full flex flex-col m-w-[75%] overflow break-words`}
      onClick={handleClick}
    >
      {showUsername && (
        <div
          className={`showUsername ${
            username === Parse.User.current().get("username")
              ? "pr-[90px] "
              : "pl-[90px]"
          } mb-2 text-colors-white text-xs`}
        >
          {username}
        </div>
      )}
      <div
        className={`${username}-${messageNumber} MessageBody flex gap-2     ${
          username === Parse.User.current().get("username")
            ? "flex-row-reverse "
            : ""
        }`}
      >
        <img
          className={`${
            groupedMessage ? "opacity-0" : ""
          }  messageProfilePicture w-[50px] h-[50px]  rounded-full border-gray-800 border-2 `}
          src={profileImgUrl}
          alt="profilePicture"
        ></img>
        <p
          className={`fade-in ${username}-${messageNumber} Paragraph bg-colors-gray-700 rounded-3xl p-4 text-xl text-colors-white flex items-center justify-center`}
        >
          {messageBody}
        </p>
      </div>
      <div
        className={`Time ${
          username === Parse.User.current().get("username")
            ? "pr-[90px] "
            : "pl-[90px]"
        } ${username}-${messageNumber}  py-3  text-colors-white scale-0 hidden transition-all text-xs`}
      >
        {sentAt}
      </div>
    </div>
  );
};
export default Message;
