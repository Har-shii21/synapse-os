workflow_state = {
    "planner": "waiting",
    "executor": "waiting",
    "reviewer": "waiting"
}


def update_state(agent, status):
    workflow_state[agent] = status


def get_state():
    return workflow_state