from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agents.planner import PlannerAgent
from pydantic import BaseModel
from agents.executor import ExecutorAgent
from agents.reviewer import ReviewerAgent

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


@app.get("/")
def home():
    return {"status": "Synapse Backend Running"}


@app.post("/run-agent")
def run_agent(request: TaskRequest):

    plan = planner.run(request.task)

    tasks = plan.split("\n")

    execution = executor.run(tasks)

    review = reviewer.run(execution)

    return {
        "plan": plan,
        "execution": execution,
        "review": review
    }