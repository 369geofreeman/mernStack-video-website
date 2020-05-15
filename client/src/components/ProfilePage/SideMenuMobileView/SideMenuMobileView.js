import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
// Redux
import { logout } from "../../../store/actions/Index";
// componenets
import "./SideMenuMobileView.css";

const SideMenuMobileView = ({ logout }) => {
  return (
    <div className="mobileSideMenuContainer">
      <ul className="mobileSideMenuTitles">
        <li className="mobileMenuTitle">
          <NavLink
            exact={true}
            style={{ color: "white", textDecoration: "none" }}
            activeStyle={{ color: "#fa516a" }}
            to={`/${"u2"}/profile`}
          >
            Collection
          </NavLink>
        </li>

        <li className="mobileMenuTitle">
          <NavLink
            exact={true}
            style={{ color: "white", textDecoration: "none" }}
            activeStyle={{ color: "#fa516a" }}
            activeClassName="sideMenuTitlesActive"
            to={`/${"u2"}/profile/categories`}
          >
            Categories
          </NavLink>
        </li>
        <li className="mobileMenuTitle">
          <NavLink
            exact={true}
            style={{ color: "white", textDecoration: "none" }}
            activeStyle={{ color: "#fa516a" }}
            activeClassName="sideMenuTitlesActive"
            to={`/${"u2"}/profile/settings`}
          >
            Account
          </NavLink>
        </li>
        <li
          onClick={() =>
            window.confirm("Are you sure you wish to dlog out?") && logout()
          }
          className="mobileMenuTitle"
        >
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default connect(null, { logout })(SideMenuMobileView);
