from datetime import datetime

agent_status = {
    "planner": "idle",
    "researcher": "idle",
    "engineer": "idle",
    "reviewer": "idle",
}


def update_agent(agent: str, status: str):
    agent_status[agent] = {"status": status, "time": datetime.now().strftime("%H:%M:%S")}


def get_status():
    return agent_status