import React from "react";
import { FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const TwitterShareButton: React.FC<{
  text: string;
  hashtags: string;
  image: string;
}> = ({ text, hashtags, image }) => {
  const encodedText = encodeURIComponent(text);
  const encodedHashtags = encodeURIComponent(hashtags);
  const url = encodeURIComponent(image || "https://www.snapstoryai.com");

  return (
    <>
      <Button
        onClick={() => {
          window.open(
            `https://twitter.com/intent/tweet?text=${encodedText}&hashtags=${encodedHashtags}&url=${url}`,
            "_blank"
          );
        }}
        variant="outline">
        <FaTwitter className="mr-3 text-xl" />
        <span className="font-semibold">Share on Twitter</span>
      </Button>
    </>
  );
};

export default TwitterShareButton;
