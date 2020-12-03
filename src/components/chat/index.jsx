import React, { Component } from "react";
import { Send, Close } from "@material-ui/icons";
import ChatBubble from "./_chatbubble";
import chaticon from "../../assets/chaticon.png";
import sparrow_favicon from "../../assets/sparrow_favicon.png";
import "./_chatwidget.css";

class ChatWidget extends Component {
  state = {
    chatModal: false,
    chatStart: false,
    customerMsg: "",
    loader: false,
    chats: [
      // sender 0 customer 1 admin
    ],
  };

  scrollToBottom = () => {
    console.log("asdas");
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  // Toggle Chat Box
  toggleChatBox = () => {
    this.setState({ chatModal: !this.state.chatModal });
  };
  // Open Chat
  openChat = () => {
    const initChat = {
      message: "Hi How may I Help You?",
      sender: 1,
    };
    this.setState({ chatStart: true }, () => {
      this.setState({ customerMsg: "" });
      this.state.chats.push(initChat);
    });
  };
  // set state
  messageSet = (e) => {
    this.setState({ customerMsg: e.target.value });
  };
  // push chat
  postChat = (e) => {
    if (e.keyCode == 13) {
      const nChat = {
        message: e.target.value,
        sender: 0,
      };
      if (!!this.state.customerMsg) {
        fetch("https://api.adviceslip.com/advice")
          .then((res) => res.json())
          .then((result) => {
            const rChat = {
              message: result.slip.advice,
              sender: 1,
            };
            this.setState({ loader: false }, () => {
              this.setState({ customerMsg: "" });
              this.state.chats.push(rChat);
              if (this.messagesEnd) {
                this.messagesEnd.addEventListener(
                  "DOMNodeInserted",
                  (event) => {
                    const { currentTarget: target } = event;
                    target.scroll({
                      top: target.scrollHeight,
                      behavior: "smooth",
                    });
                  }
                );
              }
            });
          });
      }
      this.setState({ loader: true }, () => {
        this.setState({ customerMsg: "" });
        this.state.chats.push(nChat);
      });
    }
  };

  render() {
    const { loader, customerMsg, chatModal, chats, chatStart } = this.state;
    return (
      <div>
        <div className={"chatBox " + (chatModal ? "visible" : "")}>
          <div className="chatHead chatGutter">
            <h5>Hi There</h5>
            {chatStart ? (
              <h4>The team typically replies in a few minutes</h4>
            ) : (
              <h6>Hello Ask Us Anything, Share Your Feedback</h6>
            )}
            <button className="mob-close visi-mob" onClick={this.toggleChatBox}>
              <Close />
            </button>
          </div>
          <div className="chatBody">
            {chatStart ? (
              <div>
                <div
                  className="chatContainer"
                  ref={(el) => {
                    this.messagesEnd = el;
                  }}
                >
                  {chats.map((chat, index) => (
                    <ChatBubble
                      message={chat.message}
                      sender={chat.sender}
                      key={index}
                    />
                  ))}
                </div>
                <div className="chatInput">
                  <div className="chatMeta">
                    <h4>
                      <span>
                        <img
                          src={sparrow_favicon}
                          alt=""
                          className="imgFluid"
                        />
                      </span>
                      we run on surveysparrow
                    </h4>
                  </div>
                  <div className="inputContainer">
                    <input
                      type="text"
                      onKeyDown={this.postChat}
                      placeholder="Write Reply"
                      value={customerMsg}
                      onChange={this.messageSet}
                      readOnly={loader}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="initContent chatGutter">
                <h4>Start a Conversation</h4>
                <h6>The team typically replies in a few minutes</h6>
                <button className="initChat iconButton" onClick={this.openChat}>
                  New Conversation
                  <Send />
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          className={"chatToggler " + (chatModal ? "mob-hidden active" : "")}
          onClick={this.toggleChatBox}
        >
          {chatModal ? (
            <Close />
          ) : (
            <img src={chaticon} alt="" className="imgFluid" />
          )}
        </button>
      </div>
    );
  }
}

export default ChatWidget;
