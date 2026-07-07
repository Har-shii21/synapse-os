import os
from dotenv import load_dotenv
from sarvamai import SarvamAI

load_dotenv()

client = SarvamAI(
    api_subscription_key=os.getenv("SARVAM_API_KEY")
)


# -------------------------
# Speech -> Text
# -------------------------
def speech_to_text(audio_path, language="en-IN"):

    with open(audio_path, "rb") as audio_file:

        response = client.speech_to_text.transcribe(
            file=audio_file,
            model="saaras:v3",
            language_code=language,
            input_audio_codec="webm",
            mode="transcribe",
        )

    return response.transcript


# -------------------------
# Translate
# -------------------------
def translate(text, target_language):

    response = client.text.translate(
        input=text,
        source_language_code="auto",
        target_language_code=target_language,
    )

    return response.translated_text


# -------------------------
# Text -> Speech
# -------------------------
def text_to_speech(text, language="en-IN"):

    audio = client.text_to_speech.convert(
        text=text,
        target_language_code=language,
        model="bulbul:v3",
        speaker="priya",
    )

    output = "generated_voice.mp3"

    with open(output, "wb") as f:
        f.write(audio.audios[0])

    return output