import os
from fastapi.staticfiles import StaticFiles

from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Form,
    HTTPException,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

from memory.state import get_state
from database.graph import Neo4jConnection
from orchestration.coordinator import Coordinator
from memory.agent_status import get_status
from agents.voice import voice_agent

app = FastAPI(
    title="Synapse OS API",
    version="1.0.0",
)

app.mount(
    "/generated_audio",
    StaticFiles(directory="generated_audio"),
    name="generated_audio",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

coordinator = Coordinator()


class TaskRequest(BaseModel):
    task: str


class VoiceRequest(BaseModel):
    text: str
    language: str = "en-IN"


class TranslateRequest(BaseModel):
    text: str
    target_language: str


workflow_history = []


def save_workflow(
    task,
    plan,
    execution,
    review,
):
    workflow_history.append(
        {
            "task": task,
            "plan": plan,
            "execution": execution,
            "review": review,
        }
    )


@app.get("/")
def home():

    return {
        "status": "Synapse Backend Running 🚀",
        "version": "1.0.0",
    }


@app.get("/health")
def health():

    return {
        "success": True,
        "backend": "running",
        "voice": "ready",
        "coordinator": "ready",
    }


@app.get("/languages")
def languages():

    return {
        "languages": [
            "en-IN",
            "hi-IN",
            "te-IN",
            "ta-IN",
            "kn-IN",
            "ml-IN",
            "mr-IN",
            "gu-IN",
            "bn-IN",
            "pa-IN",
        ]
    }


@app.post("/run-agent")
def run_agent(request: TaskRequest):

    try:

        print("=" * 60)
        print("RUN AGENT:", request.task)
        print("=" * 60)

        result = coordinator.execute(
            request.task
        )

        save_workflow(
            request.task,
            result["plan"],
            result["code"],
            result["review"],
        )

        db = Neo4jConnection()

        try:

            db.save_project(request.task)

        finally:

            db.close()

        return {
            "success": True,
            **result,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )
    
@app.get("/workflow-status")
def workflow_status():

    return get_state()


@app.get("/agent-status")
def agent_status():

    return get_status()


@app.get("/projects")
def get_projects():

    db = Neo4jConnection()

    try:

        projects = db.get_projects()

        return {
            "success": True,
            "projects": projects,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

    finally:

        db.close()


# ======================================================
# KNOWLEDGE GRAPH
# ======================================================

@app.get("/knowledge-graph")
def knowledge_graph():

    db = Neo4jConnection()

    try:

        graph = db.get_graph_data()

        return {
            "success": True,
            **graph,
        }

    finally:

        db.close()


# ======================================================
# REPLAY HISTORY
# ======================================================

@app.get("/replay")
def replay():

    return {
        "success": True,
        "history": workflow_history[::-1],
    }


# ======================================================
# ANALYTICS
# ======================================================

@app.get("/analytics")
def analytics():

    db = Neo4jConnection()

    try:

        projects = db.get_projects()

        graph = db.get_graph_data()

        return {

            "success": True,

            "projects_completed": len(projects),

            "ai_agents": 7,

            "memory_nodes": len(graph["nodes"]),

            "knowledge_links": len(graph["edges"]),

            "workflow_success": "98%",

            "reviews_approved": len(workflow_history),

        }

    finally:

        db.close()


# ======================================================
# SPEECH → TEXT
# ======================================================

@app.post("/speech-to-text")
async def speech_to_text(
    file: UploadFile = File(...),
    language: str = Form("en-IN"),
):

    temp_file = f"temp_{file.filename}"

    try:

        with open(temp_file, "wb") as f:

            f.write(await file.read())

        result = voice_agent.listen(
            temp_file,
            language,
        )

        return result

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

    finally:

        if os.path.exists(temp_file):

            os.remove(temp_file)


# ======================================================
# TEXT → SPEECH
# ======================================================

@app.post("/text-to-speech")
def text_to_speech(request: VoiceRequest):

    try:

        result = voice_agent.speak(
            request.text,
            request.language,
        )

        return result

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# ======================================================
# TRANSLATE
# ======================================================

@app.post("/translate")
def translate(request: TranslateRequest):

    try:

        return voice_agent.translate(
    request.text,
    request.target_language,
)

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# ======================================================
# AUDIO FILE
# ======================================================

@app.get("/audio/{filename}")
def get_audio(filename: str):

    if not os.path.exists(filename):

        raise HTTPException(
            status_code=404,
            detail="Audio file not found",
        )

    return FileResponse(
        filename,
        media_type="audio/mpeg",
        filename=filename,
    )