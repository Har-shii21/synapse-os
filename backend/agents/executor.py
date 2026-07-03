import time

from memory.state import update_state, update_progress


class ExecutorAgent:

    def run(self, tasks):

        results = []

        agents = [
            "researcher",
            "engineer",
            "security",
            "analyst"
        ]

        total = len(tasks)

        for i, task in enumerate(tasks):

            if i < len(agents):
                update_state(agents[i], "running")

            update_progress(
                task,
                int(((i + 1) / total) * 100)
            )

            time.sleep(1)

            results.append(
                f"Completed: {task}"
            )

            if i < len(agents):
                update_state(agents[i], "completed")

        return results