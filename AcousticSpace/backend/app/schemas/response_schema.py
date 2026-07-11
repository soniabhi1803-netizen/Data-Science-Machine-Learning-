from pydantic import BaseModel

class UploadResponse(BaseModel):
    filename: str
    content_type: str
    file_size: int
    status: str