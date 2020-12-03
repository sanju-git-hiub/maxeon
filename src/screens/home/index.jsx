import React, { Component } from "react";
import ToolBar from "../../components/toolbar";
import SideBar from "../../components/sidebar";
import ChatWidget from "../../components/chat";
import "./_home.css";
class HomeScreen extends Component {
  state = {
    drawerIsOpen: false,
  };
  drawerHandler = () => {
    console.log("vannu");
    this.setState({ drawerIsOpen: true });
  };
  backdropHandler = () => {
    console.log("asdasd");
    this.setState({ drawerIsOpen: false });
  };
  render() {
    const { drawerIsOpen } = this.state;
    return (
      <section className="wrapper">
        <ToolBar drawerClickHandle={this.drawerHandler} />
        <SideBar isOpen={drawerIsOpen} />
        <div
          className={"backdrop " + (drawerIsOpen ? "active" : "")}
          onClick={this.backdropHandler}
        ></div>
        <div className="banner">
          <div className="bannerContent">
            <h1>Where words fail, Music speaks</h1>
          </div>
        </div>
        <ChatWidget />
      </section>
    );
  }
}

export default HomeScreen;
