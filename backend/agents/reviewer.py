from memory.state import update_state
class ReviewerAgent:

    def run(self, execution_results):
        completed = len(execution_results)
        update_state("reviewer", "completed")

        return {
            "status": "Approved",
            "completed_tasks": completed,
            "message": "Workflow completed successfully"
        }