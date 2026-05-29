import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Imagegallery({
  images = [],
  variations = [],
  onClick,
  autoSlideInterval = 4000,
}) {
  const [current, setCurrent] = useState(0);

  const goTo = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval]);

  if (!images.length) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-100 rounded-2xl">
        لا بوجد صور لعرضها
      </div>
    );
  }

  const currentImage =
    typeof images[current] === "string"
      ? images[current]
      : images[current]?.path_url;

  return (
    <div className="flex flex-col gap-y-6">
      {/* MAIN IMAGE */}
      <div className="relative w-[90%]  mx-auto rounded-full">
        <div className="relative overflow-hidden rounded-sm bg-gray-100 group">
          {currentImage ? (
            <img
              src={currentImage ?? null}
              alt={`product-${current}`}
              className="w-full h-[350px] object-cover transition-all duration-500"
            />
          ) : null}
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10 tag px-4 py-2 ">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-cyan-500 scale-125"
                  : "bg-cyan-500/50 hover:bg-cyan-500/80"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 px-6">
        {variations.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer rounded-md border bg-white shadow-sm hover:shadow-md "
            onClick={() => onClick?.(item)}
          >
            <img
              src={item.path_url}
              alt="variation"
              className="h-16 w-16 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

Imagegallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        path_url: PropTypes.string,
      }),
    ]),
  ),

  variations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      path_url: PropTypes.string,
    }),
  ),

  onClick: PropTypes.func,

  autoSlideInterval: PropTypes.number,
};

export default Imagegallery;
