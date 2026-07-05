workflow_state = {
    "planner": "waiting",
    "researcher": "waiting",
    "engineer": "waiting",
    "security": "waiting",
    "analyst": "waiting",
    "reviewer": "waiting",
    "current_task": "",
    "progress": 0,
}


def update_state(agent, status):
    workflow_state[agent] = status


def update_progress(task, progress):
    workflow_state["current_task"] = task
    workflow_state["progress"] = progress


def reset_state():
    workflow_state["planner"] = "waiting"
    workflow_state["researcher"] = "waiting"
    workflow_state["engineer"] = "waiting"
    workflow_state["security"] = "waiting"
    workflow_state["analyst"] = "waiting"
    workflow_state["reviewer"] = "waiting"
    workflow_state["current_task"] = ""
    workflow_state["progress"] = 0


def get_state():
    return workflow_state