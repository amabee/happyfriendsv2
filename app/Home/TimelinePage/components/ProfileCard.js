import React from "react";
import "../../../../public/css/globals.css";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ProfileCard = ({ data }) => {
  const imageEndPoint = process.env.NEXT_PUBLIC_USER_IMAGES_ENDPOINT;
  return (
    <Card className="w-64 bg-#111827 text-white mt-5">
      <CardContent className="flex flex-col items-center p-6">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage
            src={imageEndPoint + data.image}
            className="object-cover"
            alt="Profile picture"
          />
          <AvatarFallback>IMAGE</AvatarFallback>
        </Avatar>

        <h2 className="text-xl font-bold mb-2">
          {data.firstname} {data.lastname}
        </h2>

        <p className="text-gray-400 text-sm mb-4 text-center">
          SAMPLE BIO
        </p>

        <div className="flex justify-around w-full mb-4">
          <div className="text-center divide-y">
            <p className="font-bold ">1.5K</p>
            <p className="text-xs text-gray-400">Followers</p>
          </div>
          <div className="text-center divide-y">
            <p className="font-bold ">500</p>
            <p className="text-xs text-gray-400">Following</p>
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Profile
        </button>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
