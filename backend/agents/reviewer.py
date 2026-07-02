from sarvam.client import ask_reviewer
from memory.state import update_state


class ReviewerAgent:

    def run(self, execution_results):

        prompt = f"""
Review this execution:

{execution_results}

Return ONLY this format:

Overall Score: X/10

Strengths:
- ...

Improvements:
- ...

Final Verdict:
Approved / Needs Improvement
"""

        review = ask_reviewer(prompt)

        update_state("reviewer", "completed")

        return review