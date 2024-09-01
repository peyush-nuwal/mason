import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const VideoPlayer = ({ src ,style,video}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // When 50% of the video is visible
  });

  useEffect(() => {
    if (inView) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [inView]);

  return (
    <div ref={ref} className="relative my-8 md:my-24" style={style}>
      <video
        ref={videoRef}
        src="src/assets/sneakers.mp4"
        className={`w-full ${video}`}
        loop
        muted
        preload="metadata"
      />
      {!isPlaying && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            className="bg-white text-black py-2 px-4 rounded-md"
            onClick={() => {
              videoRef.current.play();
              setIsPlaying(true);
            }}
          >
            Play Video
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default VideoPlayer;
