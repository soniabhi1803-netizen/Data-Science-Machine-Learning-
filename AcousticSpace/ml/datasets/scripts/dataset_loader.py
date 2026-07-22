from pathlib import Path
import pandas as pd


class DatasetLoader:

    def __init__(self):

        self.base_path = Path(__file__).resolve().parents[1]

        self.dataset_path = (
            self.base_path
            / "raw"
            / "ASVspoof2019_LA"
        )

        self.protocol_path = (
            self.dataset_path
            / "ASVspoof2019_LA_cm_protocols"
        )

        self.train_audio_path = (
            self.dataset_path
            / "ASVspoof2019_LA_train"
            / "flac"
        )

    def load_train_protocol(self):

        protocol_file = (
            self.protocol_path
            / "ASVspoof2019.LA.cm.train.trn.txt"
        )

        df = pd.read_csv(
            protocol_file,
            sep=r"\s+",
            header=None
        )

        df.columns = [
            "speaker_id",
            "file_name",
            "unused",
            "attack",
            "label"
        ]

        return df
    
    def prepare_train_dataset(self):

        df = self.load_train_protocol()

        df["audio_path"] = df["file_name"].apply(
            lambda x: str(
                self.train_audio_path / f"{x}.flac"
            )
        )

        df["label"] = df["label"].map({
            "bonafide": 0,
            "spoof": 1
        })

        return df
    
if __name__ == "__main__":

    loader = DatasetLoader()

    df = loader.prepare_train_dataset()

    print(df.head())

    print()

    print(df.iloc[0]["audio_path"])

    print()

    print(df["label"].value_counts())