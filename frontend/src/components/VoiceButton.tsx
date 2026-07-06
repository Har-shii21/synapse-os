"use client";

import { useEffect, useRef, useState } from "react";

import { speechToText } from "../lib/api";

interface Props {

  language: string;

  disabled?: boolean;

  onTranscript: (
    text: string
  ) => void;

}

export default function VoiceButton({

  language,

  disabled,

  onTranscript,

}: Props) {

  const [recording, setRecording] =
    useState(false);

  const [processing, setProcessing] =
    useState(false);

  const [seconds, setSeconds] =
    useState(0);

  const mediaRecorder =
    useRef<MediaRecorder | null>(null);

  const mediaStream =
    useRef<MediaStream | null>(null);

  const chunks =
    useRef<Blob[]>([]);

  const timer =
    useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {

    if (recording) {

      timer.current = setInterval(() => {

        setSeconds((prev) => prev + 1);

      }, 1000);

    } else {

      if (timer.current) {

        clearInterval(timer.current);

      }

      setSeconds(0);

    }

    return () => {

      if (timer.current) {

        clearInterval(timer.current);

      }

    };

  }, [recording]);

  async function startRecording() {

    if (
      disabled ||
      processing ||
      recording
    )
      return;

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      mediaStream.current =
        stream;

      const recorder =
        new MediaRecorder(stream);

      mediaRecorder.current =
        recorder;

      chunks.current = [];
      recorder.ondataavailable = (
        event
      ) => {

        if (event.data.size > 0) {

          chunks.current.push(
            event.data
          );

        }

      };

      recorder.onstop =
        async () => {

          setProcessing(true);

          try {

            const blob =
              new Blob(
                chunks.current,
                {
                  type: "audio/webm",
                }
              );

            const file =
              new File(
                [blob],
                "voice.webm",
                {
                  type: "audio/webm",
                }
              );

            const result =
              await speechToText(
                file,
                language
              );

            const text =
              result.text ||
              result.transcript ||
              "";

            if (
              text.trim()
            ) {

              onTranscript(
                text
              );

            }

          } catch (err) {

            console.error(err);

            alert(
              "Unable to convert speech."
            );

          } finally {

            mediaStream.current
              ?.getTracks()
              .forEach(
                (track) =>
                  track.stop()
              );

            mediaStream.current =
              null;

            setProcessing(
              false
            );

          }

        };

      recorder.start();

      setRecording(
        true
      );

    } catch (err) {

      console.error(err);

      alert(
        "Microphone permission denied."
      );

    }

  }

  function stopRecording() {

    mediaRecorder.current?.stop();

    setRecording(
      false
    );

  }

  return (

    <button
      disabled={
        disabled ||
        processing
      }
      onClick={
        recording
          ? stopRecording
          : startRecording
      }
      className="rounded-xl bg-slate-700 px-5 py-3 transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
    >

      {processing ? (
        "⏳ Processing..."
      ) : recording ? (
        `⏹ Stop (${seconds}s)`
      ) : (
        "🎤 Voice"
      )}

    </button>

  );

}