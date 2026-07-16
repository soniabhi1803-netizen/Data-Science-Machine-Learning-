interface PreviewCardProps {
  result: any;
}

const API_URL = "http://127.0.0.1:8000";

const PreviewCard = ({ result }: PreviewCardProps) => {

  if (!result) return null;

  return (

    <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">

      <h2 className="text-xl font-bold mb-6">

        📊 Audio Visualizations

      </h2>

      <div className="space-y-8">

        <div>

          <h3 className="font-semibold mb-2">
            Waveform
          </h3>

          <img
            src={`${API_URL}${result.waveform}`}
            alt="Waveform"
            className="rounded-xl border"
          />

        </div>

        <div>

          <h3 className="font-semibold mb-2">
            Mel Spectrogram
          </h3>

          <img
            src={`${API_URL}${result.mel_spectrogram}`}
            alt="Spectrogram"
            className="rounded-xl border"
          />

        </div>

        <div>

          <h3 className="font-semibold mb-2">
            MFCC
          </h3>

          <img
            src={`${API_URL}${result.mfcc}`}
            alt="MFCC"
            className="rounded-xl border"
          />

        </div>

      </div>

    </div>

  );

};

export default PreviewCard;