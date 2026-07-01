from sarvam.client import ask_sarvam

result = ask_sarvam("Create a simple project plan for an AI agent")

print(result.choices[0].message.content)