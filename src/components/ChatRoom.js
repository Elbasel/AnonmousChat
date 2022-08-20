import Header from "./ChatRoomComponents/Header";
import ChatArea from "./ChatRoomComponents/ChatArea";
import InputArea from "./ChatRoomComponents/InputArea";

const ChatRoom = ({ username }) => {
  return (
    // bg-dark-bg
    <div className="ChatRoom min-h-screen flex flex-col bg-colors-black bg-no-repeat bg-cover">
      <Header username={username} />
      <ChatArea />
      <InputArea />
    </div>
  );
};

export default ChatRoom;
