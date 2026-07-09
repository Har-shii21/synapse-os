from sarvam.client import ask_analyst
from memory.state import update_state


class AnalystAgent:

    def __init__(self):
        self.name = "Analyst Agent"

    def run(self, input_text):

        response = ask_analyst(input_text)

        update_state("analyst", "completed")

        return response