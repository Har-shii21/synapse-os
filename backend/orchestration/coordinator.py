from agents.planner import PlannerAgent
from agents.researcher import ResearchAgent
from agents.engineer import EngineerAgent
from agents.reviewer import ReviewerAgent

from memory.shared_memory import SharedMemory


class Coordinator:

    def __init__(self):
        self.planner = PlannerAgent()
        self.researcher = ResearchAgent()
        self.engineer = EngineerAgent()
        self.reviewer = ReviewerAgent()

        self.memory = SharedMemory()

    def execute(self, prompt: str):

        plan = self.planner.run(prompt)
        self.memory.write("plan", plan)

        research = self.researcher.run(plan)
        self.memory.write("research", research)

        code = self.engineer.run(research)
        self.memory.write("code", code)

        review = self.reviewer.run(code)
        self.memory.write("review", review)

        return {
            "plan": plan,
            "research": research,
            "code": code,
            "review": review,
            "memory": self.memory.read_all(),
        }