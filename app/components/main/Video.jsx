import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Video() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="video-container m-auto max-w-[1440px] my-[50px]">
      {isClient && (
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <ReactPlayer
            url="https://youtu.be/7oBZ8sBjdyQ?si=STSsx3E0Dbc6dAdl"
            playing
            muted
            controls
            width="100%"
            height="100%" 
            className="absolute top-0 left-0"
          />
        </div>
      )}
    </div>
  );
}
