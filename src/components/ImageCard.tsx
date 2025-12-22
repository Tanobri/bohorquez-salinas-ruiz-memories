import { useState } from "react";

interface ImageCardProps {
  src: string;
  alt: string;
  onClick: () => void;
}

const ImageCard = ({ src, alt, onClick }: ImageCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="christmas-card cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={src}
          alt={alt}
          className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Corner decoration */}
        <div className="absolute top-2 right-2 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          ❄️
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
