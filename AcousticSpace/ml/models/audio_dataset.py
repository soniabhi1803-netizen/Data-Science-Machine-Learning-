import torch
from torch.utils.data import Dataset

from ml.utils.audio_processor import process_audio


class AudioDataset(Dataset):

    def __init__(self, dataframe):
        self.dataframe = dataframe

    def __len__(self):
        return len(self.dataframe)

    def __getitem__(self, index):

        row = self.dataframe.iloc[index]

        audio_path = row["audio_path"]
        label = row["label"]

        # Process audio into Mel Spectrogram tensor
        mel = process_audio(audio_path)

        # Convert label to tensor
        label = torch.tensor(
            label,
            dtype=torch.long
        )

        return mel, label