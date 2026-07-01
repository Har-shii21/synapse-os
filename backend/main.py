from fastapi import FastAPI
from orchestration.coordinator import Coordinator

app = FastAPI()

coordinator = Coordinator()

@app.get("/")
def home():
    return {"message": "Synapse Backend Running 🚀"}

@app.get("/run")
def run_agents(prompt: str):
    return coordinator.execute(prompt)