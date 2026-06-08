"use client";
import { useState } from "react";
import Image from "next/image";

type SafeImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  skeletonClassName?: string;
};

export default function SafeImage({
  src,
  alt,
  className = "",
  fill,
  width,
  height,
  priority,
  skeletonClassName = "",
}: SafeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const showSkeleton = !loaded || error;

  return (
    <div className={`relative ${className}`}>
      {showSkeleton && (
        <div
          className={`animate-pulse bg-gray-200 ${skeletonClassName || className}`}
          style={fill ? undefined : { width, height }}
        />
      )}
      {!error && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          priority={priority}
          className={`${className} ${!loaded ? "invisible" : ""}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          unoptimized={src.startsWith("http") && !src.includes("intertex-storage")}
        />
      )}
    </div>
  );
}
