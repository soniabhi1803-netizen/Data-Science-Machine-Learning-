interface RIRCardProps {
  result: any;
}

const RIRCard = ({ result }: RIRCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">

      <h2 className="text-xl font-bold mb-5">
        🏠 Room Features
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Noise Floor</span>
          <span>{result.noise_floor_db}</span>
        </div>

        <div className="flex justify-between">
          <span>Dynamic Range</span>
          <span>{result.dynamic_range}</span>
        </div>

        <div className="flex justify-between">
          <span>Silence Ratio</span>
          <span>{result.silence_ratio}</span>
        </div>

      </div>

    </div>
  );
};

export default RIRCard;