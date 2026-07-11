from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(
    title="AcousticSpace API",
    description="Deepfake Audio Detection using Acoustic Features",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
def home():

    return {
        "message": "AcousticSpace API Running",
        "version": "1.0.0"
    }