import time

from agents.planner import PlannerAgent
from agents.researcher import ResearchAgent
from agents.engineer import EngineerAgent
from agents.reviewer import ReviewerAgent

from memory.shared_memory import SharedMemory
from memory.agent_status import update_agent
from memory.state import update_progress, update_state


class Coordinator:

    def __init__(self):
        self.planner = PlannerAgent()
        self.researcher = ResearchAgent()
        self.engineer = EngineerAgent()
        self.reviewer = ReviewerAgent()

        self.memory = SharedMemory()

    def execute(self, prompt: str):

        timings = {}

        # Reset workflow
        update_progress(prompt, 0)

        self.memory.clear()
        self.memory.write("task", prompt)

        # ==========================
        # Planner
        # ==========================
        update_agent("planner", "running")
        update_state("planner", "running")
        update_progress(prompt, 20)

        start = time.time()

        plan = self.planner.run(prompt)

        timings["planner"] = round(time.time() - start, 2)

        self.memory.write("plan", plan)

        update_agent("planner", "completed")
        update_state("planner", "completed")

        # ==========================
        # Researcher
        # ==========================
        update_agent("researcher", "running")
        update_state("researcher", "running")
        update_progress(prompt, 40)

        start = time.time()

        research_input = f"""
TASK:
{self.memory.read('task')}

PLAN:
{self.memory.read('plan')}
"""

        research = self.researcher.run(research_input)

        timings["researcher"] = round(time.time() - start, 2)

        self.memory.write("research", research)

        update_agent("researcher", "completed")
        update_state("researcher", "completed")

        # ==========================
        # Engineer
        # ==========================
        update_agent("engineer", "running")
        update_state("engineer", "running")
        update_progress(prompt, 70)

        start = time.time()

        engineer_input = f"""
TASK:
{self.memory.read('task')}

PLAN:
{self.memory.read('plan')}

RESEARCH:
{self.memory.read('research')}
"""

        code = self.engineer.run(engineer_input)

        timings["engineer"] = round(time.time() - start, 2)

        self.memory.write("code", code)

        update_agent("engineer", "completed")
        update_state("engineer", "completed")

        # ==========================
        # Reviewer
        # ==========================
        update_agent("reviewer", "running")
        update_state("reviewer", "running")
        update_progress(prompt, 90)

        start = time.time()

        reviewer_input = f"""
TASK:
{self.memory.read('task')}

PLAN:
{self.memory.read('plan')}

RESEARCH:
{self.memory.read('research')}

IMPLEMENTATION:
{self.memory.read('code')}
"""

        review = self.reviewer.run(reviewer_input)

        timings["reviewer"] = round(time.time() - start, 2)

        self.memory.write("review", review)

        update_agent("reviewer", "completed")
        update_state("reviewer", "completed")

        # Workflow Complete
        update_progress(prompt, 100)

        timings["total"] = round(
            timings["planner"]
            + timings["researcher"]
            + timings["engineer"]
            + timings["reviewer"],
            2,
        )

        return {
            "task": prompt,
            "plan": plan,
            "research": research,
            "code": code,
            "review": review,
            "memory": self.memory.read_all(),
            "timings": timings,
        }