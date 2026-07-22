from fastapi import APIRouter, UploadFile, File, HTTPException
import traceback
from app.services.audio_service import AudioService
from app.services.feature_service import FeatureService
from app.services.prediction_service import PredictionService
from uuid import uuid4

router = APIRouter(prefix="/api")


@router.post("/upload")
async def upload_audio(file: UploadFile = File(...)):
    
    request_id = uuid4()

    print()
    print("=" * 70)
    print("REQUEST:", request_id)
    print("=" * 70)
    
    try:

        upload_result = AudioService.save_audio(file)
        print("Returned file_path:", upload_result["file_path"])
        print("1. Saving audio...")
        upload_result = AudioService.save_audio(file)
        print("1. Done")
        
        print("2. Extracting features...")
        
        audio, sample_rate, metadata, features, rir_features, images = FeatureService.preprocess_audio(
            upload_result["file_path"]
        )
        print("2. Done")
        
        print("3. Running CNN...")
        prediction = PredictionService.predict_audio(
            upload_result["file_path"]
        )
        print("3. Done")

        return {
            **upload_result,
            "prediction": prediction["prediction"],
            "confidence": prediction["confidence"],
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
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Internal Server Error: {str(e)}"            
        )
        
