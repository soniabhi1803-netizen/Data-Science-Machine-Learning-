import MetadataCard from "../Metadata/MetadataCard";
import FeatureCard from "../Features/FeatureCard";
import RIRCard from "../RIR/RIRCard";
import PredictionCard from "../Prediction/PredictionCard";
import PreviewCard from "../Preview/PreviewCard";

interface ResultCardProps {
  result: any;
}

const ResultCard = ({ result }: ResultCardProps) => {

  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow border border-slate-200 p-8 flex items-center justify-center">
        <p className="text-slate-500">
          Upload an audio file to view analysis results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <MetadataCard result={result} />

      <FeatureCard result={result} />

      <RIRCard result={result} />

      <PredictionCard />

      <PreviewCard result={result} />

    </div>
  );
};

export default ResultCard;