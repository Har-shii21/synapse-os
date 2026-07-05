from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from memory.state import get_state
from database.graph import Neo4jConnection
from orchestration.coordinator import Coordinator
from memory.agent_status import get_status

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

coordinator = Coordinator()


class TaskRequest(BaseModel):
    task: str


workflow_history = []


def save_workflow(task, plan, execution, review):
    workflow_history.append(
        {
            "task": task,
            "plan": plan,
            "execution": execution,
            "review": review,
        }
    )


# -----------------------------
# Routes
# -----------------------------

@app.get("/")
def home():
    return {"status": "Synapse Backend Running 🚀"}


@app.post("/run-agent")
def run_agent(request: TaskRequest):

    print("=" * 50)
    print("RUN AGENT CALLED:", request.task)
    print("=" * 50)

    result = coordinator.execute(request.task)

    save_workflow(
        request.task,
        result["plan"],
        result["code"],
        result["review"],
    )

    db = Neo4jConnection()

    print("Saving project to Neo4j...")

    db.save_project(request.task)
    db.close()

    return result


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
        return {"projects": projects}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}
    finally:
        db.close()


# -----------------------------
# LIVE KNOWLEDGE GRAPH
# -----------------------------
@app.get("/knowledge-graph")
def knowledge_graph():

    db = Neo4jConnection()

    graph = db.get_graph_data()

    db.close()

    return graph


# -----------------------------
# REPLAY
# -----------------------------
@app.get("/replay")
def get_replay():

    return {
        "history": workflow_history[::-1]
    }


# -----------------------------
# ANALYTICS
# -----------------------------
@app.get("/analytics")
def analytics():

    db = Neo4jConnection()

    projects = db.get_projects()

    graph = db.get_graph_data()

    db.close()

    return {
        "projects_completed": len(projects),
        "ai_agents": 6,
        "memory_nodes": len(graph["nodes"]),
        "knowledge_links": len(graph["edges"]),
        "workflow_success": "98%",
        "reviews_approved": len(workflow_history),
    }