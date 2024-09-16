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
      <DialogContent className="bg-gray-900 text-white max-w-[95vw] w-[95vw] h-[95vh] p-0 gap-0 z-[9999] fixed overflow-hidden">
        <div className="flex h-full">
          {/* Left side - Image */}
          <div className="w-[calc(100%-400px)] h-full relative bg-black flex items-center justify-center">
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-4 rounded-full bg-black/50 hover:bg-black/70 z-10"
            >
              <X className="h-4 w-4 text-white" />
            </Button>
            {hasImages && (
              <Carousel className="w-full h-full" onChange={handleCarouselChange}>
                <CarouselContent className="h-full">
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="h-full flex items-center justify-center">
                      <img
                        src={imagePostEndPoint + image}
                        alt={`Post image ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 text-white bg-black/50 hover:bg-black/70" />
                <CarouselNext className="absolute right-4 text-white bg-black/50 hover:bg-black/70" />
              </Carousel>
            )}
          </div>

          {/* Right side - Comments and interactions */}
          <div className="w-[400px] h-full bg-white flex flex-col">
            {/* Post author */}
            <div className="p-6 border-b">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={imageEndPoint + post.original_post_pfp} alt={`${post.original_post_firstname} ${post.original_post_lastname}`} />
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{post.original_post_firstname} {post.original_post_lastname}</p>
                  <p className="text-sm text-gray-500">Just now</p>
                </div>
              </div>
              <p className="mt-4 text-base">{post.post_content}</p>
            </div>

            {/* Comments */}
            <ScrollArea className="flex-grow">
              <div className="p-6 space-y-6">
                {comments.map((comment, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={imageEndPoint + comment.author_pfp} alt={comment.author} />
                    </Avatar>
                    <div className="flex-grow">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="font-semibold">{comment.author}</p>
                        <p className="text-base">{comment.content}</p>
                      </div>
                      <div className="text-sm text-gray-500 mt-2">Like · Reply · 1m</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Interaction buttons */}
            <div className="border-t p-6">
              <div className="flex justify-between mb-6">
                <Button variant="ghost" size="lg" className="flex-1">
                  <ThumbsUp className="h-6 w-6 mr-2" />
                  Like
                </Button>
                <Button variant="ghost" size="lg" className="flex-1">
                  <MessageCircle className="h-6 w-6 mr-2" />
                  Comment
                </Button>
                <Button variant="ghost" size="lg" className="flex-1">
                  <Share2 className="h-6 w-6 mr-2" />
                  Share
                </Button>
              </div>
              <div className="flex items-center">
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarImage src="/api/placeholder/40/40" alt="Your avatar" />
                </Avatar>
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="flex-grow p-3 bg-gray-100 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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