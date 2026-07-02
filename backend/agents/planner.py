from sarvam.client import ask_planner
from memory.state import update_state
from database.graph import Neo4jConnection


class PlannerAgent:

    def __init__(self):
        self.name = "Planner Agent"

    def run(self, task):

        prompt = f"""
Create a 5-step plan for:

{task}

Return ONLY numbered steps.
"""

        response = ask_planner(prompt)

        update_state("planner", "completed")

        db = Neo4jConnection()
        db.save_project(task)
        db.close()

        return response