from agents.planner import PlannerAgent


planner = PlannerAgent()

result = planner.run(
    "Build a website for an AI startup"
)

print(result)