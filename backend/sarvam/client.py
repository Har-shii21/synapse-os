import os
from dotenv import load_dotenv
from sarvamai import SarvamAI

load_dotenv()

client = SarvamAI(
    api_subscription_key=os.getenv("SARVAM_API_KEY")
)


def ask_sarvam(prompt: str):

    response = client.chat.completions(
        model="sarvam-30b",
        max_tokens=1500,
        messages=[
            {
                "role": "system",
                "content": """
You are a planner AI.
Do not explain your thinking.
Do not analyze the request.
Only output the final 5 numbered steps.
"""
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    message = response.choices[0].message

    text = message.reasoning_content or ""

    lines = text.split("\n")

    steps = []

    for line in lines:
        line = line.strip()

        if (
            line.startswith("1.")
            or line.startswith("2.")
            or line.startswith("3.")
            or line.startswith("4.")
            or line.startswith("5.")
        ):
            steps.append(line)

    return "\n".join(steps[-5:])