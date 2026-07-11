import os
import shutil
from fastapi import UploadFile

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


class AudioService:

    ALLOWED_EXTENSIONS = {
        ".wav",
        ".mp3",
        ".flac",
        ".ogg",
        ".m4a"
    }

    @staticmethod
    def save_audio(file: UploadFile):

        extension = os.path.splitext(file.filename)[1].lower()

        if extension not in AudioService.ALLOWED_EXTENSIONS:
            raise ValueError("Unsupported audio format.")

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        file_size = os.path.getsize(file_path)

        return {
            "filename": file.filename,
            "content_type": file.content_type,
            "file_size": file_size,
            "status": "Uploaded Successfully",
            "file_path": file_path
        }