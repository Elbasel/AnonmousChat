import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import PubSub from "pubsub-js";

const InputArea = () => {
  const [raised, setRaised] = useState(false);

  PubSub.subscribe("keyboardHidden", () => {
    setRaised(false);
  });

  PubSub.subscribe("keyboardShown", () => {
    setRaised(true);
  });

  return (
    // mt-[29px]
    <div
      className={`${
        raised ? "raised" : ""
      }  inputArea fade-in flex items-start justify-center p-[22px] rounded-3xl  gap-3 flex-1 bg-black shadow-2xl max-h-28] transition-all duration-300`}
    >
      <button className="">
        <BsFillImageFill size="2rem" className="text-white" />
      </button>
      <input
        id="text-input"
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        type="text"
        autoComplete="off"
        className=" p-2 rounded-3xl flex-1"
      />
      <button className="">
        <IoMdSend size="2rem" className="text-white" />
      </button>
    </div>
  );
};

export default InputArea;
