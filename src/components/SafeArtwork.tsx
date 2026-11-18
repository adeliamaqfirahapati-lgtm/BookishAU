import { useState } from 'react';

interface SafeArtworkProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
}

export function SafeArtwork({ src, fallbackSrc, alt, className = '' }: SafeArtworkProps) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);

  return (
    <img
      src={currentSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => {
        if (currentSrc !== fallbackSrc && fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
      className={className}
    />
  );
}
