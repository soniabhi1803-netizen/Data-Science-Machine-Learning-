import torch

from ml.models.cnn_model import CNNModel
from ml.utils.audio_processor import process_audio


import os

BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..")
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "checkpoints",
    "cnn_model.pth"
)

CLASS_NAMES = [
    "Bonafide",
    "Spoof"
]


def load_model():

    device = torch.device(
        "cuda" if torch.cuda.is_available() else "cpu"
    )

    model = CNNModel().to(device)
    
    print("MODEL_PATH:", MODEL_PATH)
    print("Exists:", os.path.exists(MODEL_PATH))
    print("Current Working Directory:", os.getcwd())

    model.load_state_dict(
        torch.load(
            MODEL_PATH,
            map_location=device
        )
    )

    model.eval()

    return model, device


def predict(audio_path):

    model, device = load_model()

    # Preprocess audio
    mel = process_audio(audio_path)

    # Add batch dimension
    mel = mel.unsqueeze(0).to(device)

    with torch.no_grad():

        outputs = model(mel)

        probabilities = torch.softmax(outputs, dim=1)

        confidence, predicted = torch.max(probabilities, dim=1)

    return {
        "prediction": CLASS_NAMES[predicted.item()],
        "confidence": confidence.item() * 100
    }


if __name__ == "__main__":

    audio_path = input("Enter audio file path: ")

    result = predict(audio_path)

    print("\nPrediction :", result["prediction"])
    print(f"Confidence : {result['confidence']:.2f}%")
    