"use client";
import React, { useEffect, useState, useRef } from "react";
import FloatingSnapButton from "../../components/draggableFab";
import "react-perfect-scrollbar/dist/css/styles.css";
import { getPosts } from "../../lib/POST_PROCESS";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import EmojiPicker from "emoji-picker-react";
import { Emoji, EmojiClickData, EmojiStyle } from "emoji-picker-react";
import "../../../../public/css/emojistyles.css";

import { LeftContent } from "./leftContent";
import CenterContent from "./centerContent";
import MainToast from "@/app/components/MainToast";

const TimeLine = ({ data }) => {
  const [postsDatas, setPostsDatas] = useState();
  const { toast } = useToast();
  const uid = data?.user_id;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!uid) {
          console.error("UID is not available");
          return;
        }

        const { success, message, data } = await getPosts({ userID: uid });

        if (!success) {
          console.log("ERROR?", uid);
          console.log("ERROR MESSAGE: ", message);
          return;
        }

        if (success) {
          setPostsDatas(data);
          console.log("Success Data: ", message);
        } else {
          setPostsDatas(message);
          console.log("Error Data: ", message);
        }
      } catch (err) {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Whoops! something went wrong",
          description: "An error occurred while fetching posts. " + err,
          className: cn(
            "fixed bottom-0 left-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4  sm:right-0  sm:flex-col md:max-w-[420px] data-[state=closed]:slide-out-to-left-full bottom-0 left-0"
          ),
        });
      }
    };

    if (uid) {
      fetchPosts();
    }
  }, [uid]); // Add uid as a dependency

  return (
    <div className="content">
      <LeftContent data={data} />
      <CenterContent postData={postsDatas} uid={uid} />
      <FloatingSnapButton />
      <MainToast position="bottom-left" />
    </div>
  );
};

export default TimeLine;
