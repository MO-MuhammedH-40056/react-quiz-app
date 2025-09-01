import React, { useEffect, useState, useRef } from "react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio play prevented:", error);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="music-toggle">
      <audio ref={audioRef} loop src="/music.mp3" preload="auto" />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Music On 🎵" : "Music Off 🔇"}
      </button>
    </div>
  );
}
