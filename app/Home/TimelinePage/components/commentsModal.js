import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Send } from "lucide-react";

const imagePostEndPoint = process.env.NEXT_PUBLIC_POST_IMAGES_ENDPOINT;

const PostModal = ({ isOpen, onClose, post }) => {
  const hasImages = post.image_names && post.image_names.length > 0;
  const images = post?.image_names || [];
  const comments = post?.original_comments || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log(post);
  }, [post]);

  const handleCarouselChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-gray-800 dark:text-white sm:max-w-[900px] sm:h-[600px] p-0 gap-0 z-50">
        <div className="flex h-full">
          {hasImages && (
            <div className="w-1/2 h-full border-r dark:border-gray-700">
              <Carousel
                className="w-full h-full"
                onChange={handleCarouselChange}
              >
                <CarouselContent className="h-full">
                  {images.map((image, index) => (
                    <CarouselItem
                      key={index}
                      className="h-full flex items-center justify-center"
                    >
                      <img
                        src={imagePostEndPoint + image}
                        alt={`Post image ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 text-white" />
                <CarouselNext className="right-2 text-white" />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full bg-white opacity-50 hover:opacity-100 ${
                        currentIndex === index ? "bg-opacity-100" : ""
                      }`}
                    />
                  ))}
                </div>
              </Carousel>
            </div>
          )}
          <div
            className={`${hasImages ? "w-1/2" : "w-full"} flex flex-col h-full`}
          >
            <DialogHeader className="px-7 py-2 border-b dark:border-gray-700">
              <DialogTitle>Post Details</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col flex-grow overflow-hidden">
              <ScrollArea className="flex-grow">
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
                    <div>
                      <p className="font-semibold">
                        {post.original_post_firstname}{" "}
                        {post.original_post_lastname}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Location
                      </p>
                    </div>
                  </div>
                  <p className="mb-4">{post.post_content}</p>
                  <div className="space-y-4">
                    {comments.map((comment, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
                        <div>
                          <p>
                            <span className="font-semibold">
                              {comment.author}
                            </span>{" "}
                            {comment.content}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            2h
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
              <div className="border-t dark:border-gray-700 p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-6 w-6" />
                  </Button>
                </div>
                <p className="font-semibold mb-2">535 likes</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-grow mr-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <Button size="icon" variant="ghost">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
