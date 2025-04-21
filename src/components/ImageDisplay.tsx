
import React, { useEffect, useRef } from 'react';

interface ImageDisplayProps {
  src: string;
  alt: string;
  caption?: string;
  fullHeight?: boolean;
  delay?: number;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ 
  src, 
  alt, 
  caption, 
  fullHeight = false,
  delay = 0 
}) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={imageRef} 
      className={`section-transition ${fullHeight ? 'h-screen' : 'h-auto'} w-full overflow-hidden`}
    >
      <div className="image-container h-full">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover" 
        />
      </div>
      {caption && (
        <div className="mt-4 px-8 md:px-16">
          <p className="text-xs md:text-sm text-black/70 tracking-wider">{caption}</p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
