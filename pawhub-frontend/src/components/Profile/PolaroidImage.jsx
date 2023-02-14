const PolaroidImage = ({ src, alt, width, height }) => {
  return (
    <div className="polaroid">
      <img src={src} alt={alt} width={width} height={height} />
    </div>
  );
};

export default PolaroidImage;
