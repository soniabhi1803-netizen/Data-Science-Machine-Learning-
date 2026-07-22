import { useEffect, useRef, useState } from "react";
import { FiPlay, FiPause, FiClock, FiMusic, } from "react-icons/fi";
import WaveSurfer from "wavesurfer.js";

interface AudioPreviewProps {
  file: File | null;
}

const AudioPreview = ({ file }: AudioPreviewProps) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!file || !waveformRef.current) return;

    // Destroy previous instance
    if (waveSurferRef.current) {
      try {
        waveSurferRef.current.unAll();
        waveSurferRef.current.destroy();
      } catch {
        // Ignore cleanup errors
      }

      waveSurferRef.current = null;
    }

    const audioUrl = URL.createObjectURL(file);

    const waveSurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#334155",
      progressColor: "#3b82f6",
      cursorColor: "#06b6d4",
      height: 90,
      barWidth: 3,
      barGap: 2,
      barRadius: 3,
      normalize: true,
      dragToSeek: true,
      interact: true,
    });

    waveSurferRef.current = waveSurfer;
    waveSurfer.load(audioUrl);

    waveSurfer.on("ready", () => {
      setDuration(waveSurfer.getDuration());
      setIsLoading(false);
    });

    waveSurfer.on("audioprocess", () => {
      setCurrentTime(waveSurfer.getCurrentTime());
    });

    waveSurfer.on("timeupdate", (currentTime) => {
      setCurrentTime(currentTime);
    });

    waveSurfer.on("finish", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    waveSurfer.on("error", () => {
      setIsLoading(false);
    });

    waveSurfer.on("play", () => {
      setIsPlaying(true);
    });

    waveSurfer.on("pause", () => {
      setIsPlaying(false);
    });

    waveSurferRef.current = waveSurfer;

    return () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setIsLoading(true);

      try {
        waveSurfer.unAll();
        waveSurfer.destroy();
      } catch (error) {
        // Ignore AbortError during cleanup
        if (
          !(error instanceof DOMException && error.name === "AbortError")
        ) {
          console.error(error);
        }
      }

      waveSurferRef.current = null;
      URL.revokeObjectURL(audioUrl);
    };
  }, [file]);


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!waveSurferRef.current || isLoading) return;

    waveSurferRef.current.playPause();

    setIsPlaying(waveSurferRef.current.isPlaying());
  };

  if (!file) return null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <FiMusic className="text-cyan-400" />
            Audio Preview
          </h3>

          <p className="mt-1 text-sm text-slate-400 break-all">
            {file.name}
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-slate-300">

          <FiClock size={16} />

          <span className="text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

        </div>

      </div>

      <div
        ref={waveformRef}
        className="mb-6"
      />

      {isLoading && (
        <div className="mb-6">

          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">

            <div className="h-full w-1/3 animate-pulse rounded-full bg-cyan-500" />

          </div>

          <p className="mt-3 text-sm text-slate-400">
            Loading waveform...
          </p>

        </div>
      )}

      <button
        onClick={togglePlay}
        disabled={isLoading}
        className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPlaying ? (
          <>
            <FiPause size={20} />
            Pause
          </>
        ) : (
          <>
            <FiPlay size={20} />
            Play
          </>
        )}
      </button>

    </div>
  );
};

export default AudioPreview;