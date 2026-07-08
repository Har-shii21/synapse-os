from services.sarvam_service import SarvamService


class SecurityAgent:

    def __init__(self):
        self.llm = SarvamService()

    def run(self, input_text):

        prompt = f"""
You are a Security AI Agent.

Review the following project and identify:

1. Security vulnerabilities
2. Authentication issues
3. Data privacy concerns
4. Best security practices
5. Suggestions to improve security

Project:

{input_text}
"""

        return self.llm.chat(prompt)