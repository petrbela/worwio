import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";

const VideoPage = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<ReturnType<typeof videojs>>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectedTrack, setSelectedTrack] = useState(0);

  const videoUrl =
    router.query.videoUrl || "https://www.youtube.com/watch?v=BU1tX88qUBA";
  const audioUrls = ["/output_en.wav", "/output_de.wav", "/output_es.wav"];

  useEffect(() => {
    if (videoUrl.includes("youtube.com")) {
      playerRef.current = videojs(videoRef.current, {
        techOrder: ["youtube"],
        sources: [
          {
            type: "video/youtube",
            src: videoUrl,
          },
        ],
        youtube: {
          ytControls: 0,
        },
      });
    } else {
      playerRef.current = videojs(videoRef.current);
      playerRef.current.src({
        src: videoUrl,
        type: "video/mp4",
      });
    }

    const handleVideoTimeUpdate = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = playerRef.current.currentTime();
      }
    };

    const handleVideoPause = () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };

    const handleVideoPlay = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    };

    const player = playerRef.current as any;

    player.on("play", handleVideoPlay);
    player.on("seeked", handleVideoTimeUpdate);
    player.on("pause", handleVideoPause);

    return () => {
      player.off("play", handleVideoPlay);
      player.off("seeked", handleVideoTimeUpdate);
      player.off("pause", handleVideoPause);
    };
  }, [videoUrl]);

  const handleAudioTrackChange = (index) => {
    setSelectedTrack(index);
    if (index === 0) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.muted = true;
      playerRef.current.muted(false);
    } else {
      (audioRef.current as any).src = audioUrls[index - 1];
      audioRef.current.currentTime = playerRef.current.currentTime();
      audioRef.current.muted = false;
      audioRef.current.play();
      playerRef.current.muted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-lg w-full">
        <div data-vjs-player>
          <video
            ref={videoRef}
            className="video-js vjs-big-play-centered"
            width="640"
            height="360"
            controls
          ></video>
        </div>
        <audio muted ref={audioRef} style={{ display: "none" }}></audio>
        <div className="mt-4">
          <label className="text-white font-bold">Audio track:</label>
          <div className="mt-2 flex items-center space-x-4">
            {["Czech", "English", "German", "Spanish"].map((label, index) => (
              <div
                key={index}
                className={`rounded-full ${
                  index === selectedTrack
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                } px-3 py-1 font-medium text-sm cursor-pointer`}
                onClick={() => handleAudioTrackChange(index)}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
