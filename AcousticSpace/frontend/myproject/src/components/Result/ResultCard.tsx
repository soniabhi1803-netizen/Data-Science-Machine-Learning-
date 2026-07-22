import AnalysisPanel from "../Analysis/AnalysisPanel";
import PreviewCard from "../Preview/PreviewCard";

import type { AnalysisResult } from "../../types/analysis";
import { motion } from "framer-motion";

interface ResultCardProps {
  result: AnalysisResult | null;
  selectedFile: File | null;
}

const ResultCard = ({
  result,
  selectedFile,
}: ResultCardProps) => {

  if (!result) {
    return (
      <div className="flex min-h-[550px] items-center justify-center rounded-3xl border border-slate-800 bg-slate-950 p-10">
        <div className="max-w-md text-center">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-2v13"
              />
            </svg>

          </div>

          <h2 className="text-2xl font-bold text-white">

            No Analysis Available

          </h2>

          <p className="mt-4 leading-7 text-slate-400">

            Upload an audio file to generate AI-powered deepfake detection,
            acoustic feature extraction, waveform visualization and
            spectrogram analysis.

          </p>

        </div>
      </div>
    );
  }

  return (
    <motion.div 
        className="space-y-8"
        initial={{ opacity:0, y:20}}
        animate={{ opacity:1, y: 0}}
        transition={{duration: 0.4}}    
    >

      <AnalysisPanel result={result} />

      <PreviewCard
        result={result}
        selectedFile={selectedFile}
      />

    </motion.div>
  );
};

export default ResultCard;