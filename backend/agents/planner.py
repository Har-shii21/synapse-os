from sarvam.client import ask_sarvam
from memory.state import update_state


class PlannerAgent:

    def __init__(self):
        self.name = "Planner Agent"


    def run(self, task):

        prompt = f"""
You are a planning agent.

Create a 5 step plan for this task:

{task}

Return ONLY this format:

1. First step
2. Second step
3. Third step
4. Fourth step
5. Fifth step
"""

        
        update_state("planner", "completed")
        return ask_sarvam(prompt)