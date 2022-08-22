import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import PubSub from "pubsub-js";
import Parse from "parse";

const InputArea = () => {
  const [raised, setRaised] = useState(false);

  PubSub.subscribe("keyboardHidden", () => {
    setRaised(false);
  });

  PubSub.subscribe("keyboardShown", () => {
    setRaised(true);
  });

  const sendThenPublish = () => {
    sendMsg()
      .then(PubSub.publish("new-msg-sent"))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendThenPublish();
  };

  const handleClick = () => {
    sendThenPublish();
  };

  const sendMsg = async () => {
    const msgBody = document.querySelector("#text-input").value;
    if (msgBody.length < 1) throw new Error("empty msg");
    document.querySelector("#text-input").value = "";
    const parseObject = new Parse.Object.extend("Message");
    const msgObject = new parseObject();
    msgObject.set("body", msgBody);
    msgObject.set("username", Parse.User.current().get("username"));
    msgObject.set("profileImgUrl", Parse.User.current().get("profileImgUrl"));
    const newMsg = await msgObject.save();
    console.log("msg sent:", newMsg);
    return;
  };

  return (
    // mt-[29px]
    <form
      onSubmit={handleSubmit}
      className={`${
        raised ? "raised" : ""
      }  inputArea fade-in flex items-start justify-center p-[22px] rounded-3xl  gap-3 flex-1 bg-colors-black shadow-2xl max-h-28] transition-all duration-300`}
    >
      <button className="">
        <BsFillImageFill size="2rem" className="text-colors-white z-30" />
      </button>
      <input
        id="text-input"
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        type="text"
        autoComplete="off"
        className=" p-2 rounded-3xl flex-1"
      />
      <button className="" onClick={handleClick}>
        <IoMdSend size="2rem" className="text-colors-white" />
      </button>
    </form>
  );
};

export default InputArea;
