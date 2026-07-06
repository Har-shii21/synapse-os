from services.voice_service import voice_service


class VoiceAgent:

    def listen(self, audio_path, language="en-IN"):

        return voice_service.speech_to_text(
            audio_path,
            language
        )

    def speak(
        self,
        text,
        language="en-IN"
    ):

        return voice_service.text_to_speech(
            text,
            language
        )


voice_agent = VoiceAgent()