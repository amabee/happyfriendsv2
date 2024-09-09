"use client";
import React, { useEffect, useState } from "react";
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
import TimeLine from "./TimelinePage/components/timeline";
import { getSession } from "@/lib/lib";

const Home = () => {
  const [activeModule, setActiveModule] = useState("timeline");
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession();
        setCurrentUser(session.user);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    fetchSession();
  }, []);
  return (
    <div className="app-container">
      <NavBar />
      <div className="content">
        {activeModule === "timeline" && <TimeLine data={currentUser}/>}
      </div>
    </div>
  );
};

export default Home;
