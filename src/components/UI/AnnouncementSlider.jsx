import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const AnnouncementSlider = ({ announcements }) => {
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
    <div className="relative">
      {announcements.length === 0 ? (
        <div className="text-slate-600">No announcements available</div>
      ) : (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white transition ml-4 cursor-pointer"
            aria-label="Scroll Left"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-8 py-2 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx="true">{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {announcements.map((item, idx) => (
              <div
                key={idx}
                className="min-w-[280px] max-w-[90%] bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      item.announcement_by.picture ||
                      "https://via.placeholder.com/150"
                    }
                    alt={item.announcement_by.name}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
                  />
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-blue-900 text-sm truncate">
                      {item.announcement_by.name}
                    </h2>
                    <p className="text-xs text-gray-500 truncate">
                      {item.announcement_by.designation?.join(", ") ||
                        "No Designation"}
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {item.description}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(item.announcement_date).toLocaleDateString("en-GB")}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white transition mr-4 cursor-pointer"
            aria-label="Scroll Right"
          >
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </button>
        </>
      )}
    </div>
  );
};

export default AnnouncementSlider;
