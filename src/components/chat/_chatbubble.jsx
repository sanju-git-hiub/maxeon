import "./_chatbubble.css";
const ChatBubble = ({ message, sender }) => {
  return (
    <div className={"chat-box " + (sender ? "admin" : "customer")}>
      {sender === 1 && <div className="chatimage"></div>}
      <div className="chat-bubble">
        <h6>{message}</h6>
      </div>
    </div>
  );
};

export default ChatBubble;
