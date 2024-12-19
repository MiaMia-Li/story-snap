"use client";
import { useEffect, useRef, useState } from "react";

export function InfiniteScroll({ children }: { children: React.ReactNode }) {
  const [duplicateCount] = useState(3);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current && !isHovered) {
        if (
          scrollRef.current.scrollLeft >=
          (scrollRef.current.scrollWidth - scrollRef.current.clientWidth) / 2
        ) {
          scrollRef.current.scrollLeft = 0;
        } else {
          scrollRef.current.scrollLeft += 1;
        }
      }
    };

    const intervalId = setInterval(scroll, 30);
    return () => clearInterval(intervalId);
  }, [isHovered]);

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-hidden overflow-y-hidden h-full items-center gap-6 py-4 px-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {Array.from({ length: duplicateCount }).map((_, index) => (
        <div key={index} className="flex gap-6 animate-scroll">
          {children}
        </div>
      ))}
    </div>
  );
}
