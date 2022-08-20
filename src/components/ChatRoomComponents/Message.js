import PubSub from "pubsub-js";

const Message = ({
  messageBody,
  username,
  sentAt,
  messageNumber,
  groupedMessage,
  profileImgUrl,
}) => {
  const handleClick = (e) => {
    let messageElement;

    if (e.target.classList.contains("Message")) {
      messageElement = e.target.querySelector(":nth-child(2)");
    }

    if (e.target.classList.contains("MessageBody")) {
      messageElement = e.target.parentNode.childNodes[1];
    }

    if (e.target.classList.contains("Paragraph")) {
      messageElement = e.target.parentNode.parentNode.childNodes[1];
    }
    PubSub.publish("MessagePressed", messageElement);

    messageElement.classList.toggle("hidden");
    messageElement.classList.toggle("scale-0");
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
      className={`${username}-${messageNumber} Message w-full flex flex-col items-start gap-4`}
      onClick={handleClick}
    >
      <div className={`${username}-${messageNumber} MessageBody flex gap-2`}>
        <img
          className={`${
            groupedMessage ? "opacity-0" : ""
          }  messageProfilePicture w-14 h-auto rounded-full border-gray-800 border-2`}
          src={profileImgUrl}
          alt="profilePicture"
        ></img>
        <p
          className={`${username}-${messageNumber} Paragraph bg-colors-gray-700 rounded-3xl px-9 py-4 text-2xl`}
        >
          {messageBody}
        </p>
      </div>
      <div
        className={`${username}-${messageNumber} Time p-3 text-colors-gray-500 scale-0 hidden transition-all`}
      >
        {username} at {sentAt}
      </div>
    </div>
  );
};
export default Message;
