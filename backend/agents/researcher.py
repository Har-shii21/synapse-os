from sarvam.client import ask_researcher
from memory.state import update_state


class ResearchAgent:

    def __init__(self):
        self.name = "Research Agent"

    def run(self, plan):

        prompt = f"""
You are the Research Agent of Synapse OS.

Analyze the following execution plan and provide:

- Best practices
- Relevant technologies
- Possible risks
- Recommendations

Execution Plan:

{plan}
"""

        response = ask_researcher(prompt)

        update_state("researcher", "completed")

        return response