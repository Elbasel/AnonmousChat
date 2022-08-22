import { IoArrowBackOutline } from "react-icons/io5";
import Parse from "parse";
import PubSub from "pubsub-js";

const Header = ({
  username,
  profileImageUrl = Parse.User.current().get("profileImgUrl"),
}) => {
  return (
    <header className="fixed z-10 flex-1 w-full p-4 flex gap-3 items-center max-h-[80px] shadow-lg bg-colors-black z-20">
      <button
        onClick={() => {
          localStorage.clear();
          PubSub.publish("logout-requested");
        }}
      >
        <IoArrowBackOutline className="text-colors-white" size="2rem" />
      </button>
      <img
        className="profilePicture w-14 rounded-full border-colors-gray-800 border-2"
        src={profileImageUrl}
        alt="profilePicture"
      ></img>
      <h1 className="text-colors-white">{username}</h1>
    </header>
  );
};

export default Header;
