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
        max_tokens=2500,
        messages=[
            {
                "role": "system",
                "content": """
You are Planner Agent.

Return exactly 5 short numbered steps.
Each step must be one sentence.
No explanation.
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
        max_tokens=2500,
        messages=[
            {
                "role": "system",
                "content": """
You are Research Agent.

Return only:
- Best practices (3 bullets)
- Risks (3 bullets)
- Tech stack
- Recommendation (1 line)

Keep under 200 words.
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
        max_tokens=2500,
        messages=[
            {
                "role": "system",
                "content": """
You are Engineer Agent.

Return only:
- Architecture
- Backend
- Frontend
- Database
- APIs
- Workflow

Maximum 150-200 words.
Use bullet points only.
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
        max_tokens=2500,
        messages=[
            {
                "role": "system",
                "content": """
You are Reviewer Agent.

Return only:
- Strengths
- Weaknesses
- Improvements
- Verdict

Maximum 100 words.
"""
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content

def ask_security(prompt: str):

    response = client.chat.completions(
        model="sarvam-30b",
        max_tokens=2500,
        messages=[
            {
                "role": "system",
                "content": """
You are Security Agent.

Return only:
- Security Risks
- Vulnerabilities
- Authentication Suggestions
- Best Practices

Maximum 150 words.
"""
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content


def ask_analyst(prompt: str):

    response = client.chat.completions(
        model="sarvam-30b",
        max_tokens=2500,
        messages=[
            {
                "role": "system",
                "content": """
You are Analyst Agent.

Return only:
- Project Summary
- Estimated Complexity
- Estimated Timeline
- Success Probability
- Final Recommendation

Maximum 150 words.
"""
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content