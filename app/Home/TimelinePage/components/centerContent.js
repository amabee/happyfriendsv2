import React, { useEffect, useState, useRef } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import StoriesCarousel from "./StoryCarousel";
import { IoMdVideocam } from "react-icons/io";
import { FaImages } from "react-icons/fa";
import { FaGrin } from "react-icons/fa";
import CreatePostModal from "./createPostModal";
import { MessageSquare, Share, ThumbsUpIcon } from "lucide-react";

import { IoMdShareAlt } from "react-icons/io";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import {
  getUserReactions,
  likePost,
  removeReaction,
  updateReaction,
} from "../../lib/POST_PROCESS";
import MainToast, { MainToastNotif } from "@/app/components/MainToast";
import PostModal from "./commentsModal";

const imageEndPoint = process.env.NEXT_PUBLIC_USER_IMAGES_ENDPOINT;
const imagePostEndPoint = process.env.NEXT_PUBLIC_POST_IMAGES_ENDPOINT;

const parseReactions = (reactionsString) => {
  if (typeof reactionsString !== "string" || reactionsString.trim() === "") {
    return [];
  }

  return reactionsString.split(", ").map((reaction) => {
    const [type, count] = reaction.split(": ");
    return { type, count: parseInt(count, 10) };
  });
};

const NewsFeed = ({ post, uid }) => {
  const [hasReacted, setHasReacted] = useState(false);
  const [userReaction, setUserReaction] = useState(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(post.image_names.length);
  const [api, setApi] = useState();
  const [reactions, setReactions] = useState(
    parseReactions(post.top_reactions)
  );
  const [reactionCount, setReactionCount] = useState(
    post.original_reaction_count
  );
  const [postModalOpen, setPostModalOpen] = useState();
  const handlePostModalOpen = () => setPostModalOpen(true);
  const handlePostModalClose = () => setPostModalOpen(false);

  useEffect(() => {
    const checkUserReaction = async () => {
      const { success, data } = await getUserReactions(uid);
      if (success) {
        const postReaction = data.find(
          (reaction) => reaction.post_id === post.original_post_id
        );
        if (postReaction) {
          setHasReacted(true);
          setUserReaction(postReaction.reaction_type);
        }
      }
    };
    checkUserReaction();
  }, [uid, post.original_post_id]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const timer = setTimeout(() => {
      setCurrent(api.selectedScrollSnap());
      setCount(api.scrollSnapList().length);
    }, 100);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => clearTimeout(timer);
  }, [api]);

  const handleEmojiClick = async (postID, emojiType) => {
    const formData = new FormData();

    try {
      if (hasReacted) {
        if (userReaction === emojiType) {
          // Unlike/remove reaction
          formData.append("operation", "removeReaction");
          formData.append(
            "json",
            JSON.stringify({
              post_id: postID,
              user_id: uid,
            })
          );

          const { success, message } = await removeReaction({ formData });

          if (success) {
            setHasReacted(false);
            setUserReaction(null);
            updateReactionsDisplay(emojiType, -1);
            MainToastNotif("Reaction removed!", "success");
          } else {
            console.error("Error removing reaction:", message);
            MainToastNotif(message || "Error removing reaction", "error");
          }
        } else {
          // Update reaction
          formData.append("operation", "updateReaction");
          formData.append(
            "json",
            JSON.stringify({
              post_id: postID,
              user_id: uid,
              reaction_type: emojiType,
            })
          );

          const { success, message } = await updateReaction({ formData });

          if (success) {
            updateReactionsDisplay(userReaction, -1);
            updateReactionsDisplay(emojiType, 1);
            setUserReaction(emojiType);
            MainToastNotif("Reaction updated!", "success");
          } else {
            console.error("Error updating reaction:", message);
            MainToastNotif(message || "Error updating reaction", "error");
          }
        }
      } else {
        // Add new reaction
        formData.append("operation", "addReaction");
        formData.append(
          "json",
          JSON.stringify({
            post_id: postID,
            user_id: uid,
            reaction_type: emojiType,
          })
        );

        const { success, message } = await likePost({ formData });

        if (success) {
          setHasReacted(true);
          setUserReaction(emojiType);
          updateReactionsDisplay(emojiType, 1);
          MainToastNotif("You reacted to this post!", "success");
        } else {
          console.error("Error adding reaction:", message);
          MainToastNotif(message || "Error adding reaction", "error");
        }
      }
    } catch (error) {
      console.error("Unexpected error in handleEmojiClick:", error);
      MainToastNotif("An unexpected error occurred", "error");
    }
  };

  const updateReactionsDisplay = (emojiType, change) => {
    setReactions((prevReactions) => {
      const updatedReactions = [...prevReactions];
      const existingReaction = updatedReactions.find(
        (r) => r.type === emojiType
      );
      if (existingReaction) {
        existingReaction.count += change;
        if (existingReaction.count <= 0) {
          return updatedReactions.filter((r) => r.type !== emojiType);
        }
      } else if (change > 0) {
        updatedReactions.push({ type: emojiType, count: change });
      }
      return updatedReactions.sort((a, b) => b.count - a.count);
    });
    setReactionCount((prevCount) => prevCount + change);
  };

  const customEmojis = [
    {
      unified: "1f44d",
      type: "like",
      name: "Thumbs Up",
      keywords: ["like", "positive", "agree"],
      imageUrl:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Thumbs%20Up%20Medium-Light%20Skin%20Tone.png",
    },
    {
      unified: "2764-fe0f",
      type: "love",
      name: "Red Heart",
      keywords: ["love", "heart"],
      imageUrl:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Pink%20Heart.png",
    },
    {
      unified: "1f602",
      name: "Face with Tears of Joy",
      type: "haha",
      keywords: ["laugh", "funny", "haha"],
      imageUrl:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Tears%20of%20Joy.png",
    },
    {
      unified: "1f632",
      name: "Astonished Face",
      type: "wow",
      keywords: ["wow", "surprised", "shocked"],
      imageUrl:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Astonished%20Face.png",
    },
    {
      unified: "1f622",
      name: "Crying Face",
      type: "sad",
      keywords: ["cry", "sad", "upset"],
      imageUrl:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20Holding%20Back%20Tears.png",
    },
    {
      unified: "1f621",
      name: "Pouting Face",
      type: "angry",
      keywords: ["angry", "mad", "rage"],
      imageUrl:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Angry%20Face.png",
    },
  ];

  const emojiMap = customEmojis.reduce((acc, emoji) => {
    acc[emoji.type] = emoji.imageUrl;
    return acc;
  }, {});

  const getReactedEmoji = () => {
    return userReaction ? emojiMap[userReaction] : null;
  };

  return (
    <div key={post.original_post_id} className="news_feed">
      <div className="news_feed_title">
        <img
          src={imageEndPoint + post.original_post_pfp}
          alt="user"
          style={{
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            objectFit: "cover",
          }}
        />
        <div className="news_feed_title_content">
          <p>{`${post.original_post_firstname} ${post.original_post_lastname}`}</p>
          <span>
            {new Date(post.original_created_at).toLocaleString()} .
            <i className="fas fa-globe-americas"></i>
          </span>
        </div>
      </div>
      <div className="news_feed_description">
        <p className="news_feed_subtitle">{post.post_content}</p>

        {post.image_names && post.image_names.length > 0 && (
          <div className="news_feed_carousel relative">
            <Carousel
              setApi={setApi}
              className="w-full"
              onChange={(index) => {
                console.log("Slide index:", index + 1);
                setCurrent(index + 1);
              }}
            >
              <CarouselContent>
                {post.image_names.map((imageName, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 flex items-center justify-center">
                      <img
                        src={imagePostEndPoint + imageName}
                        alt={`post image ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-y-0 left-12 flex items-center">
                <CarouselPrevious className="h-10 w-10 ml-2 bg-black/50 text-white hover:bg-black/70" />
              </div>
              <div className="absolute inset-y-0 right-12 flex items-center">
                <CarouselNext className="h-10 w-10 mr-2 bg-black/50 text-white hover:bg-black/70" />
              </div>
            </Carousel>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {post.image_names.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    current === index ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="likes_area">
        <div className="emojis">
          {reactions.map((reaction, index) => (
            <div key={index} className="emoji_reaction">
              <img
                src={emojiMap[reaction.type] || "assets/emoji_default.png"}
                alt={reaction.type}
              />
            </div>
          ))}
          <span>{reactionCount}</span>
        </div>
        <div className="comment_counts">
          <span>
            {post.original_comments
              ? post.original_comments.split("|").length
              : 0}{" "}
            Comments
          </span>{" "}
          <span>{post.shared_reaction_count} Shares</span>
        </div>
      </div>
      <div className="divider">
        <hr />
      </div>
      <div className="likes_buttons">
        <div
          className="likes_buttons_links"
          onMouseEnter={() => setEmojiPickerVisible(true)}
          onMouseLeave={() => setEmojiPickerVisible(false)}
        >
          {getReactedEmoji() ? (
            <img
              src={getReactedEmoji()}
              alt="User Reaction"
              className="mr-2"
              style={{ width: "20px", height: "auto" }}
            />
          ) : (
            <ThumbsUpIcon className="mr-2" />
          )}
          <span
            onClick={() => {
              if (hasReacted) {
                handleEmojiClick(post.original_post_id, userReaction);
              } else {
                handleEmojiClick(post.original_post_id, "like");
              }
            }}
          >
            {hasReacted
              ? userReaction === "like"
                ? "Liked"
                : "Reacted"
              : "Like"}
          </span>
          {emojiPickerVisible && (
            <div
              className="emoji-picker-container"
              onMouseEnter={() => setEmojiPickerVisible(true)}
              onMouseLeave={() => setEmojiPickerVisible(false)}
            >
              {customEmojis.map((emoji) => (
                <div
                  key={emoji.unified}
                  className={`emoji ${
                    userReaction === emoji.type ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleEmojiClick(post.original_post_id, emoji.type)
                  }
                >
                  <img src={emoji.imageUrl} alt={emoji.name} loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="likes_buttons_links" onClick={handlePostModalOpen}>
          <MessageSquare className="mr-2" />
          <span>Comment</span>
        </div>
        <div className="likes_buttons_links">
          <IoMdShareAlt className="mr-2" />
          <span>Share</span>
        </div>
      </div>
      <PostModal isOpen={postModalOpen} onClose={handlePostModalClose} post={post}/>
    </div>
  );
};

const CenterContent = ({ postData, uid }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="content_center">
      <PerfectScrollbar className="center-scroll-container">
        <StoriesCarousel />
        <div className="media_container">
          <div className="share">
            <div className="share_upSide">
              <img
                src="./images/avatar.jpg"
                alt="profile"
                style={{
                  objectFit: "cover",
                  height: "3rem",
                  width: "3rem",
                  borderRadius: "50%",
                }}
              />
              <button
                type="button"
                onClick={openModal}
                className="px-4 py-2"
                style={{ textAlign: "left" }}
              >
                What's on your mind, Paul?
              </button>
            </div>
            <hr />
            <div className="share_downSide">
              <div className="share_downSide_link">
                <i className="fas fa-video live-video-icon">
                  <IoMdVideocam />
                </i>
                <span>Live Video</span>
              </div>
              <div className="share_downSide_link">
                <i className="fas fa-photo-video photo-video-icon">
                  <FaImages />
                </i>
                <span>Photo/Video</span>
              </div>
              <div className="share_downSide_link">
                <i className="far fa-grin-alt feeling-icon">
                  <FaGrin />
                </i>
                <span>Feeling/Activity</span>
              </div>
            </div>
          </div>
          {/* News feed */}
          {postData && postData.length > 0 ? (
            postData.map((post) => (
              <NewsFeed post={post} key={post.id} uid={uid} />
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
        <CreatePostModal isOpen={isModalOpen} onClose={closeModal} uid={uid} />
      </PerfectScrollbar>
    </div>
  );
};

export default CenterContent;
