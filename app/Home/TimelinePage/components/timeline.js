"use client";
import React, { useEffect, useState, useRef } from "react";
import FloatingSnapButton from "../../components/draggableFab";
import ProfileCard from "./ProfileCard";
import StoriesCarousel from "./StoryCarousel";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import CreatePostModal from "./createPostModal";
import { getPosts } from "../../lib/POST_PROCESS";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { MessageSquare, Share, ThumbsUpIcon } from "lucide-react";
import { IoMdShareAlt } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import { Emoji, EmojiClickData, EmojiStyle } from "emoji-picker-react";
import "../../../../public/css/emojistyles.css";

const imageEndPoint = process.env.NEXT_PUBLIC_USER_IMAGES_ENDPOINT;
const imagePostEndPoint = process.env.NEXT_PUBLIC_POST_IMAGES_ENDPOINT;

const LeftContent = ({ data }) => {
  return (
    <div class="content_left">
      <ProfileCard data={data} />
    </div>
  );
};

const CenterContent = ({ postData }) => {
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
                <i className="fas fa-video live-video-icon"></i>
                <span>Live Video</span>
              </div>
              <div className="share_downSide_link">
                <i className="fas fa-photo-video photo-video-icon"></i>
                <span>Photo/Video</span>
              </div>
              <div className="share_downSide_link">
                <i className="far fa-grin-alt feeling-icon"></i>
                <span>Feeling/Activity</span>
              </div>
            </div>
          </div>
          {/* News feed */}
          {postData && postData.length > 0 ? (
            postData.map((post) => <NewsFeed post={post} key={post.id} />)
          ) : (
            <p>No posts available</p>
          )}
        </div>
        <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
      </PerfectScrollbar>
    </div>
  );
};

const NewsFeed = ({ post }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [showAllEmojis, setShowAllEmojis] = useState(false);

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible((prevState) => !prevState);
  };

  const handleEmojiClick = (emojiType) => {
    setSelectedEmoji(emojiType);
    setEmojiPickerVisible(false);
  };

  const handlePlusButtonClick = () => {
    setShowAllEmojis(true);
  };

  const customEmojis = [
    {
      unified: "1f44d",
      name: "Thumbs Up",
      keywords: ["like", "positive", "agree"],
      imageUrl:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Thumbs%20Up%20Medium-Light%20Skin%20Tone.png",
    },
    {
      unified: "2764-fe0f",
      name: "Red Heart",
      keywords: ["love", "heart"],
      imageUrl:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Pink%20Heart.png",
    },
    {
      unified: "1f602",
      name: "Face with Tears of Joy",
      keywords: ["laugh", "funny", "haha"],
      imageUrl:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Tears%20of%20Joy.png",
    },
    {
      unified: "1f632",
      name: "Astonished Face",
      keywords: ["wow", "surprised", "shocked"],
      imageUrl:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Astonished%20Face.png",
    },
    {
      unified: "1f622",
      name: "Crying Face",
      keywords: ["cry", "sad", "upset"],
      imageUrl:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20Holding%20Back%20Tears.png",
    },
    {
      unified: "1f621",
      name: "Pouting Face",
      keywords: ["angry", "mad", "rage"],
      imageUrl:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Angry%20Face.png",
    },
  ];

  return (
    <div key={post.id} className="news_feed">
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
          <img src={imagePostEndPoint + post.image_names[0]} alt="post" />
        )}
      </div>
      <div className="likes_area">
        <div className="emojis">
          <img src="assets/emoji_like.png" alt="like" />
          <img src="assets/emoji_surprised.png" alt="surprised" />
          <img src="assets/emoji_angry.png" alt="angry" />
          <span>{post.original_reaction_count}</span>
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
          <ThumbsUpIcon className="mr-2" />
          <span>Like</span>
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
                    selectedEmoji === emoji.name ? "selected" : ""
                  }`}
                  onClick={() => handleEmojiClick(emoji.name)}
                >
                  {emoji.imageUrl ? (
                    <img src={emoji.imageUrl} alt={emoji.name} />
                  ) : (
                    <div className="emoji-symbol">
                      {String.fromCodePoint(parseInt(emoji.unified, 16))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="likes_buttons_links">
          <MessageSquare className="mr-2" />
          <span>Comment</span>
        </div>
        <div className="likes_buttons_links">
          <IoMdShareAlt className="mr-2" />
          <span>Share</span>
        </div>
      </div>
    </div>
  );
};

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
      <CenterContent postData={postsDatas} />
      <FloatingSnapButton />
    </div>
  );
};

export default TimeLine;
