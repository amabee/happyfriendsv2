import React, { useState, useRef, useEffect, useCallback } from "react";
import "../../../public/css/fab.css";
import { MessageCircleIcon } from "lucide-react";

const DraggableFab = React.memo(({ disableDrag }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isFabActive, setIsFabActive] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const animationFrameId = useRef(null);
  const fabRef = useRef(null);

  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem("fabPosition"));
    if (savedPosition) {
      setPosition(savedPosition);
    } else {
      setPosition({
        top: window.innerHeight - 100,
        left: window.innerWidth - 80,
      });
    }
  }, []);

  useEffect(() => {
    if (unreadMessages === 0 && fabRef.current) {
      fabRef.current.classList.remove("bounce");
    }
  }, [unreadMessages]);

  console.log(unreadMessages);

  const handleMouseDown = (e) => {
    if (disableDrag) return;
    e.preventDefault();
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

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(() => {
        setPosition({
          top: e.clientY - offset.y,
          left: e.clientX - offset.x,
        });
      });
    },
    [isDragging, offset]
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      setIsDragging(false);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      snapToSide(e);
    },
    [isDragging]
  );

  const snapToSide = useCallback((e) => {
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
      setPosition((prev) => ({ ...prev, left: windowWidth - 100 }));
      fabRef.current.classList.remove("left");
      fabRef.current.classList.add("right");
    }

    fabRef.current.style.transition = "0.3s ease-in-out left";
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMouseMove(e);
        localStorage.setItem("fabPosition", JSON.stringify(position));
      }
    };

    const handleGlobalMouseUp = (e) => {
      if (isDragging) {
        handleMouseUp(e);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const Badge = ({ count }) => <div className="fab-badge">{count}</div>;

  return (
    <div
      ref={fabRef}
      className={`fab ${isFabActive ? "fab-active" : ""} ${
        unreadMessages > 0 ? "bounce" : ""
      }`}
      style={{
        top: position.top ? `${position.top}px` : window.innerHeight - 100,
        left: position.left ? `${position.left}px` : window.innerHeight - 80,
        fontSize: "25px",
        color: "black",
      }}
      onMouseDown={handleMouseDown}
    >
      <MessageCircleIcon />
      {unreadMessages > 0 && <Badge count={unreadMessages} />}
    </div>
  );
});

export default DraggableFab;
