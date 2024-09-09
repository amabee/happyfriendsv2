"use client";
import React from "react";
import FloatingSnapButton from "../../components/draggableFab";
import ProfileCard from "./ProfileCard";
import StoriesCarousel from "./StoryCarousel";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useState } from "react";
import CreatePostModal from "./createPostModal";
const LeftContent = () => {
  return (
    <div class="content_left">
      <ProfileCard />
    </div>
  );
};

const CenterContent = () => {
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
          <div className="news_feed">
            <div className="news_feed_title">
              <img src="assets/user.png" alt="user" />
              <div className="news_feed_title_content">
                <p>Amabee</p>
                <span>
                  12h . <i className="fas fa-globe-americas"></i>
                </span>
              </div>
            </div>
            <div className="news_feed_description">
              <p className="news_feed_subtitle">
                ikaw ang bugtong itik na nagkapakapa sa malapokon kong dughan ug
                ikaw ang ting ting sa nag ga bagting sa akong kasing kasing ug
                saksi ang mga unggoy nga naglangoy langoy gilid sa hagunoy sa
                akong gugmang ikaw ra ang gi ila💘💖
              </p>
              <img src="assets/sunflower.jpg" alt="sunflower" />
              <div className="news_feed_description_title">
                <span>GitHub / Amabee</span>
                <p>
                  Who knew a little bit of Beating someone else could bring so
                  much joy? 😄 What’s your go-to weekend pick-me-up? Share your
                  fun ideas below—I’m always looking for new ways to spice up my
                  weekends! 🎉
                </p>
              </div>
            </div>

            <div className="likes_area">
              <div className="emojis">
                <img src="assets/emoji_like.png" alt="like" />
                <img src="assets/emoji_surprised.png" alt="surprised" />
                <img src="assets/emoji_angry.png" alt="angry" />
                <span>25</span>
              </div>
              <div className="comment_counts">
                <span>4 Comments</span> <span>13 Shares</span>
              </div>
            </div>

            <div className="divider">
              <hr />
            </div>
            <div className="likes_buttons">
              <div className="likes_buttons_links">
                <i className="far fa-thumbs-up"></i>
                <span>Like</span>
              </div>
              <div className="likes_buttons_links">
                <i className="far fa-comment-alt"></i>
                <span>Comment</span>
              </div>
              <div className="likes_buttons_links">
                <i className="fas fa-share"></i>
                <span>Share</span>
              </div>
            </div>
          </div>
        </div>
        <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
      </PerfectScrollbar>
    </div>
  );
};

// const RightContent = () => {
//   return (
//     <div class="content_right">
//       <div class="content_right_inner">
//         <div class="your_pages">
//           <h3>Your Pages</h3>
//           <i class="fas fa-ellipsis-h"></i>
//         </div>
//         <ul>
//           <li>
//             <a href="#">
//               <img
//                 class="your_page_logo"
//                 src="assets/codersbite.png"
//                 alt="codersbite"
//               />
//               <span>Codersbite</span>
//             </a>
//           </li>
//           <li class="content_right_small_text">
//             <a href="#">
//               <i class="fas fa-bell"></i>
//               <span>5 Notifications</span>
//             </a>
//           </li>
//           <li class="content_right_small_text">
//             <a href="#">
//               <i class="fas fa-bullhorn"></i>
//               <span>Create Promotion</span>
//             </a>
//           </li>
//         </ul>
//         <div class="content_right_divider"></div>
//         <div class="birthdays">
//           <h3>Birthdays</h3>
//         </div>
//         <ul>
//           <li>
//             <a href="#">
//               <img src="assets/gift-box.png" alt="gift-box" />
//               <span>Jary Garson's birthday is today</span>
//             </a>
//           </li>
//         </ul>
//         <div class="content_right_divider"></div>
//         <div class="contacts">
//           <h3>Contacts</h3>
//           <div class="contact_icons">
//             <i class="fas fa-search"></i>
//             <i class="fas fa-ellipsis-h"></i>
//           </div>
//         </div>
//         <ul>
//           <li>
//             <a href="#">
//               <img src="assets/avatar1.png" alt="user" />
//               <span>John Doe</span>
//             </a>
//           </li>
//           <li>
//             <a href="#">
//               <img src="assets/avatar2.png" alt="user" />
//               <span>Zorah Makey</span>
//             </a>
//           </li>
//           <li>
//             <a href="#">
//               <img src="assets/avatar5.png" alt="user" />
//               <span>Kero Janre</span>
//             </a>
//           </li>
//           <li>
//             <a href="#">
//               <img src="assets/avatar3.png" alt="user" />
//               <span>Ube Yuri</span>
//             </a>
//           </li>
//           <li>
//             <a href="#">
//               <img src="assets/avatar4.png" alt="user" />
//               <span>Hosaa Mora</span>
//             </a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

const TimeLine = () => {
  return (
    <div class="content">
      <LeftContent />
      <CenterContent />
      {/* <RightContent /> */}
      <FloatingSnapButton />
    </div>
  );
};

export default TimeLine;
