from pathlib import Path
from dataclasses import dataclass
from typing import List


@dataclass
class AudioSample:
    """
    Represents one audio sample in the ASVspoof dataset.
    """

    file_id: str
    audio_path: Path
    label: str
    split: str


class DatasetLoader:

    def __init__(self, dataset_root: Path):

        self.dataset_root = dataset_root

        self.protocol_dir = (
            dataset_root / "ASVspoof2019_LA_cm_protocols"
        )

    def load_split(self, split: str) -> List[AudioSample]:
        """
        Load one dataset split.
        """

        protocol_map = {
            "train": "ASVspoof2019.LA.cm.train.trn.txt",
            "dev": "ASVspoof2019.LA.cm.dev.trl.txt",
            "eval": "ASVspoof2019.LA.cm.eval.trl.txt"
        }

        if split not in protocol_map:
            raise ValueError(
                f"Unknown split: {split}"
            )

        protocol_file = (
            self.protocol_dir /
            protocol_map[split]
        )

        audio_dir = (
            self.dataset_root /
            f"ASVspoof2019_LA_{split}" /
            "flac"
        )

        samples = []

        with open(protocol_file, "r") as file:

            for line in file:

                parts = line.strip().split()

                file_id = parts[1]

                label = parts[-1]

                audio_path = (
                    audio_dir /
                    f"{file_id}.flac"
                )

                samples.append(

                    AudioSample(
                        file_id=file_id,
                        audio_path=audio_path,
                        label=label,
                        split=split
                    )

                )

        return samples