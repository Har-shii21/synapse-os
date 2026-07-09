import uuid
from pathlib import Path

from services.voice_service import voice_service


class VoiceAgent:
    """
    Voice Agent

    Features
    --------
    • Speech → Text
    • Text → Speech
    • Translation
    • Supported language helper
    • Unique audio filenames
    • Safe error handling
    """

    def __init__(self):
        self.audio_directory = Path("generated_audio")
        self.audio_directory.mkdir(exist_ok=True)

        self.supported_languages = {
            "English": "en-IN",
            "Hindi": "hi-IN",
            "Telugu": "te-IN",
            "Tamil": "ta-IN",
            "Kannada": "kn-IN",
            "Malayalam": "ml-IN",
            "Marathi": "mr-IN",
            "Gujarati": "gu-IN",
            "Bengali": "bn-IN",
            "Punjabi": "pa-IN",
        }

    # ===================================
    # Speech → Text
    # ===================================

    def listen(
        self,
        audio_path: str,
        language: str = "en-IN",
    ):

        try:

            return voice_service.speech_to_text(
                audio_path,
                language,
            )

        except Exception as e:

            return {
                "success": False,
                "text": "",
                "error": str(e),
            }

    # ===================================
    # Text → Speech
    # ===================================

    def speak(
        self,
        text: str,
        language: str = "en-IN",
    ):

        try:

            filename = self.audio_directory / f"{uuid.uuid4().hex}.mp3"

            result = voice_service.text_to_speech(
                text=text,
                language=language,
                output_path=str(filename),
            )

            audio_url = f"/generated_audio/{filename.name}"

            if isinstance(result, dict):
                result["audio"] = audio_url
                return result

            return {
                "success": True,
                "audio": audio_url,
                "result": result,
            }

        except Exception as e:

            return {
                "success": False,
                "error": str(e),
            }

    # ===================================
    # Translation
    # ===================================

    def translate(
        self,
        text: str,
        target_language: str,
    ):

        try:

            return voice_service.translate(
                text=text,
                target_language=target_language,
            )

        except Exception as e:

            return {
                "success": False,
                "error": str(e),
            }

    # ===================================
    # Helpers
    # ===================================

    def languages(self):

        return self.supported_languages

    def is_supported(self, language: str):

        return language in self.supported_languages.values()


voice_agent = VoiceAgent()