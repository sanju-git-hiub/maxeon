import React, { Component } from "react";
import { Pages } from "../../commondata/pages";
import "./_sidebar.css";
const SideBar = ({ isOpen }) => {
  return (
    <div className={"side-drawer " + (isOpen ? "open" : "")}>
      <div className="sidebar-head">
        <h4>Menu</h4>
      </div>
      <div className="sidebar-nav">
        <ul>
          {Pages.map((page, index) => (
            <li key={index}>
              <a href={page.link}>{page.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
