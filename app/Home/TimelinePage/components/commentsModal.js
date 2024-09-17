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
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Send, X } from "lucide-react";

const imagePostEndPoint = process.env.NEXT_PUBLIC_POST_IMAGES_ENDPOINT;

const PostModal = ({ isOpen, onClose, post }) => {
  const hasImages = post.image_names && post.image_names.length > 0;
  const images = post?.image_names || [];
  const comments = post?.original_comments || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log(post);
  }, [post]);

  const handleCarouselChange = (index) => {
    setCurrentIndex(index);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting comment:", comment);
    setComment("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white max-w-5xl h-[auto] z-[9999] p-0 gap-0 rounded-lg overflow-hidden">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 rounded-full bg-gray-800 hover:bg-gray-700 z-10"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="flex h-full">
          {hasImages && (
            <div className="w-1/2 h-full border-r border-gray-700 relative overflow-hidden">
              <Carousel
                className="w-full h-full"
                onChange={handleCarouselChange}
              >
                <CarouselContent className="h-full">
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="h-full">
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={imagePostEndPoint + image}
                          alt={`Post image ${index + 1}`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70" />
              </Carousel>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      currentIndex === index ? "bg-white" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
          <div className={`${hasImages ? "w-1/2" : "w-full"} flex flex-col h-full`}>
            <DialogHeader className="px-6 py-4 border-b border-gray-700">
              <DialogTitle className="text-lg font-semibold">Post Details</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col h-full">
              {/* Scrollable content area */}
              <ScrollArea className="flex-grow px-6 py-4">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 mr-3">
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.original_post_firstname} ${post.original_post_lastname}`}
                        alt="User avatar"
                      />
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        {post.original_post_firstname} {post.original_post_lastname}
                      </p>
                      <p className="text-sm text-gray-400">Location</p>
                    </div>
                  </div>
                  <p className="text-lg">{post.post_content}</p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Avatar className="w-8 h-8 mr-3">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=hesoka`}
                          alt="User avatar"
                        />
                      </Avatar>
                      <div>
                        <p>
                          <span className="font-semibold">Irelia Yamaguchi</span> Nice ka dol
                        </p>
                        <p className="text-sm text-gray-400">2h</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Avatar className="w-8 h-8 mr-3">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=hesoka`}
                          alt="User avatar"
                        />
                      </Avatar>
                      <div>
                        <p>
                          <span className="font-semibold">Irelia Yamaguchi</span> Nice ka dol
                        </p>
                        <p className="text-sm text-gray-400">2h</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Avatar className="w-8 h-8 mr-3">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=hesoka`}
                          alt="User avatar"
                        />
                      </Avatar>
                      <div>
                        <p>
                          <span className="font-semibold">Irelia Yamaguchi</span> Nice ka dol
                        </p>
                        <p className="text-sm text-gray-400">2h</p>
                      </div>
                    </div>
                      <div className="flex items-start">
                      <Avatar className="w-8 h-8 mr-3">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=hesoka`}
                          alt="User avatar"
                        />
                      </Avatar>
                      <div>
                        <p>
                          <span className="font-semibold">Irelia Yamaguchi</span> Nice ka dol
                        </p>
                        <p className="text-sm text-gray-400">2h</p>
                      </div>
                    </div>
                    {/* Add more comments here if needed */}
                  </div>
                </div>
              </ScrollArea>

              {/* Footer with input field */}
              <div className="border-t border-gray-700 p-4 bg-gray-800">
                <div className="flex items-center space-x-4 mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <Heart className="h-6 w-6 text-red-500 mr-2" />
                    535 likes
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <MessageCircle className="h-6 w-6 text-blue-400 mr-2" />
                    {comments.length} comments
                  </Button>
                </div>
                <form onSubmit={handleCommentSubmit} className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-grow mr-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <Send className="h-5 w-5 text-blue-400" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
