import librosa
import numpy as np
import torch
import torch.nn.functional as F


def process_audio(audio_path):
    """
    Load an audio file and convert it into a
    1×128×128 Mel Spectrogram tensor.
    """

    audio, sample_rate = librosa.load(
        audio_path,
        sr=16000
    )

    # Generate Mel Spectrogram
    mel = librosa.feature.melspectrogram(
        y=audio,
        sr=sample_rate,
        n_mels=128
    )

    # Convert to decibel scale
    mel = librosa.power_to_db(
        mel,
        ref=np.max
    )

    # Convert to tensor
    mel = torch.tensor(
        mel,
        dtype=torch.float32
    )

    # Add channel dimension
    mel = mel.unsqueeze(0)

    # Resize to 128 × 128
    mel = F.interpolate(
        mel.unsqueeze(0),
        size=(128, 128),
        mode="bilinear",
        align_corners=False
    ).squeeze(0)

    return mel