import React, { useState, useRef, useEffect, useCallback } from "react";
import "../../../public/css/fab.css";

const DraggableFab = React.memo(({ disableDrag }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isFabActive, setIsFabActive] = useState(false);
  const animationFrameId = useRef(null);
  const fabRef = useRef(null);

  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem("fabPosition"));
    if (savedPosition) {
      setPosition(savedPosition);
    } else {
      setPosition({
        top: window.innerHeight - 60,
        left: window.innerWidth - 60,
      });
    }
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (disableDrag) return;
    e.stopPropagation();
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    });
    if (fabRef.current) {
      fabRef.current.style.transition = "none";
    }
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (isDragging) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(() => {
        setPosition((prev) => ({
          top: e.clientY - offset.y,
          left: e.clientX - offset.x,
        }));
      });
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    snapToSide(e);
  };

  const snapToSide = useCallback((e) => {
    e.preventDefault();
    const windowWidth = window.innerWidth;
    const wrapperHeight = window.innerHeight;
    let currPositionX, currPositionY;

    if (e.type === "touchend") {
      currPositionX = e.changedTouches[0].clientX;
      currPositionY = e.changedTouches[0].clientY;
    } else {
      currPositionX = e.clientX;
      currPositionY = e.clientY;
    }

    if (currPositionY < 50) {
      setPosition((prev) => ({ ...prev, top: 50 }));
    } else if (currPositionY > wrapperHeight - 50) {
      setPosition((prev) => ({ ...prev, top: wrapperHeight - 50 }));
    }

    if (currPositionX < windowWidth / 2) {
      setPosition((prev) => ({ ...prev, left: 30 }));
      fabRef.current.classList.remove("right");
      fabRef.current.classList.add("left");
    } else {
      setPosition((prev) => ({ ...prev, left: windowWidth - 60 }));
      fabRef.current.classList.remove("left");
      fabRef.current.classList.add("right");
    }

    fabRef.current.style.transition = "0.3s ease-in-out left";
  }, []);

  useEffect(() => {
    const handleMouseMoveGlobal = (e) => {
      if (isDragging) {
        e.preventDefault();
        handleMouseMove(e);
        localStorage.setItem("fabPosition", JSON.stringify(position));
      }
    };

    const handleMouseUpGlobal = (e) => handleMouseUp(e);

    window.addEventListener("mousemove", handleMouseMoveGlobal);
    window.addEventListener("mouseup", handleMouseUpGlobal);

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      window.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, [isDragging, position]);

  return (
    <div
      ref={fabRef}
      className={`fab ${isFabActive ? "fab-active" : ""}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      +
    </div>
  );
});

export default DraggableFab;
