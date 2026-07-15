from app.utils.audio_utils import AudioUtils
from app.utils.visualization_utils import VisualizationUtils
from app.services.rir_service import RIRService

import os
import librosa
import numpy as np


class FeatureService:

    @staticmethod
    def preprocess_audio(file_path: str):

        # -----------------------------
        # Audio Preprocessing
        # -----------------------------
        audio, sample_rate = AudioUtils.load_audio(file_path)

        audio = AudioUtils.normalize_audio(audio)

        audio = AudioUtils.trim_silence(audio)

        metadata = AudioUtils.get_metadata(audio, sample_rate)

        # -----------------------------
        # Feature Extraction
        # -----------------------------
        features = FeatureService.extract_features(
            audio,
            sample_rate
        )

        # -----------------------------
        # RIR Feature Extraction
        # -----------------------------
        rir_features = RIRService.extract(
            audio,
            sample_rate
        )

        # -----------------------------
        # File & Folder Paths
        # -----------------------------
        filename = os.path.splitext(
            os.path.basename(file_path)
        )[0]

        BASE_DIR = os.path.abspath(
            os.path.join(os.path.dirname(__file__), "../../..")
        )

        PROCESSED_DIR = os.path.join(
            BASE_DIR,
            "ml",
            "datasets",
            "processed"
        )

        waveform_dir = os.path.join(PROCESSED_DIR, "waveforms")
        spectrogram_dir = os.path.join(PROCESSED_DIR, "spectrograms")
        mfcc_dir = os.path.join(PROCESSED_DIR, "mfcc")

        os.makedirs(waveform_dir, exist_ok=True)
        os.makedirs(spectrogram_dir, exist_ok=True)
        os.makedirs(mfcc_dir, exist_ok=True)

        waveform_path = os.path.join(
            waveform_dir,
            f"{filename}.png"
        )

        spectrogram_path = os.path.join(
            spectrogram_dir,
            f"{filename}.png"
        )

        mfcc_path = os.path.join(
            mfcc_dir,
            f"{filename}.png"
        )

        # -----------------------------
        # Generate Visualizations
        # -----------------------------
        VisualizationUtils.save_waveform(
            audio,
            sample_rate,
            waveform_path
        )

        VisualizationUtils.save_mel_spectrogram(
            audio,
            sample_rate,
            spectrogram_path
        )

        VisualizationUtils.save_mfcc(
            audio,
            sample_rate,
            mfcc_path
        )

        return (
            audio,
            sample_rate,
            metadata,
            features,
            rir_features,
            {
                "waveform": waveform_path,
                "mel_spectrogram": spectrogram_path,
                "mfcc": mfcc_path
            }
        )

    @staticmethod
    def extract_features(
        audio: np.ndarray,
        sample_rate: int
    ) -> dict:

        # RMS Energy
        rms = librosa.feature.rms(y=audio)

        # Zero Crossing Rate
        zcr = librosa.feature.zero_crossing_rate(audio)

        # Spectral Centroid
        centroid = librosa.feature.spectral_centroid(
            y=audio,
            sr=sample_rate
        )

        # Spectral Bandwidth
        bandwidth = librosa.feature.spectral_bandwidth(
            y=audio,
            sr=sample_rate
        )

        # Spectral Roll-off
        rolloff = librosa.feature.spectral_rolloff(
            y=audio,
            sr=sample_rate
        )

        # Spectral Contrast
        contrast = librosa.feature.spectral_contrast(
            y=audio,
            sr=sample_rate
        )

        # MFCC
        mfcc = librosa.feature.mfcc(
            y=audio,
            sr=sample_rate,
            n_mfcc=40
        )

        return {

            "rms_energy":
                round(float(np.mean(rms)), 6),

            "zero_crossing_rate":
                round(float(np.mean(zcr)), 6),

            "spectral_centroid":
                round(float(np.mean(centroid)), 2),

            "spectral_bandwidth":
                round(float(np.mean(bandwidth)), 2),

            "spectral_rolloff":
                round(float(np.mean(rolloff)), 2),

            "spectral_contrast":
                np.mean(contrast, axis=1).round(2).tolist(),

            "mfcc_shape":
                list(mfcc.shape)

        }