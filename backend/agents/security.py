from sarvam.client import ask_security
from memory.state import update_state


class SecurityAgent:

    def __init__(self):
        self.name = "Security Agent"

    def run(self, input_text):

        response = ask_security(input_text)

        update_state("security", "completed")

        return response