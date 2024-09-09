"use client";
import React from "react";
import {
  SearchIcon,
  HomeIcon,
  Users2Icon,
  Music2Icon,
  PlayCircleIcon,
  CogIcon,
  PlusIcon,
  BellDotIcon,
  MessageCircle,
} from "lucide-react";
import { TbMessage2 } from "react-icons/tb";

const NavBar = () => {
  return (
    <div>
      {/* NAVBAR START */}
      <div className="navbar">
        {/* NAVBAR LEFT */}
        <div className="navbar_left">
          <img className="navbar_logo" src="./images/logo.png" alt="logo" />
          <div className="input-icons">
            <SearchIcon className="search-icon" />
            <input
              className="input-field"
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
        {/* NAVBAR LEFT */}
        {/* NAVBAR CENTER */}
        <div className="navbar_center">
          <a className="active_icon" href="#">
            <HomeIcon className="nav-icon" />
          </a>
          <a href="#">
            <Users2Icon className="nav-icon" />
          </a>
          <a href="#">
            <Music2Icon className="nav-icon" />
          </a>
          <a href="#">
            <PlayCircleIcon className="nav-icon" />
          </a>
          {/* OPTIONAL COG, WILL BE UPDATED LATER */}
          <a href="#">
            <CogIcon className="nav-icon" />
          </a>
        </div>
        {/* NAVBAR CENTER */}
        {/* RIGHT NAVBAR COMPONENT */}
        <div className="navbar_right">
          <div className="navbar_right_links">
            <CogIcon className="nav-link-icon" />
            <TbMessage2  className="nav-link-icon"/>
            <BellDotIcon className="nav-link-icon" />
          </div>
          <div className="navbar_right_profile">
            <img src="./images/avatar.jpg" alt="profile_image" />
          </div>
        </div>
      </div>
      {/* NAVBAR END */}
    </div>
  );
};

export default NavBar;
