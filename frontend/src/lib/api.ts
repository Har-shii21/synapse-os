const API_URL =
  "http://127.0.0.1:8000";

async function request(
  endpoint: string,
  options?: RequestInit
) {
  try {

    const response = await fetch(
      `${API_URL}${endpoint}`,
      options
    );

    if (!response.ok) {

      let message = "Request failed";

      try {

        const error = await response.json();

        message =
          error.detail ||
          error.error ||
          message;

      } catch {}

      throw new Error(message);

    }

    return await response.json();

  } catch (err) {

    console.error("API Error:", err);

    return err;

  }
}


export async function runAgent(task: string) {

  const result = await request(
    "/run-agent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task,
      }),
    }
  );

  console.log("Backend Response:", result);

  return result;
}

export async function getProjects() {

  return request(
    "/projects"
  );

}

export async function getWorkflowStatus() {

  return request(
    "/workflow-status"
  );

}

export async function getAgentStatus() {

  return request(
    "/agent-status"
  );

}

export async function getKnowledgeGraph() {

  return request(
    "/knowledge-graph"
  );

}
export async function getAnalytics() {

  return request(
    "/analytics"
  );

}

export async function getReplay() {

  return request(
    "/replay"
  );

}

export async function speechToText(
  file: File,
  language = "en-IN"
) {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  formData.append(
    "language",
    language
  );

  const response =
    await fetch(
      `${API_URL}/speech-to-text`,
      {
        method: "POST",
        body: formData,
      }
    );

  if (!response.ok) {

    throw new Error(
      "Speech recognition failed."
    );

  }

  return response.json();

}

export async function textToSpeech(
  text: string,
  language = "en-IN"
) {

  return request(
    "/text-to-speech",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        text,
        language,
      }),
    }
  );

}