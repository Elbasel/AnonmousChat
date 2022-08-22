import { useState } from "react";
import PubSub from "pubsub-js";
import Parse from "parse";

const urls = [
  "https://pbs.twimg.com/media/EZqRRpTUMAABaHI.jpg",
  "https://bestprofilepictures.com/wp-content/uploads/2021/06/Anonymous-Profile-Photo-1.jpg",
  "https://scontent-hbe1-1.xx.fbcdn.net/v/t1.6435-9/104256647_109264227501798_1117774836475068212_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=111&ccb=1-7&_nc_sid=85a577&efg=eyJpIjoidCJ9&_nc_eui2=AeFnq0xN6UkhGxlIb3vmg2-90GHGMC9jXCfQYcYwL2NcJ6yFGaMTVQof9Z4278TAxYhGX5HoD4mKF90_mVXl7vsV&_nc_ohc=7wk7hfguxr8AX8PdwnI&_nc_ht=scontent-hbe1-1.xx&oh=00_AT-VQpl1AHLcWaFU6mJO97fWia67UpZX1O5B_5JxYdrQaQ&oe=632775D8",
  "https://i0.wp.com/sguru.org/wp-content/uploads/2017/06/cool-anonymous-profile-pictures-1699946_orig.jpg?ssl=1",
  "https://bestprofilepictures.com/wp-content/uploads/2021/06/Anonymous-Profile-Picture-For-Whatsaap-1-922x1024.jpg",
  "https://avatarfiles.alphacoders.com/286/286972.jpg",
];

const handleClick = ({ e, setSelected }) => {
  setSelected(true);
  PubSub.publish("new-image-selected", e.target.id);
};

const saveImgMessage = async (fileObject) => {
  var ProfileImg = Parse.Object.extend("ProfileImg");
  var profileImage = new ProfileImg();
  profileImage.set("url", fileObject.url());
  // profileImage.set("username", Parse.User.current().get("username"));
  // profileImage.set("profileImgUrl", Parse.User.current().get("profileImgUrl"));
  // profileImage.set("userId", Parse.User.current().id);
  profileImage.save();
  PubSub.publish("new-profile-image-added", { profileImage });
};

const handleAddPicture = (e) => {
  document.querySelector("#file-picker").click();
  const Img = e.target;
  PubSub.publish("new-image-selected", Img.id);
  // debugger;
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

const PicturePicker = ({ profileImgUrl }) => {
  return (
    <div className="PicturePicker flex gap-2  h-[30%] items-center">
      {profileImgUrl ? (
        <Image
          src={profileImgUrl}
          id={"add-pic-button"}
          onClickOverride={handleAddPicture}
          red={true}
        />
      ) : (
        <button
          type="button"
          onClick={handleAddPicture}
          className="w-[70px] flex"
        >
          <Image
            src="https://www.citypng.com/public/uploads/small/11639609700adr8oezftyzrqr8lhzj8grcvyzlrje7f4pls6seuo32auctlnebpkieixy17191a21ybfkrry6yejsbevdah18of7mkxp8b8dpky.png"
            id="add-profile-img"
          />
        </button>
      )}
      <div className="images flex gap-2 overflow-auto p-3">
        {urls.map((url, index) => {
          return <Image src={url} key={index} id={index} />;
        })}

        <input
          onChange={handleOnChange}
          type="file"
          id="file-picker"
          className="hidden"
        />
      </div>
    </div>
  );
};

const Image = ({ src, id, red, onClickOverride }) => {
  const [selected, setSelected] = useState(id === 0 ? true : false);

  PubSub.subscribe("new-image-selected", (msg, elementId) => {
    if (+elementId !== id) {
      setSelected(false);
    }
  });

  let clickFn;

  if (onClickOverride) {
    clickFn = onClickOverride;
  } else {
    clickFn = (e) => {
      handleClick({ e, setSelected });
    };
  }

  return (
    <img
      id={id}
      src={src}
      onClick={clickFn}
      className={`ProfilePicturePicker w-12 ${
        selected ? "border-colors-red-700 selected" : "border-colors-gray-600"
      } ${
        red ? "border-colors-rose-800 selected" : ""
      } border-2 rounded-3xl p-2 min-w-[20%] flex-1`}
      alt="Profile"
    />
  );
};

export default PicturePicker;
