from pathlib import Path
from collections import Counter

from dataset_loader import DatasetLoader


class DatasetVerifier:

    def __init__(self, dataset_root: Path):

        self.loader = DatasetLoader(dataset_root)

    def verify_split(self, split: str):

        print(f"\n Verifying {split.upper()} dataset...")

        samples = self.loader.load_split(split)

        label_counter = Counter()

        missing_files = []

        for sample in samples:

            label_counter[sample.label] += 1

            if not sample.audio_path.exists():
                missing_files.append(sample.audio_path)

        print(f" Total Samples : {len(samples)}")
        print(f" Bonafide     : {label_counter['bonafide']}")
        print(f" Spoof        : {label_counter['spoof']}")
        print(f" Missing Files: {len(missing_files)}")

        if missing_files:

            print("\nFirst 10 Missing Files:")

            for path in missing_files[:10]:
                print(path)

        print("-" * 50)


if __name__ == "__main__":

    BASE_DIR = Path(__file__).resolve().parents[1]

    DATASET_ROOT = (
        BASE_DIR /
        "raw" /
        "ASVspoof2019_LA"
    )

    verifier = DatasetVerifier(DATASET_ROOT)

    verifier.verify_split("train")
    verifier.verify_split("dev")
    verifier.verify_split("eval")