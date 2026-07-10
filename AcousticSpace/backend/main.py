from fastapi import FastAPI

app = FastAPI(
    title="AcousticSpace API",
    description="Deepfake Audio Detection using Acoustic Features",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to AcousticSpace API",
        "status": "Running Successfully"
    }