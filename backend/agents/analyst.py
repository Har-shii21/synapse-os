from services.sarvam_service import SarvamService


class AnalystAgent:

    def __init__(self):
        self.llm = SarvamService()

    def run(self, input_text):

        prompt = f"""
You are an AI Analyst.

Analyze the completed project and provide:

1. Project quality
2. Completeness
3. Performance
4. Scalability
5. Estimated success rate
6. Overall score out of 10

Project:

{input_text}
"""

        return self.llm.chat(prompt)