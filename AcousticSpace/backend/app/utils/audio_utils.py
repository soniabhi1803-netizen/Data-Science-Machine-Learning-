import librosa
import numpy as np


class AudioUtils:

    @staticmethod
    def load_audio(file_path: str, target_sr: int = 16000):
        """
        Load audio, convert to mono, and resample.
        """

        audio, sample_rate = librosa.load(
            file_path,
            sr=target_sr,
            mono=True
        )

        return audio, sample_rate

    @staticmethod
    def normalize_audio(audio: np.ndarray):
        """
        Normalize audio amplitude.
        """

        max_value = np.max(np.abs(audio))

        if max_value > 0:
            audio = audio / max_value

        return audio

    @staticmethod
    def trim_silence(audio: np.ndarray):
        """
        Remove leading and trailing silence.
        """

        trimmed_audio, _ = librosa.effects.trim(
            audio,
            top_db=20
        )

        return trimmed_audio

    @staticmethod
    def get_metadata(audio: np.ndarray, sample_rate: int):

        duration = librosa.get_duration(y=audio, sr=sample_rate)

        return {
            "duration": round(duration, 2),
            "sample_rate": sample_rate,
            "num_samples": len(audio)
        }