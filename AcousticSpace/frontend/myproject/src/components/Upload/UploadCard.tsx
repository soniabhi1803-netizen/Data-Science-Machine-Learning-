import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiFileText } from "react-icons/fi";
import { useUpload } from "../../hooks/useUpload";

interface UploadCardProps {
  onUploadSuccess: (data: any) => void;
}

const UploadCard = ({ onUploadSuccess }: UploadCardProps) => {

  const [file, setFile] = useState<File | null>(null);

  const { uploadAudio, loading } = useUpload();

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "audio/wav": [".wav"],
        "audio/mpeg": [".mp3"],
        "audio/flac": [".flac"],
      },
    });

  const handleUpload = async () => {

    if (!file) {

      alert("Please select an audio file.");

      return;

    }

    const result = await uploadAudio(file);

    onUploadSuccess(result);

  };

  return (

    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

      <h2 className="text-2xl font-bold mb-6">

        Upload Audio

      </h2>

      <div
        {...getRootProps()}
        className={`
        border-2
        border-dashed
        rounded-2xl
        p-10
        text-center
        cursor-pointer
        transition
        ${
          isDragActive
            ? "border-blue-600 bg-blue-50"
            : "border-slate-300 hover:border-blue-500"
        }
      `}
      >

        <input {...getInputProps()} />

        <FiUploadCloud
          size={60}
          className="mx-auto text-blue-600 mb-5"
        />

        <h3 className="text-xl font-semibold">

          Drag & Drop Audio Here

        </h3>

        <p className="text-slate-500 mt-2">

          or click to browse

        </p>

        <p className="text-sm text-slate-400 mt-5">

          WAV • MP3 • FLAC

        </p>

      </div>

      {file && (

        <div className="mt-6 flex items-center gap-4 bg-slate-100 rounded-xl p-4">

          <FiFileText
            size={30}
            className="text-blue-600"
          />

          <div>

            <h3 className="font-semibold">

              {file.name}

            </h3>

            <p className="text-sm text-slate-500">

              {(file.size / 1024 / 1024).toFixed(2)} MB

            </p>

          </div>

        </div>

      )}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="
        w-full
        mt-6
        bg-blue-600
        hover:bg-blue-700
        text-white
        py-3
        rounded-xl
        font-semibold
        transition
      "
      >

        {loading
          ? "Analyzing..."
          : "Analyze Audio"}

      </button>

    </div>

  );

};

export default UploadCard;