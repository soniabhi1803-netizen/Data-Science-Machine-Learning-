from app.utils.audio_utils import AudioUtils
from app.utils.visualization_utils import VisualizationUtils
import os 
import librosa
import numpy as np


class FeatureService:

    @staticmethod
    def preprocess_audio(file_path: str):

        audio, sample_rate = AudioUtils.load_audio(file_path)

        audio = AudioUtils.normalize_audio(audio)

        audio = AudioUtils.trim_silence(audio)

        metadata = AudioUtils.get_metadata(audio, sample_rate)

        features = FeatureService.extract_features(
            audio,
            sample_rate
        )

        filename = os.path.splitext(
            os.path.basename(file_path)
        )[0]

        waveform_path = f"../ml/datasets/processed/waveforms/{filename}.png"

        spectrogram_path = f"../ml/datasets/processed/spectrograms/{filename}.png"

        mfcc_path = f"../ml/datasets/processed/mfcc/{filename}.png"
        
        os.makedirs("../ml/datasets/processed/waveforms", exist_ok=True)
        os.makedirs("../ml/datasets/processed/spectrograms", exist_ok=True)
        os.makedirs("../ml/datasets/processed/mfcc", exist_ok=True)
        
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
            {
                "waveform": waveform_path,
                "mel_spectrogram": spectrogram_path,
                "mfcc": mfcc_path
            }
                
        )


    @staticmethod
    def extract_features(audio, sample_rate):

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