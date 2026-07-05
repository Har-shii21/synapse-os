from sarvam.client import ask_reviewer
from memory.state import update_state


class ReviewerAgent:

    def __init__(self):
        self.name = "Reviewer Agent"

    def run(self, code):

        prompt = f"""
You are the Reviewer Agent of Synapse OS.

Review the following implementation.

Engineer Output:

{code}

Evaluate:

- Completeness
- Correctness
- Security
- Scalability
- Missing Features

Provide:

- Strengths
- Weaknesses
- Improvements
- Final Verdict

Return only the review.
"""

        response = ask_reviewer(prompt)

        update_state("reviewer", "completed")

        return response