import { Eye, X } from "lucide-react";
import { useEffect, useState } from "react";

function Imagegallery({ images = [], onDelete }) {
  const [selectedImage, setSelectedImage] = useState(null);



  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    } else {
      setSelectedImage(null);
    }
  }, [images]);

  return (
    <div className="mt-4">
      {images.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border bg-gray-50 text-sm text-gray-500">
          No images found
        </div>
      ) : (
        <>
          {/* MAIN PREVIEW */}
          {selectedImage && (
            <div className="mb-6 flex justify-center">
              <img
                src={selectedImage.path_url}
                alt="selected"
                className="h-[350px] w-[350px] rounded-lg border object-cover shadow-md transition"
              />
            </div>
          )}

          {/* THUMBNAILS GRID */}
          <div className="grid grid-cols-6 gap-4">
            {images.map((item) => {
              const isActive = selectedImage?.id === item.id;

              return (
                <div
                  key={item.id}
                  className={`group relative cursor-pointer overflow-hidden rounded-md border bg-white shadow-sm transition hover:shadow-md ${
                    isActive ? " border" : ""
                  }`}
                  onClick={() => setSelectedImage(item)}
                >
                  {/* Image */}
                  <img
                    src={item.path_url}
                    alt="variation"
                    className="h-24 w-24 object-cover transition duration-300 group-hover:scale-105"
                  />



                  {/* DELETE ICON */}
                  {/* <div
                    onClick={(e) => {
                      e.stopPropagation(); // IMPORTANT: prevent selecting image
                      onDelete(item);
                    }}
                    className="absolute right-1 top-1 cursor-pointer rounded-md bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100"
                  >
                    <X size={16} />
                  </div> */}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Imagegallery;


