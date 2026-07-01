from agents.planner import PlannerAgent
from agents.researcher import ResearchAgent
from agents.engineer import EngineerAgent
from agents.reviewer import ReviewerAgent


class Coordinator:

    def __init__(self):
        self.planner = PlannerAgent()
        self.researcher = ResearchAgent()
        self.engineer = EngineerAgent()
        self.reviewer = ReviewerAgent()

    def execute(self, prompt: str):

        plan = self.planner.run(prompt)

        research = self.researcher.run(plan)

        code = self.engineer.run(research)

        review = self.reviewer.run(code)

        return {
            "plan": plan,
            "research": research,
            "code": code,
            "review": review,
        }