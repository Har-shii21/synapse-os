from sarvam.client import ask_engineer
from memory.state import update_state


class EngineerAgent:

    def __init__(self):
        self.name = "Engineer Agent"

    def run(self, research):

        prompt = f"""
You are the Engineer Agent of Synapse OS.

Research Output:

{research}

Design the implementation.

Include:

- System Architecture
- Backend
- Frontend
- Database
- APIs
- Workflow

Return only the implementation.
"""

        response = ask_engineer(prompt)
        
        print("=" * 50)
        print("ENGINEER RESPONSE:")
        print(response)
        print("=" * 50)
        
        update_state("engineer", "completed")

        return response