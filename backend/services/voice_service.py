import logging
import os
import uuid
from pathlib import Path

from dotenv import load_dotenv
from sarvamai import SarvamAI

load_dotenv()

logging.basicConfig(
    level=logging.INFO
)

logger = logging.getLogger(
    __name__
)

client = SarvamAI(
    api_subscription_key=os.getenv(
        "SARVAM_API_KEY"
    )
)


class VoiceService:

    def __init__(self):

        self.output_dir = Path(
            "generated_audio"
        )

        self.output_dir.mkdir(
            exist_ok=True
        )

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

        self.default_language = "en-IN"

        self.default_speaker = "meera"

    # =====================================================
    # Speech To Text
    # =====================================================

    def speech_to_text(
        self,
        file_path,
        language="en-IN",
    ):

        if not os.path.exists(file_path):

            return {
                "success": False,
                "text": "",
                "language": language,
                "error": "Audio file not found.",
            }

        if not self.validate_language(
            language
        ):

            language = (
                self.default_language
            )

        try:

            logger.info(
                f"Speech → Text ({language})"
            )

            with open(
                file_path,
                "rb",
            ) as audio_file:

                response = (
                    client.speech_to_text.transcribe(
                        file=audio_file,
                        model="saaras:v3",
                        mode="transcribe",
                        language_code=language,
                        input_audio_codec="webm",
                    )
                )
                text = getattr(
                response,
                "transcript",
                ""
            ).strip()

            return {
                "success": True,
                "text": text,
                "language": language,
            }

        except Exception as e:

            logger.exception(e)

            return {
                "success": False,
                "text": "",
                "language": language,
                "error": str(e),
            }

        finally:

            try:

                if os.path.exists(file_path):

                    os.remove(file_path)

            except Exception:

                pass

    # =====================================================
    # Text To Speech
    # =====================================================

    def text_to_speech(
        self,
        text,
        language="en-IN",
        speaker=None,
        output_path=None,
    ):

        if not text.strip():

            return {
                "success": False,
                "error": "Text is empty.",
            }

        if not self.validate_language(
            language
        ):

            language = (
                self.default_language
            )

        speaker = (
            speaker
            or self.default_speaker
        )

        try:

            logger.info(
                f"Text → Speech ({language})"
            )

            audio = client.text_to_speech.convert(
                text=text,
                target_language_code=language,
                model="bulbul:v3",
                speaker=speaker,
            )
            if output_path is None:

                output_path = (
                    self.output_dir
                    / f"{uuid.uuid4().hex}.mp3"
                )

            else:

                output_path = Path(
                    output_path
                )

            with open(
                output_path,
                "wb",
            ) as f:

                f.write(
                    audio.audios[0]
                )

            return {
                "success": True,
                "audio": str(output_path),
                "speaker": speaker,
                "language": language,
            }

        except Exception as e:

            logger.exception(e)

            return {
                "success": False,
                "audio": "",
                "speaker": speaker,
                "language": language,
                "error": str(e),
            }

    # =====================================================
    # Translation
    # =====================================================

    def translate(
        self,
        text,
        target_language,
    ):

        if not text.strip():

            return {
                "success": False,
                "translated_text": "",
                "error": "Text is empty.",
            }

        if not self.validate_language(
            target_language
        ):

            target_language = (
                self.default_language
            )

        try:

            logger.info(
                f"Translate → {target_language}"
            )

            response = client.text.translate(
                input=text,
                source_language_code="auto",
                target_language_code=target_language,
            )

            translated = getattr(
                response,
                "translated_text",
                ""
            ).strip()
            return {
                "success": True,
                "translated_text": translated,
                "target_language": target_language,
            }

        except Exception as e:

            logger.exception(e)

            return {
                "success": False,
                "translated_text": text,
                "target_language": target_language,
                "error": str(e),
            }

    # =====================================================
    # Utilities
    # =====================================================

    def supported(self):

        return {
            "success": True,
            "languages": self.supported_languages,
            "default_language": self.default_language,
            "default_speaker": self.default_speaker,
        }

    def validate_language(
        self,
        language,
    ):

        return (
            language
            in self.supported_languages.values()
        )

    def available_speakers(self):

        return [
            "meera",
        ]

    def health(self):

        return {
            "success": True,
            "service": "Sarvam AI Voice",
            "languages": len(
                self.supported_languages
            ),
            "default_language": self.default_language,
            "default_speaker": self.default_speaker,
        }


voice_service = VoiceService()