import re
from typing import Dict


class SecurityAgent:
    """
    Security Agent

    Responsibilities:
    - Detect dangerous prompts
    - Detect prompt injection
    - Detect secrets
    - Detect API keys
    - Detect shell commands
    """

    def __init__(self):
        self.blocked_keywords = [
            "rm -rf",
            "sudo",
            "drop database",
            "delete database",
            "format c:",
            "shutdown",
            "hack",
            "exploit",
            "malware",
            "virus",
            "bypass",
            "ignore previous instructions",
            "system prompt",
            "reveal prompt"
        ]

    def scan(self, message: str) -> Dict:

        issues = []

        text = message.lower()

        # Blocked keywords
        for keyword in self.blocked_keywords:
            if keyword in text:
                issues.append(f"Blocked keyword detected: {keyword}")

        # API Key Detection
        api_pattern = r"(sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z\-_]{35}|Bearer\s+[A-Za-z0-9\-_.]+)"

        if re.search(api_pattern, message):
            issues.append("Possible API key detected.")

        # Password Detection
        password_pattern = r"(password\s*=\s*['\"].+?['\"])"

        if re.search(password_pattern, message):
            issues.append("Hardcoded password detected.")

        # Shell Commands
        shell_commands = [
            "curl",
            "wget",
            "chmod",
            "chown",
            "powershell",
            "cmd.exe"
        ]

        for command in shell_commands:
            if command in text:
                issues.append(f"Shell command detected: {command}")

        return {
            "safe": len(issues) == 0,
            "issues": issues
        }


security_agent = SecurityAgent()


def security(input_text: str):

    result = security_agent.scan(input_text)

    if result["safe"]:
        return input_text

    report = "⚠️ Security Review\n\n"

    for issue in result["issues"]:
        report += f"• {issue}\n"

    report += "\nPotential risks detected."

    return report