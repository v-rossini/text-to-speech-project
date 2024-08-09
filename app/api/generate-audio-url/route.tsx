import { ElevenLabsClient } from "elevenlabs";
import { client } from "../client/config";
import { TextToSpeechRequest } from "elevenlabs/api";
import { put } from '@vercel/blob';
import { v4 } from 'uuid';
import { NextResponse } from "next/server";


export async function POST(request: Request): Promise<NextResponse> {
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
  const uuid: string = v4()
  const ElevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`

  const t2sRequest: TextToSpeechRequest = {text: text, model_id: "eleven_multilingual_v2",}

  console.log("0: ", t2sRequest)

  const response = await client.textToSpeech.convert(voiceId, t2sRequest)

  console.log("1: ", response)
/*
  const response2 = await fetch(ElevenLabsUrl, {
    method: "POST",
    body: JSON.stringify(t2sRequest)})
    */
  

  const audioData = await response.read()
  const jsBlob = new Blob([audioData], { type: "audio/mpeg" });

  //const audioData2 = await response2.arrayBuffer()

  console.log("2: ", audioData)

  const blob = await put(`${uuid}.mp3`, jsBlob, {
    access: 'public',
  });

  console.log("blob: ", blob)

  return NextResponse.json(blob);

}
