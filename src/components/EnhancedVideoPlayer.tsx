import React, { useState, useRef, useEffect } from "react";
import { Music, Play, Pause, Volume2, VolumeX, Heart } from "lucide-react";
import Hls from "hls.js";

export const MOCK_AUDIO_TRACKS = [
  { id: "none", name: "No Audio (Original Sound)", artist: "" },
  { id: "afrobeat", name: "Trending Afrobeat Beat 🥁", artist: "Yusuf S. Beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "lofi", name: "Focus Lofi Work Chill ☕", artist: "ESTARR Audio", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { id: "startup", name: "Energetic Talent Pitch ⚡", artist: "Startup Hype", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { id: "acoustic", name: "Calm Acoustic Strings 🎸", artist: "Folklore Duo", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
];

export const OVERLAY_TEXT_STYLES = [
  { id: "classic-white", name: "Classic White", classes: "text-white font-sans font-extrabold tracking-tight drop-shadow-lg text-shadow-md text-sm md:text-base text-center" },
  { id: "modern-badge", name: "Modern Badge", classes: "bg-black/80 text-emerald-400 font-mono px-3.5 py-1.5 rounded-xl border border-emerald-500/30 text-center text-xs md:text-sm font-bold tracking-wide shadow-lg shadow-emerald-950/20" },
  { id: "neon-glow", name: "Neon Glow", classes: "text-rose-500 font-display font-extrabold animate-pulse drop-shadow-[0_0_8px_rgba(244,63,94,0.8)] text-sm md:text-lg text-center uppercase tracking-wide" },
  { id: "sticker", name: "Sticker Tag", classes: "bg-amber-400 text-slate-900 font-sans px-4 py-2 font-black rotate-[-2deg] uppercase tracking-wider rounded-xl border-2 border-slate-950 shadow-md text-xs md:text-sm text-center" },
];

interface EnhancedVideoPlayerProps {
  videoUrl: string;
  poster?: string;
  autoPlay?: boolean;
  filter?: string;
  playbackSpeed?: string;
  audioTrackName?: string;
  textOverlay?: string;
  textStyleId?: string;
  isMutedDefault?: boolean;
  onLike?: () => void;
  className?: string;
}

export function EnhancedVideoPlayer({
  videoUrl,
  poster,
  autoPlay = true,
  filter = "none",
  playbackSpeed = "1x",
  audioTrackName,
  textOverlay,
  textStyleId = "classic-white",
  isMutedDefault = true,
  onLike,
  className = "",
}: EnhancedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(isMutedDefault);
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [simulatedTime, setSimulatedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to handle autoplay when in view
  useEffect(() => {
    if (!containerRef.current || !autoPlay) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.6 } // Play when 60% of the video is visible
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [autoPlay]);

  // Sync video play/pause with visibility
  useEffect(() => {
    if (!videoRef.current || !autoPlay) return;

    if (isVisible && !hasError) {
      videoRef.current.play().catch(err => {
        console.log("Autoplay failed:", err);
        setIsPlaying(false);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isVisible, hasError, autoPlay]);

  // Reset loading and error states on source URL change
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setSimulatedTime(0);
    
    let hls: Hls | null = null;
    const video = videoRef.current;

    if (!video) return;

    const setupPlayback = () => {
      if (autoPlay && isVisible) {
        video.play()
          .then(() => {
            setIsPlaying(true);
            setHasError(false);
          })
          .catch((err) => {
            console.log("Autoplay blocked or URL errored:", err);
            setIsPlaying(false);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        video.pause();
        setIsPlaying(false);
        setIsLoading(false);
      }
    };

    if (Hls.isSupported() && videoUrl.includes(".m3u8")) {
      hls = new Hls({
        startLevel: -1, // Automatic adaptive bitrate
        capLevelToPlayerSize: true, // Optimize quality based on element size
      });
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setupPlayback();
      });
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              hls?.destroy();
              setHasError(true);
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl") && videoUrl.includes(".m3u8")) {
      // Native HLS support (Safari)
      video.src = videoUrl;
      video.addEventListener("loadedmetadata", setupPlayback);
    } else {
      // Standard video (MP4) fallback
      video.src = videoUrl;
      const timer = setTimeout(setupPlayback, 50);
      return () => clearTimeout(timer);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (video.canPlayType("application/vnd.apple.mpegurl") && videoUrl.includes(".m3u8")) {
        video.removeEventListener("loadedmetadata", setupPlayback);
      }
    };
  }, [videoUrl, autoPlay]);

  // Handle ticking simulated time if we are using the fallback player
  useEffect(() => {
    let interval: any;
    if (hasError && isPlaying) {
      interval = setInterval(() => {
        setSimulatedTime((prev) => (prev + 0.5) % 15); // Loop every 15s
      }, 500);
    }
    return () => clearInterval(interval);
  }, [hasError, isPlaying]);

  // Parse speed helper
  const speedMultiplier = parseFloat(playbackSpeed.replace("x", "")) || 1;

  // Track lookup helper
  const audioTrack = MOCK_AUDIO_TRACKS.find(
    (track) =>
      audioTrackName &&
      (audioTrackName.toLowerCase().includes(track.name.toLowerCase()) ||
        audioTrackName.toLowerCase().includes(track.id.toLowerCase()))
  );

  const hasBackgroundMusic = audioTrack && audioTrack.id !== "none";

  // Sync playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speedMultiplier;
    }
  }, [speedMultiplier, isPlaying]);

  // Sync mute
  useEffect(() => {
    if (videoRef.current) {
      // If we have background music, we duck the video volume
      videoRef.current.muted = isMuted;
      videoRef.current.volume = hasBackgroundMusic ? 0.2 : 1.0;
    }
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted, hasBackgroundMusic]);

  // Handle play/pause sync
  const handlePlay = () => {
    setIsPlaying(true);
    setHasError(false);
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.playbackRate = speedMultiplier;
    }
    if (audioRef.current) {
      audioRef.current.currentTime = videoRef.current ? videoRef.current.currentTime % 30 : 0;
      audioRef.current.play().catch((err) => console.log("Audio play error:", err));
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const togglePlayPause = () => {
    if (hasError) {
      const nextPlaying = !isPlaying;
      setIsPlaying(nextPlaying);
      if (nextPlaying) {
        if (audioRef.current) {
          audioRef.current.play().catch((err) => console.log("Audio play error:", err));
        }
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }
      return;
    }

    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
          .catch((err) => {
            console.log("Video element play failed:", err);
            // Do not hide the video element on play failure
          });
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || hasError) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedTime = (x / rect.width) * duration;
    videoRef.current.currentTime = clickedTime;
    setCurrentTime(clickedTime);
  };

  // Double-tap to like trigger (TikTok style)
  const handleTapGesture = (e: React.MouseEvent) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      // Trigger TikTok like animation
      setShowHeartPop(true);
      if (onLike) {
        onLike();
      }
      setTimeout(() => setShowHeartPop(false), 800);
    } else {
      togglePlayPause();
    }
    setLastTap(now);
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Resolve style details
  const overlayStyle = OVERLAY_TEXT_STYLES.find((s) => s.id === textStyleId) || OVERLAY_TEXT_STYLES[0];

  return (
    <div
      ref={containerRef}
      onClick={handleTapGesture}
      className={`relative bg-black rounded-xl overflow-hidden group cursor-pointer shadow-inner flex items-center justify-center select-none ${className}`}
    >
      {/* Hidden Audio for Sound Synced Overlays */}
      {hasBackgroundMusic && audioTrack?.url && (
        <audio
          ref={audioRef}
          src={audioTrack.url}
          loop
          preload="auto"
        />
      )}

      {/* Primary Video Container */}
      <video
        ref={videoRef}
        poster={poster}
        loop
        playsInline
        muted={isMuted}
        preload="auto"
        referrerPolicy="no-referrer"
        onLoadStart={() => {
          setIsLoading(true);
          setHasError(false);
        }}
        onCanPlay={() => {
          setIsLoading(false);
          setHasError(false);
        }}
        onLoadedData={() => {
          setIsLoading(false);
          setHasError(false);
        }}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration || 15);
          }
        }}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        onPlay={handlePlay}
        onPause={handlePause}
        style={{ filter: filter }}
        className={`w-full h-full object-contain max-h-[480px] mx-auto bg-black transition-all duration-300 ${
          hasError ? "hidden" : "block"
        }`}
      />

      {/* High-Reliability Simulated Black Fallback Container */}
      {hasError && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden transition-all duration-300">
          {/* Poster image blurred as deep black backdrop */}
          {poster ? (
            <img
              src={poster}
              alt="Artisan Poster Fallback"
              referrerPolicy="no-referrer"
              style={{ filter: `${filter} blur(4px) brightness(0.25)` }}
              className={`absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-transform duration-1000 ${
                isPlaying ? "scale-105" : "scale-100"
              }`}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-black" />
          )}
        </div>
      )}

      {/* Loading Spinner Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs z-20 pointer-events-none">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Centered Play Button / Retry Overlay when paused or errored */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors z-20 pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-white/95 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition-transform duration-300 scale-100 hover:scale-110 pointer-events-auto cursor-pointer">
            <Play className="w-7 h-7 fill-slate-900 ml-1" />
          </div>
          {hasError && (
            <div className="mt-3 bg-black/75 px-3 py-1.5 rounded-xl border border-slate-700 backdrop-blur-sm relative z-10 pointer-events-none">
              <span className="text-xs text-slate-300 font-medium">Click to retry playback</span>
            </div>
          )}
        </div>
      )}

      {/* Double Tap TikTok Heart Pop Effect */}
      {showHeartPop && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="animate-ping duration-300 absolute">
            <Heart className="w-24 h-24 text-rose-500 fill-rose-500 opacity-60" />
          </div>
          <div className="animate-bounce duration-500">
            <Heart className="w-20 h-20 text-rose-600 fill-rose-600 drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]" />
          </div>
        </div>
      )}

      {/* Floating Instagram/TikTok Text Overlay */}
      {textOverlay && textOverlay.trim() !== "" && (
        <div className="absolute inset-x-4 top-10 flex justify-center pointer-events-none z-10 px-4">
          <div className={`${overlayStyle.classes} py-2 px-3 rounded-xl max-w-[85%] break-words shadow-md`}>
            {textOverlay}
          </div>
        </div>
      )}

      {/* Custom Control Bar & Indicators Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between z-10 pointer-events-auto">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
            className="text-white hover:text-emerald-400 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
          </button>

          {/* Metadata Display */}
          <div className="flex flex-col gap-0.5 text-[10px] text-slate-300">
            {audioTrack && audioTrack.id !== "none" && (
              <span className="flex items-center gap-1 font-semibold text-emerald-400 animate-pulse">
                <Music className="w-3 h-3" />
                <span className="truncate max-w-[120px]">{audioTrack.name}</span>
              </span>
            )}
            {playbackSpeed !== "1x" && (
              <span className="bg-purple-500/80 text-slate-900 font-mono font-bold px-1.5 py-0.2 rounded w-fit">
                Speed: {playbackSpeed}
              </span>
            )}
          </div>
        </div>

        {/* Floating vinyl spinner on the right (Only if background audio is active) */}
        {hasBackgroundMusic && (
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-slate-9000 italic">Music Sync</span>
            <div
              className={`w-7 h-7 bg-slate-900 border border-emerald-500/50 rounded-full flex items-center justify-center relative shadow ${
                isPlaying ? "animate-spin [animation-duration:4s]" : ""
              }`}
            >
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-black rounded-full" />
              </div>
              <Music className="w-2.5 h-2.5 text-emerald-400 absolute top-0.5 right-0.5 animate-bounce [animation-duration:1s]" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Timeline Progress Bar (Interactive) */}
      <div 
        onClick={handleSeek}
        className="absolute bottom-0 inset-x-0 h-1.5 bg-white/10 z-20 cursor-pointer group/progress"
      >
        <div
          style={{
            width: `${
              hasError
                ? (simulatedTime / 15) * 100
                : duration > 0
                ? (currentTime / duration) * 100
                : 0
            }%`,
          }}
          className="h-full bg-emerald-500 shadow-md transition-all duration-200 relative"
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform" />
        </div>
      </div>

      {/* Persistent Sound Toggle Button & Tap to Unmute Hint */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-auto flex flex-col items-end gap-2">
        {isMuted && isPlaying && !hasError && (
          <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[9px] text-white font-bold animate-bounce border border-white/10 uppercase tracking-tighter">
            Tap to unmute
          </div>
        )}
        <button
          type="button"
          onClick={toggleMute}
          className="bg-black/60 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-black/80 transition-all shadow-lg border border-white/20 hover:scale-110 flex items-center justify-center"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-300" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>
      </div>

      {/* Persistent mini sound / speed badges when control bar is hidden */}
      <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none group-hover:opacity-0 transition-opacity z-10">
        {audioTrack && audioTrack.id !== "none" && (
          <div className="bg-black/60 backdrop-blur-sm text-emerald-400 text-[9px] font-bold px-2 py-1 rounded-xl border border-emerald-500/20 flex items-center gap-1 shadow">
            <Music className="w-2.5 h-2.5" />
            <span>Sound synced</span>
          </div>
        )}
        {playbackSpeed !== "1x" && (
          <div className="bg-black/60 backdrop-blur-sm text-amber-400 text-[9px] font-bold px-2 py-1 rounded-xl border border-amber-500/20 flex items-center gap-1 shadow font-mono">
            <span>⚡ Speed: {playbackSpeed}</span>
          </div>
        )}
      </div>
    </div>
  );
}
