from ml.inference.predict import predict


class PredictionService:

    @staticmethod
    def predict_audio(audio_path):

        return predict(audio_path)