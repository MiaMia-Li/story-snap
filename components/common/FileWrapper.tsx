// 视频组件
import Image from "next/image";
import DownloadButton from "../story/DownloadButton";
const VideoPlayer = ({ src }: { src: string }) => (
  <div className="relative aspect-video rounded-lg overflow-hidden">
    <video
      className="w-full h-full object-cover"
      controls
      preload="metadata"
      playsInline>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

// 图片组件
const ImageComponent = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative aspect-square overflow-hidden rounded-lg">
    <img
      src={src}
      alt={alt}
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
    <div className="absolute bottom-0 right-0 z-10">
      <DownloadButton imageUrl={src} />
    </div>
  </div>
);

export { VideoPlayer, ImageComponent };
