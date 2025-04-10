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
    <div className="relative w-full mt-8">
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="text-xl font-semibold text-gray-800">
          Pending Approvals
        </h3>
        <a
          href="#"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          See all &gt;
        </a>
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 backdrop-blur rounded-full shadow-md hover:bg-white transition"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto px-12 py-3 scroll-smooth"
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
            className="min-w-[280px] sm:min-w-[320px] max-w-[90%] bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-5"
          >
            <img
              src={`https://randomuser.me/api/portraits/men/${index + 30}.jpg`}
              alt="User"
              className="w-14 h-14 rounded-full object-cover border border-gray-200"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">
                John Doe #{index + 1}
              </p>
              <p className="text-sm text-gray-500 truncate">
                Acme Corporation Pvt Ltd
              </p>
              <p className="text-xs text-gray-400">2 days ago</p>
            </div>
            <button
              className="text-blue-500 text-2xl font-bold hover:text-blue-700"
              title="Options"
            >
              ⋯
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 backdrop-blur rounded-full shadow-md hover:bg-white transition"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default PendingApprovals;
