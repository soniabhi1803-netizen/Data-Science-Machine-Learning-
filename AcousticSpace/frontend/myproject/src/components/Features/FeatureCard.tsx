interface FeatureCardProps {
  result: any;
}

const FeatureCard = ({ result }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">

      <h2 className="text-xl font-bold mb-5">
        📈 Acoustic Features
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>RMS Energy</span>
          <span>{result.rms_energy}</span>
        </div>

        <div className="flex justify-between">
          <span>Centroid</span>
          <span>{result.spectral_centroid}</span>
        </div>

        <div className="flex justify-between">
          <span>Bandwidth</span>
          <span>{result.spectral_bandwidth}</span>
        </div>

      </div>

    </div>
  );
};

export default FeatureCard;