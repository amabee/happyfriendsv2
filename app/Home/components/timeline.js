import React from "react";
import FloatingSnapButton from "./draggableFab";
import ProfileCard from "./ProfileCard";
import StoriesCarousel from "./StoryCarousel";

const LeftContent = () => {
  return (
    <div class="content_left">
      <ProfileCard />
    </div>
  );
};

const CenterContent = () => {
  return (
    <div class="content_center">
      <div className="center-scroll-container">
       <StoriesCarousel/>
        <div class="media_container">
          <div class="share">
            <div class="share_upSide">
              <img src="assets/profile.png" alt="profile" />
              <input type="text" placeholder="What's on your mind, Ogeday?" />
            </div>
            <hr />
            <div class="share_downSide">
              <div class="share_downSide_link">
                <i class="fas fa-video live-video-icon"></i>
                <span>Live Video</span>
              </div>
              <div class="share_downSide_link">
                <i class="fas fa-photo-video photo-video-icon"></i>
                <span>Photo/Video</span>
              </div>
              <div class="share_downSide_link">
                <i class="far fa-grin-alt feeling-icon"></i>
                <span>Feeling/Activity</span>
              </div>
            </div>
          </div>
          {/* <!-- news feed --> */}
          <div class="news_feed">
            <div class="news_feed_title">
              <img src="assets/user.png" alt="user" />
              <div class="news_feed_title_content">
                <p>Codersbite Magazine</p>
                <span>
                  12h . <i class="fas fa-globe-americas"></i>
                </span>
              </div>
            </div>
            <div class="news_feed_description">
              <p class="news_feed_subtitle">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                esse cum id vero odit tempora dicta. Saepe corporis voluptatibus
                laboriosam?
              </p>
              <img src="assets/sunflower.jpg" alt="sunflower" />
              <div class="news_feed_description_title">
                <span>YOUTUBE / CODERSBITE</span>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt repudiandae exercitationem mollitia, suscipit labore
                  rem reiciendis distinctio atque totam facere placeat officia
                  ea quia? Atque.
                </p>
              </div>
            </div>

            <div class="likes_area">
              <div class="emojis">
                <img src="assets/emoji_like.png" alt="like" />
                <img src="assets/emoji_surprised.png" alt="surprised" />
                <img src="assets/emoji_angry.png" alt="angry" />
                <span>25</span>
              </div>
              <div class="comment_counts">
                <span>4 Comments</span>
                <span>13 Shares</span>
              </div>
            </div>

            <div class="divider">
              <hr />
            </div>
            <div class="likes_buttons">
              <div class="likes_buttons_links">
                <i class="far fa-thumbs-up"></i>
                <span>Like</span>
              </div>
              <div class="likes_buttons_links">
                <i class="far fa-comment-alt"></i>
                <span>Comment</span>
              </div>
              <div class="likes_buttons_links">
                <i class="fas fa-share"></i>
                <span>Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
