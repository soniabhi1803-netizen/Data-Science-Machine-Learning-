import os
import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np


class VisualizationUtils:

    @staticmethod
    def save_waveform(audio, sr, save_path):

        plt.figure(figsize=(12,4))

        librosa.display.waveshow(
            audio,
            sr=sr
        )

        plt.title("Waveform")

        plt.xlabel("Time")

        plt.ylabel("Amplitude")

        plt.tight_layout()

        plt.savefig(save_path)

        plt.close()

    @staticmethod
    def save_mel_spectrogram(audio, sr, save_path):

        mel = librosa.feature.melspectrogram(
            y=audio,
            sr=sr,
            n_mels=128
        )

        mel_db = librosa.power_to_db(
            mel,
            ref= np.max
        )

        plt.figure(figsize=(12,5))

        librosa.display.specshow(
            mel_db,
            sr=sr,
            x_axis="time",
            y_axis="mel"
        )

        plt.colorbar(format="%+2.0f dB")

        plt.title("Mel Spectrogram")

        plt.tight_layout()

        plt.savefig(save_path)

        plt.close()

    @staticmethod
    def save_mfcc(audio, sr, save_path):

        mfcc = librosa.feature.mfcc(
            y=audio,
            sr=sr,
            n_mfcc=40
        )

        plt.figure(figsize=(12,5))

        librosa.display.specshow(
            mfcc,
            x_axis="time"
        )

        plt.colorbar()

        plt.title("MFCC")

        plt.tight_layout()

        plt.savefig(save_path)

        plt.close()