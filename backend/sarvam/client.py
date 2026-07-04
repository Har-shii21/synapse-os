import os
from dotenv import load_dotenv
from sarvamai import SarvamAI

load_dotenv()

client = SarvamAI(
    api_subscription_key=os.getenv("SARVAM_API_KEY")
)


def ask_planner(prompt: str):

    response = client.chat.completions(
        model="sarvam-30b",
        max_tokens=1500,
        messages=[
            {
                "role": "system",
                "content": """
You are a planning AI.

Create exactly 5 numbered steps.

Do not explain.
Only return the final plan.
"""
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content


def ask_researcher(prompt: str):

    response = client.chat.completions(
        model="sarvam-30b",
        max_tokens=2000,
        messages=[
            {
                "role": "system",
                "content": """
You are the Research Agent of Synapse OS.

Research the task thoroughly.

Provide:
- Best practices
- Risks
- Technologies
- Recommendations

Return only the research.
"""
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content


def ask_engineer(prompt: str):

    response = client.chat.completions(
        model="sarvam-30b",
        max_tokens=3000,
        messages=[
            {
                "role": "system",
                "content": """
You are the Engineer Agent of Synapse OS.

Using the research provided,
design a technical implementation.

Include:
- Architecture
- Components
- APIs
- Database
- Workflow

Return only the implementation.
"""
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content


def ask_reviewer(prompt: str):

    response = client.chat.completions(
        model="sarvam-30b",
        max_tokens=3000,
        messages=[
            {
                "role": "system",
                "content": """
You are an expert software reviewer.

Review the execution and provide constructive feedback.
"""
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content