import { MediaFragment } from "@/lib/basehub";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MediaProps {
  media: MediaFragment;
  alt?: string | ((originalAlt?: string) => string);
  className?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  fill?: boolean;
  videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
}

export function Media({
  media,
  alt,
  className,
  sizes,
  quality = 100,
  priority = false,
  fill = false,
  videoProps = {
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
  },
}: MediaProps) {
  // Helper to resolve alt text
  const getAltText = (originalAlt?: string): string => {
    if (typeof alt === "function") {
      return alt(originalAlt);
    }
    return alt || originalAlt || "";
  };

  if (media.__typename === "BlockImage") {
    const imageData = media as unknown as {
      url: string;
      alt: string;
      width: number;
      height: number;
      blurDataURL: string;
    };

    const resolvedAlt = getAltText(imageData.alt);

    return (
      <Image
        src={imageData.url}
        alt={resolvedAlt}
        width={imageData.width}
        height={imageData.height}
        blurDataURL={imageData.blurDataURL}
        placeholder="blur"
        fill={fill}
        className={cn("object-cover", className)}
        sizes={sizes}
        quality={quality}
        priority={priority}
      />
    );
  }

  if (media.__typename === "BlockVideo") {
    const videoData = media as unknown as { url: string };

    return (
      <video
        src={videoData.url}
        className={cn("object-cover", className)}
        {...videoProps}
      />
    );
  }

  // Fallback for unsupported media types
  return (
    <div className={cn("flex items-center justify-center bg-muted", className)}>
      <span className="text-muted-foreground">Unsupported media type</span>
    </div>
  );
}
