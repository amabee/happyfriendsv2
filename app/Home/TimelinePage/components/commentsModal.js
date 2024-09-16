import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
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
import { ThumbsUp, MessageCircle, Share2, X } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const imagePostEndPoint = process.env.NEXT_PUBLIC_POST_IMAGES_ENDPOINT;
const imageEndPoint = process.env.NEXT_PUBLIC_USER_IMAGES_ENDPOINT;

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
      <DialogContent className="bg-black text-white max-w-[1250px] h-[600px] p-0 gap-0 z-[9999] fixed overflow-hidden">
        <div className="flex h-full">
          {/* Left side - Image */}
          <div className="w-[calc(100%-400px)] h-full relative bg-black flex items-center justify-center">
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-4 rounded-full bg-black/50 hover:bg-black/70 z-10"
            >
              <X className="h-5 w-5 text-white" />
            </Button>
            {hasImages && (
              <Carousel className="w-full h-full" onChange={handleCarouselChange}>
                <CarouselContent className="h-full">
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="h-full flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center py-8">
                        <img
                          src={imagePostEndPoint + image}
                          alt={`Post image ${index + 1}`}
                          className="max-w-full max-h-full w-auto h-auto object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <CarouselPrevious className="h-full rounded-none bg-black/50 hover:bg-black/70" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <CarouselNext className="h-full rounded-none bg-black/50 hover:bg-black/70" />
                </div>
              </Carousel>
            )}
          </div>

          {/* Right side - Comments and interactions */}
          <div className="w-[400px] h-full bg-white text-black flex flex-col">
            {/* Post author */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={imageEndPoint + post.original_post_pfp} alt={`${post.original_post_firstname} ${post.original_post_lastname}`} />
                </Avatar>
                <div>
                  <p className="font-semibold text-base">{post.original_post_firstname} {post.original_post_lastname}</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </div>
              <p className="mt-3 text-sm">{post.post_content}</p>
            </div>

            {/* Comments */}
            <ScrollArea className="flex-grow">
              <div className="p-4 space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={imageEndPoint + comment.author_pfp} alt={comment.author} />
                    </Avatar>
                    <div className="flex-grow">
                      <div className="bg-gray-100 rounded-lg p-2">
                        <p className="font-semibold text-sm">{comment.author}</p>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Like · Reply · 1m</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Interaction buttons */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between mb-4">
                <Button variant="ghost" size="sm" className="flex-1 text-gray-600 hover:bg-gray-100">
                  <ThumbsUp className="h-5 w-5 mr-2" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-gray-600 hover:bg-gray-100">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-gray-600 hover:bg-gray-100">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
              <div className="flex items-center">
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src="/api/placeholder/32/32" alt="Your avatar" />
                </Avatar>
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="flex-grow p-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;