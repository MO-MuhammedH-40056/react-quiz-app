import React, { useEffect, useState, useRef } from "react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="music-toggle">
      <audio
        ref={audioRef}
        loop
        src="/src/assets/music.mp3"
        preload="auto"
      />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Music On 🎵" : "Music Off 🔇"}
      </button>
    </div>
  );
}
