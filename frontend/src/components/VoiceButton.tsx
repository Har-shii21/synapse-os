"use client";

import { useRef, useState } from "react";
import { speechToText } from "../lib/api";

interface Props {
  onTranscript: (text: string) => void;
}

export default function VoiceButton({ onTranscript }: Props) {
  const [recording, setRecording] = useState(false);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const recorder = new MediaRecorder(stream);

    mediaRecorder.current = recorder;
    chunks.current = [];

    recorder.ondataavailable = (event) => {
      chunks.current.push(event.data);
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunks.current, {
        type: "audio/webm",
      });

      const file = new File([blob], "voice.webm", {
        type: "audio/webm",
      });

      try {
        const result = await speechToText(file);

        console.log(result);

        const text =
          result.text ||
          result.transcript ||
          "";

        if (text) {
          onTranscript(text);
        }

      } catch (err) {
        console.error(err);
      }
    };

    recorder.start();
    setRecording(true);
  }

  function stopRecording() {
    mediaRecorder.current?.stop();
    setRecording(false);
  }

  return (
    <button
      onClick={recording ? stopRecording : startRecording}
      className="rounded-xl bg-slate-700 px-5 py-3 hover:bg-slate-600"
    >
      {recording ? "⏹ Stop Recording" : "🎤 Voice"}
    </button>
  );
}