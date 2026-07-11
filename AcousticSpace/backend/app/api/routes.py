from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.audio_service import AudioService
from app.services.feature_service import FeatureService

router = APIRouter()


@router.post("/upload")
async def upload_audio(file: UploadFile = File(...)):

    try:

        upload_result = AudioService.save_audio(file)

        audio, sample_rate, metadata, features, images = FeatureService.preprocess_audio(
            upload_result["file_path"]
        )

        return {
            **upload_result,
            **metadata,
            **features,
            **images
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )