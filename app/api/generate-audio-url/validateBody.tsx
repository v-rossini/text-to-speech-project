export function validateBody(requestBody: any) {
  if (!requestBody.voiceId) {
    throw new Error("Missing 'voiceId' field in the request body");
  }

  if (!requestBody.text || !(requestBody.text.length > 0)) {
    throw new Error("Missing 'text' field in the request body");
  }

  if (!process.env.ELEVEN_LABS_API_KEY) {
    throw new Error("Missing Eleven Labs key");
  }
}
