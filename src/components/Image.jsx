import PropTypes from 'prop-types';

const Image = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  objectFit = 'cover',
  rounded = false,
  ...props 
}) => {
  // Use inline styles instead of dynamic Tailwind classes
  const imageStyle = {
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
    objectFit: objectFit,
  };
  
  const roundedClass = rounded ? 'rounded-lg' : '';
  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  }[objectFit] || 'object-cover';

  return (
    <img
      src={src}
      alt={alt}
      style={imageStyle}
      className={`${objectFitClass} ${roundedClass} ${className}`}
      {...props}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
  rounded: PropTypes.bool,
};

export default Image;