import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, Pause } from "lucide-react";

interface VoiceRecorderProps {
  onRecordComplete: (audioUrl: string, duration: number) => void;
  compact?: boolean;
}

export function VoiceRecorder({ onRecordComplete, compact = false }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        onRecordComplete(url, recordingTime);
        setRecordingTime(0);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone", err);
      alert("Could not access microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isRecording) {
    return (
      <div className={`flex items-center gap-2 ${compact ? 'text-[10px]' : 'text-xs'} text-rose-500 font-medium bg-rose-50 px-2.5 py-1.5 rounded-full border border-rose-200 animate-pulse shrink-0`}>
        <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
        <span className="font-mono">{formatTime(recordingTime)}</span>
        <button type="button" onClick={stopRecording} className="ml-1 bg-rose-100 hover:bg-rose-200 p-0.5 rounded text-rose-700 transition-colors cursor-pointer shrink-0">
          <Square className={compact ? "w-3 h-3" : "w-4 h-4"} />
        </button>
      </div>
    );
  }

  return (
    <button 
      type="button" 
      onClick={startRecording}
      className={`flex items-center justify-center text-slate-9000 hover:text-purple-500 bg-transparent hover:bg-purple-50 border border-transparent hover:border-purple-200 transition-colors cursor-pointer rounded-full shrink-0 ${compact ? 'p-1.5' : 'p-2'}`}
      title="Record Voice Note"
    >
      <Mic className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
    </button>
  );
}

export function AudioPlayer({ src, duration, compact = false }: { src: string, duration?: number, compact?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [actualDuration, setActualDuration] = useState(duration || 0);

  useEffect(() => {
    if (audioRef.current && !duration) {
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current?.duration !== Infinity) {
          setActualDuration(audioRef.current?.duration || 0);
        }
      };
    }
  }, [src, duration]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds) || seconds === Infinity) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progress = actualDuration ? (currentTime / actualDuration) * 100 : 0;

  return (
    <div className={`flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-2 py-1.5 ${compact ? 'w-[140px]' : 'min-w-[180px] w-full'}`}>
      <button type="button" onClick={togglePlay} className="text-purple-500 hover:text-purple-800 bg-white p-1 rounded-full shadow-sm cursor-pointer shrink-0 border border-slate-100">
        {isPlaying ? <Pause className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} /> : <Play className={compact ? "w-3 h-3 ml-0.5" : "w-3.5 h-3.5 ml-0.5"} />}
      </button>
      <div className="flex-1 flex items-center h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <span className="text-[9px] font-mono font-medium text-slate-500 shrink-0 mr-1 min-w-[30px] text-right">
        {formatTime(currentTime)}
      </span>
      <audio 
        ref={audioRef} 
        src={src} 
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        className="hidden" 
      />
    </div>
  );
}
