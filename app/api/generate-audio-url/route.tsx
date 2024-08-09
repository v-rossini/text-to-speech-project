import { ElevenLabsClient } from "elevenlabs";
import { client } from "../client/config";
import { TextToSpeechRequest } from "elevenlabs/api";
import { put } from '@vercel/blob';
import { v4 } from 'uuid';
import { NextResponse } from "next/server";
import { createWriteStream } from "fs";


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
  const fileName = `${v4()}.mp3`;

  const t2sRequest: TextToSpeechRequest = {text: text, model_id: "eleven_multilingual_v2",}

  const response = await client.textToSpeech.convert(voiceId, t2sRequest)

  const blob = await put(fileName, response, {
    access: 'public',
  });

  return NextResponse.json(blob);

}
