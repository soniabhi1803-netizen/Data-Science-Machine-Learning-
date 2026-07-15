from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.audio_service import AudioService
from app.services.feature_service import FeatureService

router = APIRouter(prefix="/api")


@router.post("/upload")
async def upload_audio(file: UploadFile = File(...)):

    try:

        upload_result = AudioService.save_audio(file)

        audio, sample_rate, metadata, features, rir_features, images = FeatureService.preprocess_audio(
            upload_result["file_path"]
        )

        return {
            **upload_result,
            **metadata,
            **features,
            **rir_features,
            **images
            
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    
    except Exception as e:
        
        raise HTTPException(
            status_code=500,
            detail=f"Internal Server Error: {str(e)}"            
        )