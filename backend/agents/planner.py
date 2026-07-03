from sarvam.client import ask_planner
from memory.state import update_state
from database.graph import Neo4jConnection


class PlannerAgent:

    def __init__(self):
        self.name = "Planner Agent"

    def run(self, task):

        db = Neo4jConnection()

        previous_projects = db.search_similar_projects()

        memory_context = ""

        if previous_projects:
            memory_context = "Previous Similar Projects:\n"

            for project in previous_projects:
                memory_context += f"- {project}\n"

        prompt = f"""
You are the Planner Agent of Synapse OS.

{memory_context}

Current User Task:

{task}

Using the previous knowledge when useful, create a clear 5-step execution plan.

Return ONLY the numbered steps.
"""

        response = ask_planner(prompt)

        update_state("planner", "completed")

        db.save_project(task)

        db.close()

        return response