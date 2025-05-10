import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PendingApprovals = () => {
  const approvals = [1, 2, 3, 4, 5, 6, 7, 8];
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center mb-2 px-1">
        <h3 className="text-sm font-semibold text-gray-800">
          Pending Approvals
        </h3>
        <a
          href="#"
          className="text-blue-600 text-xs font-medium hover:underline"
        >
          See all &gt;
        </a>
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white transition"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-8 py-2 scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx="true">{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {approvals.map((_, index) => (
          <div
            key={index}
            className="min-w-[240px] sm:min-w-[280px] max-w-[90%] bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-3"
          >
            <img
              src={`https://randomuser.me/api/portraits/men/${index + 30}.jpg`}
              alt="User"
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-xs truncate">
                John Doe #{index + 1}
              </p>
              <p className="text-xs text-gray-500 truncate">
                Acme Corporation Pvt Ltd
              </p>
              <p className="text-[10px] text-gray-400">2 days ago</p>
            </div>
            <button
              className="text-blue-500 text-xl font-bold hover:text-blue-700"
              title="Options"
            >
              ⋯
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white transition"
      >
        <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
      </button>
    </div>
  );
};

export default PendingApprovals;
