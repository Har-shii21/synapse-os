from datetime import datetime
from typing import Dict, List


class ReviewerAgent:
    """
    Reviewer / Analyst Agent

    Responsibilities:
    - Review outputs from other agents
    - Generate final summary
    - Score execution
    - Suggest improvements
    """

    def __init__(self):
        self.name = "Reviewer Agent"

    def run(self, outputs):
        return self.summarize(outputs)

    def review(self, outputs: Dict) -> Dict:

        report = []

        score = 100

        improvements = []

        for agent, result in outputs.items():

            if result is None:
                score -= 10
                improvements.append(f"{agent} produced no output.")
                continue

            if isinstance(result, str):

                if len(result.strip()) == 0:
                    score -= 10
                    improvements.append(f"{agent} returned an empty response.")

                elif len(result) < 30:
                    score -= 5
                    improvements.append(
                        f"{agent} response is too short."
                    )

            report.append({
                "agent": agent,
                "status": "Completed"
            })

        score = max(score, 0)

        return {
            "timestamp": datetime.now().strftime("%H:%M:%S"),
            "score": score,
            "agents": report,
            "improvements": improvements
        }

    def summarize(self, outputs: Dict) -> str:

        final = []

        final.append("# Synapse OS Report\n")

        for agent, output in outputs.items():

            final.append(f"## {agent.upper()}\n")

            final.append(str(output))

            final.append("\n")

        review = self.review(outputs)

        final.append("\n")

        final.append("Overall Score : ")

        final.append(str(review["score"]))

        final.append("/100\n")

        if review["improvements"]:

            final.append("Suggested Improvements:\n")

            for item in review["improvements"]:
                final.append(f"- {item}")

        else:
            final.append("No improvements required.")

        return "\n".join(final)


reviewer_agent = ReviewerAgent()


def reviewer(outputs):

    return reviewer_agent.summarize(outputs)