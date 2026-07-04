from sarvam.client import ask_engineer
from memory.state import update_state


class EngineerAgent:

    def __init__(self):
        self.name = "Engineer Agent"

    def run(self, research):

        prompt = f"""
You are the Engineer Agent of Synapse OS.

Using the research below, design a technical implementation.

Include:
- System Architecture
- Backend
- Frontend
- Database
- APIs
- Workflow

Research:

{research}
"""

        response = ask_engineer(prompt)

        update_state("engineer", "completed")

        return response