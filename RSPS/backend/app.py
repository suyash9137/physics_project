import time
import uvicorn
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="RSPS Backend Server")

# Allows cross-origin requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Unified Frontends
app.mount("/rsps", StaticFiles(directory="static/rsps", html=True), name="rsps")
app.mount("/edwin", StaticFiles(directory="static/edwin", html=True), name="edwin")
# We also want the root to default to The Edwin Group landing page
app.mount("/", StaticFiles(directory="static/edwin", html=True), name="root")

# In-memory session tracking
sessions = {}

@app.post("/api/start_session")
async def start_session(student_id: str):
    """Initializes a new exam session."""
    session_id = f"session_{int(time.time())}_{student_id}"
    sessions[session_id] = {
        "student_id": student_id,
        "status": "active",
        "last_ping": time.time(),
        "flags": []
    }
    return {"session_id": session_id, "message": "Session started"}

@app.post("/api/ping")
async def ping(session_id: str):
    """Hardware disconnect mitigation ping."""
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    sessions[session_id]["last_ping"] = time.time()
    return {"status": "ok"}

@app.post("/api/upload_media")
async def upload_media(session_id: str, file: UploadFile = File(...), trigger_type: str = "random"):
    """Handles upload of audio/video chunks from the frontend."""
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
        
    print(f"Received media chunk from {session_id} due to {trigger_type} trigger")
    
    # In a real system, we would:
    # 1. Encrypt and save to S3
    # 2. Add to processing queue (Celery/Redis)
    # mock_s3_upload(file)
    
    return {"message": "Media received and queued for processing"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
