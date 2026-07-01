from sarvam.client import ask_sarvam


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

        return ask_sarvam(prompt)