import { ElevenLabsClient } from "elevenlabs";
import { client } from "../client/config";
import { TextToSpeechRequest } from "elevenlabs/api";


export async function POST(request: Request) {
  const requestBody = await request.json();

  if (!requestBody.voiceId) {
    throw new Error("Missing 'voiceId' field in the request body");
  }

  if (!requestBody.text || ! (requestBody.text.length > 0) ) {
    throw new Error("Missing 'text' field in the request body");
  }

  if (!process.env.ELEVEN_LABS_API_KEY) {
    throw new Error("Missing Eleven Labs key");
  }

  const voiceId = requestBody.voiceId;
  const text = requestBody.text;
  
  const t2sRequest: TextToSpeechRequest = {text: text, model_id: "eleven_multilingual_v2",}

  console.log("0: ", t2sRequest)

  const response = await client.textToSpeech.convert(voiceId, t2sRequest)

  console.log("1: ", response)

  const audioData = await response.read()
 

 console.log("2: ", audioData)

  return new Response(audioData,{
    headers:{
        "Content-Type":"audio/mpeg"
    }
  })

}
