"use client";
import React, { useState } from "react";
import "../../public/css/h-style.css";
import "../../public/css/globals.css";
import {
  SearchIcon,
  HomeIcon,
  Users2Icon,
  Music2Icon,
  PlayCircleIcon,
  CogIcon,
  PlusIcon,
} from "lucide-react";
import NavBar from "./components/navbar";
import TimeLine from "./components/timeline";

const Home = () => {
  const [activeModule, setActiveModule] = useState("timeline");

  return (
    <div className="app-container">
      <NavBar />
      <div className="content">
        {activeModule === "timeline" && <TimeLine />}
      </div>
    </div>
  );
};

export default Home;
