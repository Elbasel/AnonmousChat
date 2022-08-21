import { useState } from "react";
import PubSub from "pubsub-js";

const urls = [
  "https://pbs.twimg.com/media/EZqRRpTUMAABaHI.jpg",
  "https://bestprofilepictures.com/wp-content/uploads/2021/06/Anonymous-Profile-Photo-1.jpg",
];

const handleClick = ({ e, setSelected }) => {
  setSelected(true);
  PubSub.publish("new-image-selected", e.target.id);
};

const PicturePicker = () => {
  return (
    <div className="PicturePicker flex gap-2 flex-col h-[30%]">
      <h1>Choose Profile Picture</h1>
      <div className="images flex gap-3 justify-center">
        {urls.map((url, index) => {
          return <Image src={url} key={index} id={index} />;
        })}
      </div>
    </div>
  );
};

export default PicturePicker;

const Image = ({ src, id }) => {
  const [selected, setSelected] = useState(id === 0 ? true : false);

  PubSub.subscribe("new-image-selected", (msg, elementId) => {
    if (+elementId !== id) {
      setSelected(false);
    }
  });

  return (
    <img
      id={id}
      src={src}
      onClick={(e) => {
        handleClick({ e, setSelected });
      }}
      className={`ProfilePicturePicker w-12 ${
        selected ? "border-colors-red-700 selected" : "border-colors-gray-600"
      } border-2 rounded-3xl p-2`}
      alt="Profile"
    />
  );
};
