from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
import os


app = FastAPI(
    title="AcousticSpace API",
    description="Deepfake Audio Detection using Acoustic Features",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..")
    )

PROCESSED_DIR = os.path.join(
    BASE_DIR,
    "ml",
    "datasets",
    "processed"
)

app.mount(
    "/processed",
    StaticFiles(directory=PROCESSED_DIR),
    name="processed"
)

@app.get("/")
def home(): 

    return {
        "message": "AcousticSpace API Running",
        "version": "1.0.0"
    }