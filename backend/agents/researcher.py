from sarvam.client import ask_researcher
from memory.state import update_state


class ResearchAgent:

    def __init__(self):
        self.name = "Research Agent"

    def run(self, plan):

        prompt = f"""
You are the Research Agent of Synapse OS.

The Planner has already created the following execution plan.

Planner Output:
{plan}

Your job is to help the Engineer.

Research and provide:

- Best practices
- Technologies
- Risks
- Recommendations

Return only the research.
"""

        response = ask_researcher(prompt)

        update_state("researcher", "completed")

        return response