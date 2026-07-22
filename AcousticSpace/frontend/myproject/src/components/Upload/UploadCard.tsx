import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FiUploadCloud,
  FiFileText,
  FiCheckCircle,
  FiCpu,
  FiLoader,
  FiTrash2,
} from "react-icons/fi";

import { useUpload } from "../../hooks/useUpload";
import toast from "react-hot-toast";
import type { AnalysisResult } from "../../types/analysis";


interface UploadCardProps {
  onUploadSuccess: (data: AnalysisResult) => void;
  onFileSelect: (file: File) => void;
}

const UploadCard = ({
  onUploadSuccess,
  onFileSelect,
}: UploadCardProps) => {

  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const { uploadAudio, loading } = useUpload();

  const onDrop = (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;

    const selected = acceptedFiles[0];
    
    const allowedTypes = [
      "audio/wav",
      "audio/flac",
      "audio/mpeg",
    ];


    const maxSize = 25 * 1024 * 1024;

    if (!allowedTypes.includes(selected.type)) {
    
      toast.error("Unsupported audio format.");
    
      return;
    }

    if (selected.size > maxSize){

      toast.error("Maximum file size is 25 MB.")

      return;
    }

    setFile(selected);
    onFileSelect(selected);

    const audio = document.createElement("audio");

    audio.preload = "metadata";

    audio.onloadedmetadata = () => {
      window.URL.revokeObjectURL(audio.src);
      setDuration(audio.duration);
    };

    audio.src = URL.createObjectURL(selected);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,

    onDropRejected: (fileRejections) => {
      const rejection = fileRejections[0];

      if (!rejection) return;

      const error = rejection.errors[0];

      switch (error.code) {
        case "file-invalid-type":
          toast.error("Only WAV, MP3 and FLAC files are supported.");
          break;

        case "file-too-large":
          toast.error("Maximum file size is 25 MB.");
          break;

        default:
          toast.error("Unable to upload this file.");
      }
    },

    multiple: false,

    maxSize: 25 * 1024 * 1024,

    accept: {
      "audio/wav": [".wav"],
      "audio/mpeg": [".mp3"],
      "audio/flac": [".flac"],
    },
  });

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an audio file.");
      return;
    }

    try {
      const result = await uploadAudio(file);
      
      toast.success("Analysis completed successfully.");
      
      onUploadSuccess(result);
    }
    catch (error) {
      
      console.error(error);
      
      toast.error("Failed to analyze audio.");
      
    }
  };

  const removeFile = () => {
    setFile(null);
    setDuration(null);

    toast.success("File removed.");
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-white">

            Audio Intelligence Scanner

          </h2>

          <p className="text-slate-400 mt-2">

            Upload an audio file for AI-powered deepfake detection.

          </p>

        </div>

        <div className="h-14 w-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">

          <FiCpu className="text-blue-400" size={28} />

        </div>

      </div>

      <div
        {...getRootProps({disabled: loading,})}
        className={`border-2 border-dashed rounded-3xl p-12 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed text-center ${
          isDragActive
            ? "border-blue-500 bg-blue-500/10 scale-[1.01] shadow-xl shadow-blue-500/10"
            : "border-slate-700 hover:border-blue-500 hover:bg-slate-900/40"
        }`}
      >
        <input {...getInputProps()} />

        <FiUploadCloud
          className="mx-auto text-blue-400 mb-6"
          size={70}
        />

        <h3 className="text-xl text-white font-semibold">

          Drag & Drop Audio Here

        </h3>

        <p className="text-slate-400 mt-3">

          or click to browse your computer

        </p>

        <div className="flex justify-center gap-3 mt-6">

          {["WAV", "MP3", "FLAC"].map((type) => (
            <span
              key={type}
              className="bg-slate-900 border border-slate-700 px-3 py-1 rounded-full text-xs text-slate-300"
            >
              {type}
            </span>
          ))}

        </div>

      </div>

  {file && (
    <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="rounded-xl bg-blue-500/10 p-3">
            <FiFileText
              className="text-blue-400"
              size={26}
            />
          </div>

          <div>

            <h3 className="font-semibold text-white break-all">
              {file.name}
            </h3>

            <div className="mt-2 space-y-1 text-sm text-slate-400">

              <p>
                <span className="text-slate-500">Size :</span>{" "}
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

              <p>
                <span className="text-slate-500">Format :</span>{" "}
                {file.type || "Unknown"}
              </p>

              <p>
                <span className="text-slate-500">Duration :</span>{" "}
                {duration ? `${duration.toFixed(2)} sec` : "Loading..."}
              </p>

              <p>
                <span className="text-slate-500">Modified :</span>{" "}
                {new Date(file.lastModified).toLocaleString()}
              </p>

              <p>
                <span className="text-slate-500">Status :</span>{" "}
                <span className="text-emerald-400">
                  Ready for Analysis
                </span>
              </p>

            </div>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <FiCheckCircle
            className="text-emerald-400"
            size={22}
          />

          <button
            onClick={removeFile}
            disabled={loading}
            className="rounded-lg bg-red-500/10 p-2 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiTrash2
              className="text-red-400"
              size={18}
            />
          </button>

        </div>

        </div>

      </div>
      )}

      {loading && (
        <div className="mt-6 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-4">
          <p className="text-sm text-cyan-300 font-medium">
            AI is extracting acoustic features and detecting potential deepfake patterns...
          </p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="mt-8 w-full rounded-2xl py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-3">
            <FiLoader className="animate-spin" size={20} />
            <span>Analyzing with AI Engine...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <FiCpu size={20} />
            <span>Analyze Audio</span>
          </div>
        )}
        </button>

    </div>
  );
};

export default UploadCard;