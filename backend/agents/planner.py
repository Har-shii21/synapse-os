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
You are a planning AI.

Create EXACTLY 5 numbered steps.

Each step must be one short sentence.

Do not explain anything else.

Never stop before step 5.
"""

        response = ask_planner(prompt)

        print("=" * 50)
        print("PLANNER RESPONSE:")
        print(response)
        print("=" * 50)

        update_state("planner", "completed")

        db.save_project(task)

        db.close()

        return response