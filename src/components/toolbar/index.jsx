import React, { Component } from "react";
import { Pages } from "../../commondata/pages";
import { Menu, Person } from "@material-ui/icons";
import "./_toolbar.css";
class ToolBar extends Component {
  state = {};
  render() {
    return (
      <div className="appToolBar">
        <div className="innerContent">
          <div className="mob-menu only-mob">
            <button onClick={this.props.drawerClickHandle}>
              <Menu />
            </button>
          </div>
          <div className="mob-login only-mob">
            <button>
              <Person />
            </button>
          </div>
          <div className="brandLogo">
            <h2>Maxeon</h2>
          </div>
          <div className="nav">
            <ul>
              {Pages.map((page, index) => (
                <li key={index}>
                  <a href={page.link}>{page.name}</a>
                </li>
              ))}
              <li className="login">
                <a href="">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ToolBar;
