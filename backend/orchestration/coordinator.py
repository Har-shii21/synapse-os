import time

from agents.planner import PlannerAgent
from agents.researcher import ResearchAgent
from agents.engineer import EngineerAgent
from agents.security import SecurityAgent
from agents.analyst import AnalystAgent
from agents.reviewer import ReviewerAgent

from memory.shared_memory import SharedMemory
from memory.agent_status import update_agent
from memory.state import update_progress, update_state


class Coordinator:

    def __init__(self):
        self.planner = PlannerAgent()
        self.researcher = ResearchAgent()
        self.engineer = EngineerAgent()
        self.security = SecurityAgent()
        self.analyst = AnalystAgent()
        self.reviewer = ReviewerAgent()

        self.memory = SharedMemory()

    def execute(self, prompt: str):

        timings = {}

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
        update_progress(prompt, 60)

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
        # Security
        # ==========================
        update_agent("security", "running")
        update_state("security", "running")
        update_progress(prompt, 75)

        start = time.time()

        security_input = f"""
TASK:
{self.memory.read('task')}

PLAN:
{self.memory.read('plan')}

RESEARCH:
{self.memory.read('research')}

CODE:
{self.memory.read('code')}
"""

        security = self.security.run(security_input)

        timings["security"] = round(time.time() - start, 2)

        self.memory.write("security", security)

        update_agent("security", "completed")
        update_state("security", "completed")

        # ==========================
        # Analyst
        # ==========================
        update_agent("analyst", "running")
        update_state("analyst", "running")
        update_progress(prompt, 90)

        start = time.time()

        analyst_input = f"""
TASK:
{self.memory.read('task')}

PLAN:
{self.memory.read('plan')}

RESEARCH:
{self.memory.read('research')}

CODE:
{self.memory.read('code')}

SECURITY:
{self.memory.read('security')}
"""

        analysis = self.analyst.run(analyst_input)

        timings["analyst"] = round(time.time() - start, 2)

        self.memory.write("analysis", analysis)

        update_agent("analyst", "completed")
        update_state("analyst", "completed")

        # ==========================
        # Reviewer
        # ==========================
        update_agent("reviewer", "running")
        update_state("reviewer", "running")
        update_progress(prompt, 95)

        start = time.time()

        reviewer_input = {
            "task": self.memory.read("task"),
            "planner": self.memory.read("plan"),
            "researcher": self.memory.read("research"),
            "engineer": self.memory.read("code"),
            "security": self.memory.read("security"),
            "analyst": self.memory.read("analysis"),
        }

        review = self.reviewer.run(reviewer_input)

        timings["reviewer"] = round(time.time() - start, 2)

        self.memory.write("review", review)

        update_agent("reviewer", "completed")
        update_state("reviewer", "completed")

        update_progress(prompt, 100)

        timings["total"] = round(
            timings["planner"]
            + timings["researcher"]
            + timings["engineer"]
            + timings["security"]
            + timings["analyst"]
            + timings["reviewer"],
            2,
        )

        return {
            "task": prompt,
            "plan": plan,
            "research": research,
            "code": code,
            "security": security,
            "analysis": analysis,
            "review": review,
            "memory": self.memory.read_all(),
            "timings": timings,
        }