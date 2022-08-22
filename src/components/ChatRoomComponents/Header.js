import { IoArrowBackOutline } from "react-icons/io5";
import Parse from "parse";
import PubSub from "pubsub-js";

const Header = ({
  username,
  profileImageUrl = Parse.User.current().get("profileImgUrl"),
}) => {
  const handleClick = (e) => {
    PubSub.publish("change-profile-img-req", e);
    document.querySelector("#file-picker").click();
  };
  const handleOnChange = (e) => {
    // var fileUploadControl = document.querySelector("#file-picker");
    var fileUploadControl = e.target;
    var file = fileUploadControl.files[0];
    let name = file.name; //This does *NOT* need to be a unique name
    name = name.trim().replace(" ", "");
    name = name.replace("(", "");
    name = name.replace(")", "");
    var parseFile = new Parse.File(name, file);

    parseFile.save().then(
      () => {
        saveImgMessage(parseFile);
      },
      function (error) {
        alert(error);
      }
    );
  };
  const saveImgMessage = async (fileObject) => {
    var ProfileImg = Parse.Object.extend("ProfileImg");
    var profileImage = new ProfileImg();
    profileImage.set("url", fileObject.url());
    profileImage.set("username", Parse.User.current().get("username"));
    profileImage.set(
      "profileImgUrl",
      Parse.User.current().get("profileImgUrl")
    );
    profileImage.set("userId", Parse.User.current().id);
    profileImage.save();
    PubSub.publish("new-profile-image-added", { profileImage });
  };

  PubSub.subscribe("new-profile-image-added", (msg, { profileImage }) => {
    document.querySelector(".profilePicture").src = profileImage.get("url");
    Parse.User.current().set("profileImgUrl", profileImage.get("url"));
    Parse.User.current().save();
  });

  return (
    <header className="fixed z-10 flex-1 w-full p-4 flex gap-3 items-center max-h-[80px] shadow-lg bg-colors-black z-20">
      <input
        type="file"
        className="hidden"
        id="file-picker"
        onChange={handleOnChange}
      ></input>
      <button
        onClick={() => {
          localStorage.clear();
          PubSub.publish("logout-requested");
        }}
      >
        <IoArrowBackOutline className="text-colors-white" size="2rem" />
      </button>
      <img
        className="profilePicture w-[52px] h-[52px] rounded-full border-colors-gray-800 border-2"
        src={profileImageUrl}
        alt="profilePicture"
        onClick={handleClick}
      ></img>
      <h1 className="text-colors-white">{username}</h1>
    </header>
  );
};

export default Header;
