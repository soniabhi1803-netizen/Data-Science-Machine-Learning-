import { useState } from "react";
import {
  FiBarChart2,
  FiImage,
  FiMusic,
  FiEye,
} from "react-icons/fi";

import AudioPreview from "./AudioPreview";
import type { AnalysisResult } from "../../types/analysis";

interface PreviewCardProps {
  result: AnalysisResult;
  selectedFile: File | null;
}

const API_URL = import.meta.env.VITE_API_URL;

const tabs = [
  {
    id: "waveform",
    title: "Waveform",
    icon: <FiMusic />,
  },
  {
    id: "spectrogram",
    title: "Spectrogram",
    icon: <FiBarChart2 />,
  },
  {
    id: "mfcc",
    title: "MFCC",
    icon: <FiImage />,
  },
];

const PreviewCard = ({
  result,
  selectedFile,
}: PreviewCardProps) => {

  const [activeTab, setActiveTab] =
    useState("waveform");

  const [imageLoading, setImageLoading] =
    useState(true);;

  if (!result) return null;

  const getImage = () => {
    switch (activeTab) {
      case "waveform":
        return result.waveform;

      case "spectrogram":
        return result.mel_spectrogram;

      case "mfcc":
        return result.mfcc;

      default:
        return result.waveform;
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8">

      {/* Header */}

      <div className="mb-8">

        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
          <FiEye className="text-cyan-400" />
          Audio Visualization
        </h2>

        <p className="text-slate-400 mt-2">

          Interactive playback and generated analysis.

        </p>

      </div>

      {/* Audio Player */}

      <AudioPreview file={selectedFile} />

      {/* Tabs */}

      <div className="flex gap-3 mt-8 mb-6">

        {tabs.map((tab) => (

          <button
            key={tab.id}
            onClick={() => { setImageLoading(true), setActiveTab(tab.id) }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl transition ${activeTab === tab.id
              ? "bg-blue-600 text-white"
              : "bg-slate-900 text-slate-400 hover:bg-slate-800"
              }`}
          >
            {tab.icon}

            {tab.title}

          </button>

        ))}

      </div>

      {/* Image */}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

        {imageLoading && (
          <div className="flex h-72 items-center justify-center">

            <div className="text-center">

              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />

              <p className="text-slate-400">
                Loading visualization...
              </p>

            </div>

          </div>
        )}

        <img
          src={`${API_URL}${getImage()}`}
          alt={activeTab}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
          className={`w-full transition-opacity duration-500 ${imageLoading ? "hidden" : "block"
            }`}
        />

      </div>

    </div>
  );
};

export default PreviewCard;