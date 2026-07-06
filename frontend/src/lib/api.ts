const API = "http://127.0.0.1:8000";

export async function runAgent(task: string) {
  const res = await fetch(`${API}/run-agent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });

  return await res.json();
}

export async function speechToText(
  file: File,
  language: string = "en-IN"
) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("language", language);

  const res = await fetch(`${API}/speech-to-text`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
}

export async function textToSpeech(
  text: string,
  language: string = "en-IN"
) {
  const res = await fetch(`${API}/text-to-speech`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      language,
    }),
  });

  return await res.json();
}

export async function getAnalytics() {
  const res = await fetch(`${API}/analytics`);
  return await res.json();
}

export async function getKnowledgeGraph() {
  const res = await fetch(`${API}/knowledge-graph`);
  return await res.json();
}

export async function getReplay() {
  const res = await fetch(`${API}/replay`);
  return await res.json();
}

export async function getProjects() {
  const res = await fetch(`${API}/projects`);
  return await res.json();
}

export async function getWorkflowStatus() {
  const res = await fetch(`${API}/workflow-status`);
  return await res.json();
}

export async function getAgentStatus() {
  const res = await fetch(`${API}/agent-status`);
  return await res.json();
}