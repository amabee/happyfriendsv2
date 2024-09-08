import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const StoriesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stories = [
    { id: 1, imageUrl: "https://picsum.photos/id/137/110/200", alt: "Story 1" },
    { id: 2, imageUrl: "https://picsum.photos/id/247/110/200", alt: "Story 2" },
    { id: 3, imageUrl: "https://picsum.photos/id/522/110/200", alt: "Story 3" },
    { id: 4, imageUrl: "https://picsum.photos/id/523/110/200", alt: "Story 4" },
    { id: 5, imageUrl: "https://picsum.photos/id/524/110/200", alt: "Story 5" },
    { id: 6, imageUrl: "https://picsum.photos/id/525/110/200", alt: "Story 6" },
    { id: 7, imageUrl: "https://picsum.photos/id/526/110/200", alt: "Story 7" },
    { id: 8, imageUrl: "https://picsum.photos/id/527/110/200", alt: "Story 8" },
    { id: 9, imageUrl: "https://picsum.photos/id/528/110/200", alt: "Story 9" },
    { id: 10, imageUrl: "https://picsum.photos/id/529/110/200", alt: "Story 10" },
  ];

  const visibleStoriesCount = 5;

  // Create debounced versions of nextSlide and prevSlide
  const debouncedNextSlide = debounce((e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleStoriesCount >= stories.length
        ? stories.length - visibleStoriesCount
        : prevIndex + 1
    );
  }, 300);

  const debouncedPrevSlide = debounce((e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? 0 : prevIndex - 1
    );
  }, 300);

  return (
    <div className="stories-carousel">
      <button onClick={debouncedPrevSlide} className="carousel-button prev">
        <ChevronLeft size={24} />
      </button>
      <div className="stories-wrapper">
        <div
          className="stories-container"
          style={{
            transform: `translateX(-${
              currentIndex * (100 / visibleStoriesCount)
            }%)`,
          }}
        >
          {stories.map((story) => (
            <div key={story.id} className="story-item">
              <img src={story.imageUrl} alt={story.alt} />
            </div>
          ))}
        </div>
      </div>
      <button onClick={debouncedNextSlide} className="carousel-button next">
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default StoriesCarousel;
