from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agents.planner import PlannerAgent
from agents.executor import ExecutorAgent
from agents.reviewer import ReviewerAgent

from memory.state import get_state
from database.graph import Neo4jConnection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

planner = PlannerAgent()
executor = ExecutorAgent()
reviewer = ReviewerAgent()


class TaskRequest(BaseModel):
    task: str


# -----------------------------
# Replay Memory
# -----------------------------

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
    return {"status": "Synapse Backend Running"}


@app.post("/run-agent")
def run_agent(request: TaskRequest):

    # Planner
    plan = planner.run(request.task)

    # Executor
    tasks = plan.split("\n")
    execution = executor.run(tasks)

    # Reviewer
    review = reviewer.run(execution)

    # Save to Replay Memory
    save_workflow(
        request.task,
        plan,
        execution,
        review,
    )

    return {
        "plan": plan,
        "execution": execution,
        "review": review,
    }


@app.get("/workflow-status")
def workflow_status():
    return get_state()


@app.get("/projects")
def get_projects():

    db = Neo4jConnection()

    projects = db.get_projects()

    db.close()

    return {
        "projects": projects
    }


@app.get("/knowledge-graph")
def knowledge_graph():

    return {
        "nodes": [
            {"id": "core", "label": "🧠 Synapse Core"},
            {"id": "planner", "label": "Planner"},
            {"id": "researcher", "label": "Researcher"},
            {"id": "engineer", "label": "Engineer"},
            {"id": "security", "label": "Security"},
            {"id": "analyst", "label": "Analyst"},
            {"id": "reviewer", "label": "Reviewer"},
            {"id": "memory", "label": "🧬 Cognitive Memory"},
        ],
        "edges": [
            ["core", "planner"],
            ["core", "researcher"],
            ["core", "engineer"],
            ["core", "security"],
            ["core", "analyst"],
            ["core", "reviewer"],
            ["planner", "memory"],
            ["reviewer", "memory"],
        ],
    }


@app.get("/replay")
def get_replay():
    return {
        "history": workflow_history[::-1]
    }

@app.get("/analytics")
def analytics():

    db = Neo4jConnection()

    projects = db.get_projects()

    db.close()

    return {
        "projects_completed": len(projects),
        "ai_agents": 6,
        "memory_nodes": len(projects),
        "knowledge_links": len(projects) * 2,
        "workflow_success": "98%",
        "reviews_approved": len(workflow_history),
    }