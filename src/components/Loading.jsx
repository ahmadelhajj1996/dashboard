import PropTypes from "prop-types";

function Loading({
  size = "md",
  text = "",
  fullScreen = false,
}) {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? "min-h-screen" : "py-[250px]"
      }`}
    >
      <div
        className={`
          animate-spin rounded-full
          border-gray-200 border-t-amber-950
          ${sizes[size]}
        `}
      />

      {text && (
        <p className="text-sm text-gray-500">
          {text}
        </p>
      )}
    </div>
  );
}

Loading.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default Loading;