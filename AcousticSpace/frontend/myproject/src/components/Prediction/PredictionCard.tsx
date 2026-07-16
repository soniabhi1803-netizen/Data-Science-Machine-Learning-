const PredictionCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">

      <h2 className="text-xl font-bold mb-5">
        🧠 AI Prediction
      </h2>

      <div className="flex flex-col items-center justify-center py-8">

        <div className="text-5xl mb-4">🤖</div>

        <h3 className="text-xl font-semibold">
          Pending Model
        </h3>

        <p className="text-slate-500 mt-2">
          CNN model will be integrated in Week 2.
        </p>

      </div>

    </div>
  );
};

export default PredictionCard;