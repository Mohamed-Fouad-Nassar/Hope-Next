"use client";

import Image from "next/image";
import { useState } from "react";

type TFallbackImageProps = { src: string; alt: string };

export default function FallbackImage({ src, alt }: TFallbackImageProps) {
  const [curSrc, setCurSrc] = useState(src);

  return (
    <Image
      fill
      src={curSrc}
      alt={alt}
      className="object-cover rounded-lg shadow-md"
      onError={() => setCurSrc("/image-1.jpg")}
    />
  );
}
