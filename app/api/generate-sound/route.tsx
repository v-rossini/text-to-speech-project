import { ElevenLabsClient } from "elevenlabs";

const baseUrl = "https://api.elevenlabs.io/"

const client = new ElevenLabsClient(
    { apiKey: `${process.env.ELEVEN_LABS_API_KEY}` }
);



export async function POST(request: Request) {
  const requestBody = await request.json();

  if (!requestBody.voiceId) {
    throw new Error("Missing 'voice id' field in the request body");
  }

  if (!requestBody.textInput) {
    throw new Error("Missing 'input' field in the request body");
  }

  if (!process.env.ELEVEN_LABS_API_KEY) {
    throw new Error("Missing Eleven Labs key");
  }

  const voiceId = requestBody.voiceId;
  const textInput = requestBody.textInput;

  const response = await client.textToSpeech.convert(voiceId,
    {
      model_id: "eleven_multilingual_v2",
      text: textInput
    }
  )
/*
  const response = await fetch(voiceId, {
    headers: {
      Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ inputs: input }),
  });
  
  if(!response.ok){
    throw new Error("Request Failed")
  }
  
  const audioData = await response.arrayBuffer();
  */
 const audioData = response.read()

  return new Response(audioData,{
    headers:{
        "Content-Type":"audio/mpeg"
    }
  })

}
