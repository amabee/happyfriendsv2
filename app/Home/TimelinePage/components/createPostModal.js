import React, { useState, useRef } from "react";
import { Transition } from "@headlessui/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { createPost } from "../../lib/POST_PROCESS";
import { MainToastNotif } from "@/app/components/MainToast";

const CreatePostModal = ({ isOpen, onClose, uid }) => {
  if (!isOpen) return null;
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleCreatePostClick = async () => {
    const formData = new FormData();
    formData.append("operation", "createPost");

    // Add JSON data
    formData.append(
      "json",
      JSON.stringify({
        user_id: uid,
        content: postContent,
      })
    );

    if (selectedImages.length > 0) {
      selectedImages.forEach((image) => {
        formData.append("images[]", image);
      });
    }

    const { success, message, data } = await createPost({ formData });

    if (!success) {
      return alert(message);
    }

    MainToastNotif("Post Created!", "success");

    setPostContent("");
    setSelectedImages([]);
    onClose();
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages([...selectedImages, ...files]);
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <Transition
      show={isOpen}
      as="div"
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <Transition.Child
        as="div"
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <Transition.Child
        as="div"
        enter="transition-transform duration-300"
        enterFrom="scale-90"
        enterTo="scale-100"
        leave="transition-transform duration-300"
        leaveFrom="scale-100"
        leaveTo="scale-90"
        className="bg-gray-800 text-white max-w-2xl border border-gray-700 rounded-lg py-4 mx-4 relative"
        style={{ width: "100vw" }}
      >
        <div className="px-3 py-3 flex justify-center items-center border-b border-gray-700">
          <h2 className="text-xl font-bold text-center">Create Post</h2>
          <button
            className="bg-gray-700 hover:bg-gray-600 rounded-full p-1.5 inline-block absolute right-3"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-3 py-3">
          <div className="flex space-x-3 justify-start items-center">
            <div className="w-12 h-12 cursor-pointer rounded-full overflow-hidden">
              <a href="https://facebook.com/ShibbirAhmedRaihan">
                <img
                  className="w-full h-full object-cover"
                  src="./images/avatar.jpg"
                  alt="User Image"
                />
              </a>
            </div>

            <div className="flex flex-col space-y-0.5 items-start">
              <h2 className="font-semibold text-sm">Paul</h2>
              <div className="bg-gray-700 rounded-md px-1 flex space-x-0.5 py-1 items-center cursor-pointer">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <span className="font-semibold text-xs text-white">
                      Public
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 text-white border border-gray-700">
                    <DropdownMenuCheckboxItem>
                      Who can see this post?
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem className="hover:bg-gray-700 cursor-pointer">
                      Public
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem className="hover:bg-gray-700 cursor-pointer">
                      Friends Only
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem className="hover:bg-gray-700 cursor-pointer">
                      Only Me
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="my-4">
            <textarea
              rows="3"
              placeholder="What's on your mind, Paul?"
              className="w-full bg-transparent resize-none text-2xl 
              text-white outline-none 
              placeholder-gray-400 focus:placeholder-gray-500"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-8 h-8 border-2 border-white rounded-lg font-semibold flex justify-center items-center cursor-pointer">
              Aa
            </div>
            <div className="text-gray-600 hover:text-gray-500 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth=""
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="border border-gray-700 rounded-lg mt-5 px-3 py-2.5 flex justify-between items-center w-full max-w-4xl mx-auto">
            <div className="font-semibold cursor-pointer">Add to Your Post</div>
            <div className="flex space-x-0.5">
              <div
                className="bg-transparent hover:bg-gray-700 p-1 rounded-full transition-colors cursor-pointer"
                onClick={handleImageClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                multiple
                accept="image/*"
                className="hidden"
              />
              <div className="bg-transparent hover:bg-gray-700 p-1 rounded-full transition-colors cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="bg-transparent hover:bg-gray-700 p-1 rounded-full transition-colors cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="bg-transparent hover:bg-gray-700 p-1 rounded-full transition-colors cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="bg-transparent hover:bg-gray-700 p-1 rounded-full transition-colors cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-red-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="bg-transparent hover:bg-gray-700 p-1 rounded-full transition-colors cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-gray-500"
                  fill="none"
                  viewBox="0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {selectedImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Selected ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 
                      111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 
                      11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            className="w-full hover:bg-gray-700 bg-gray-600 mt-3 
            rounded-md py-2 text-gray-400 font-semibold text-sm"
            onClick={handleCreatePostClick}
          >
            Post
          </button>
        </div>
      </Transition.Child>
    </Transition>
  );
};

export default CreatePostModal;
