import React from "react";
import ProfileCard from "./ProfileCard";

export const LeftContent = ({ data }) => {
  return (
    <div class="content_left">
      <ProfileCard data={data} />
    </div>
  );
};
