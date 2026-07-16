interface MetadataCardProps {
  result: any;
}

const MetadataCard = ({ result }: MetadataCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">

      <h2 className="text-xl font-bold text-slate-800 mb-5">
        🎵 Audio Metadata
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span className="text-slate-500">Filename</span>
          <span className="font-medium">{result.filename}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Duration</span>
          <span>{result.duration} sec</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Sample Rate</span>
          <span>{result.sample_rate} Hz</span>
        </div>

      </div>

    </div>
  );
};

export default MetadataCard;