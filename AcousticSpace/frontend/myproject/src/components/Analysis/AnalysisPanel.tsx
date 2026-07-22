import {
  FiActivity,
  FiFileText,
  FiMic,
  FiShield,
} from "react-icons/fi";

import type { AnalysisResult } from "../../types/analysis";

interface Props {
  result: AnalysisResult;
}

const AnalysisPanel = ({ result }: Props) => {

  const formatNumber = (
    value: number,
    decimals = 2
  ) => Number(value).toFixed(decimals);

  const confidence = Number(result.confidence);

  const isBonafide =
    result.prediction === "Bonafide";

  const risk =
    confidence >= 95
      ? "Critical"
      : confidence >= 80
        ? "High"
        : confidence >= 60
          ? "Medium"
          : "Low";

  const riskColor =
    risk === "Critical"
      ? "text-red-500"
      : risk === "High"
        ? "text-orange-400"
        : risk === "Medium"
          ? "text-yellow-400"
          : "text-emerald-400";

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8">

      {/* Threat */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-white flex items-center gap-3">

            <FiShield />

            AI Threat Assessment

          </h2>

          <p className="text-slate-400 mt-2">

            CNN Deepfake Detection Report

          </p>

        </div>

        <div
          className={`rounded-2xl px-5 py-3 text-lg font-bold shadow-lg ${isBonafide
            ? "bg-emerald-500/20 text-emerald-400"
            : "bg-red-500/20 text-red-400"
            }`}
        >
          {result.prediction}
        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="bg-slate-900 rounded-2xl p-5">

          <p className="text-slate-400 text-sm">

            Confidence

          </p>

          <h3 className="text-3xl font-bold text-white mt-2">

            {confidence.toFixed(2)}%

          </h3>

        </div>

        <div className="bg-slate-900 rounded-2xl p-5">

          <p className="text-slate-400 text-sm">

            Risk Level

          </p>

          <h3 className={`mt-2 text-3xl font-bold ${riskColor}`}>

            {risk}

          </h3>

        </div>

        <div className="bg-slate-900 rounded-2xl p-5">

          <p className="text-slate-400 text-sm">

            AI Model

          </p>

          <h3 className="text-3xl font-bold text-cyan-400 mt-2">

            CNN

          </h3>

        </div>

      </div>

      <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <div className="mb-3 flex justify-between">

          <span className="text-slate-400">
            Detection Confidence
          </span>

          <span className="font-semibold text-white">
            {confidence.toFixed(2)}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">

          <div
            className={`h-full transition-all duration-700 ${isBonafide
              ? "bg-emerald-500"
              : "bg-red-500"
              }`}
            style={{
              width: `${confidence}%`,
            }}
          />

        </div>

      </div>

      {/* Information */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-slate-900 rounded-2xl p-6">

          <h3 className="text-lg text-white font-semibold flex items-center gap-2 mb-5">

            <FiFileText />

            Audio Metadata

          </h3>

          <Info label="Filename" value={result.filename} />

          <Info label="Duration" value={`${result.duration} sec`} />

          <Info
            label="Sample Rate"
            value={`${result.sample_rate} Hz`}
          />

        </div>

        <div className="bg-slate-900 rounded-2xl p-6">

          <h3 className="text-lg text-white font-semibold flex items-center gap-2 mb-5">

            <FiActivity />

            Acoustic Features

          </h3>

          <Info
            label="RMS Energy"
            value={formatNumber(result.rms_energy)}
          />

          <Info
            label="Centroid"
            value={`${formatNumber(result.spectral_centroid)} Hz`}
          />

          <Info
            label="Bandwidth"
            value={`${formatNumber(result.spectral_bandwidth)} Hz`}
          />

        </div>

      </div>

      {/* RIR */}

      <div className="bg-slate-900 rounded-2xl p-6 mt-6">

        <h3 className="text-lg text-white font-semibold flex items-center gap-2 mb-5">

          <FiMic />

          Room Impulse Response

        </h3>

        <div className="grid md:grid-cols-3 gap-5">

          <Info
            label="Noise Floor"
            value={`${formatNumber(result.noise_floor_db)} dB`}
          />

          <Info
            label="Dynamic Range"
            value={`${formatNumber(result.dynamic_range)} dB`}
          />

          <Info
            label="Silence Ratio"
            value={`${formatNumber(result.silence_ratio)} %`}
          />

        </div>

      </div>

    </div>
  );
};

function Info({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex justify-between py-2 border-b border-slate-800 last:border-none">

      <span className="text-slate-400">

        {label}

      </span>

      <span className="max-w-[60%] break-words text-right font-medium text-white">

        {value}

      </span>

    </div>
  );
}

export default AnalysisPanel;