from memory.state import update_state
class ExecutorAgent:

    def run(self, tasks):
        results = []
        update_state("executor", "completed")

        for task in tasks:
            results.append(
                f"Completed: {task}"
            )

        return results