import os
from dotenv import load_dotenv
from sarvamai import SarvamAI

load_dotenv()

client = SarvamAI(
    api_subscription_key=os.getenv("SARVAM_API_KEY")
)


class VoiceService:

    def speech_to_text(
        self,
        file_path,
        language="en-IN"
    ):

        try:

            with open(file_path, "rb") as audio_file:

                response = client.speech_to_text.transcribe(
                    file=audio_file,
                    model="saaras:v3",
                    mode="transcribe",
                    language_code=language,
                    input_audio_codec="webm",
                )

            return {
                "success": True,
                "text": response.transcript
            }

        except Exception as e:

            return {
                "success": False,
                "error": str(e)
            }

    def text_to_speech(
        self,
        text,
        language="en-IN",
        speaker="meera"
    ):

        try:

            audio = client.text_to_speech.convert(
                text=text,
                target_language_code=language,
                model="bulbul:v3",
                speaker=speaker
            )

            output = "generated_voice.mp3"

            with open(output, "wb") as f:
                f.write(audio.audios[0])

            return {
                "success": True,
                "audio": output
            }

        except Exception as e:

            return {
                "success": False,
                "error": str(e)
            }


voice_service = VoiceService()