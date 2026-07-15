from pathlib import Path
import json

from dataset_loader import DatasetLoader

# Import your existing backend feature extraction
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[3]
sys.path.append(str(PROJECT_ROOT / "backend"))

from app.services.feature_service import FeatureService


class DatasetPreprocessor:

    def __init__(self, dataset_root: Path, output_dir: Path):

        self.loader = DatasetLoader(dataset_root)
        self.output_dir = output_dir

        self.output_dir.mkdir(
            parents=True,
            exist_ok=True
        )

    def process_split(self, split: str):

        samples = self.loader.load_split(split)

        print(f"\nProcessing {split.upper()}")

        for index, sample in enumerate(samples):

            try:

                (
                    audio,
                    sample_rate,
                    metadata,
                    features,
                    rir_features,
                    images
                ) = FeatureService.preprocess_audio(
                    str(sample.audio_path)
                )

                output = {

                    "file_id": sample.file_id,
                    "label": sample.label,
                    "split": sample.split,

                    "metadata": metadata,

                    "features": features,

                    "rir": rir_features

                }

                output_file = (
                    self.output_dir /
                    f"{sample.file_id}.json"
                )

                with open(
                    output_file,
                    "w"
                ) as file:

                    json.dump(
                        output,
                        file,
                        indent=4
                    )

                if index % 500 == 0:

                    print(
                        f"Processed {index}/{len(samples)}"
                    )

            except Exception as e:

                print(
                    f"Failed : {sample.file_id}"
                )

                print(e)


if __name__ == "__main__":

    BASE_DIR = Path(__file__).resolve().parents[1]

    DATASET_ROOT = (
        BASE_DIR /
        "raw" /
        "ASVspoof2019_LA"
    )

    OUTPUT_DIR = (
        BASE_DIR /
        "processed" /
        "features"
    )

    preprocessor = DatasetPreprocessor(
        DATASET_ROOT,
        OUTPUT_DIR
    )

    preprocessor.process_split("train")