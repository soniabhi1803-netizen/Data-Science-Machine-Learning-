import librosa
import numpy as np


class RIRService:
    """
    Extract room-acoustic inspired features.

    Note:
    These are NOT the true Room Impulse Response.
    They are descriptors of the recording environment.
    """

    @staticmethod
    def extract(audio: np.ndarray, sample_rate: int) -> dict:

        # -------------------------
        # RMS Energy
        # -------------------------
        rms = librosa.feature.rms(y=audio)[0]

        # -------------------------
        # Reverberation Energy
        # Proxy: variance of frame-wise RMS
        # -------------------------
        reverberation_energy = np.var(rms)

        # -------------------------
        # Noise Floor
        # Estimate using the quietest 10% of samples
        # -------------------------
        quiet_level = np.percentile(np.abs(audio), 10)

        noise_floor_db = librosa.amplitude_to_db(
            np.array([quiet_level]),
            ref=1.0
        )[0]

        # -------------------------
        # Silence Ratio
        # -------------------------
        silence_threshold = 0.01

        silence_ratio = np.mean(
            np.abs(audio) < silence_threshold
        )

        # -------------------------
        # Dynamic Range
        # -------------------------
        dynamic_range = np.max(audio) - np.min(audio)

        # -------------------------
        # Energy Variance
        # -------------------------
        energy_variance = np.var(rms)

        return {

            "reverberation_energy":
                round(float(reverberation_energy), 6),

            "noise_floor_db":
                round(float(noise_floor_db), 2),

            "silence_ratio":
                round(float(silence_ratio), 4),

            "dynamic_range":
                round(float(dynamic_range), 4),

            "energy_variance":
                round(float(energy_variance), 6)
        }