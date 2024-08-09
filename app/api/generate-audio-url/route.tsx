import { client } from "../client/config";
import { TextToSpeechRequest } from "elevenlabs/api";
import { put } from '@vercel/blob';
import { v4 } from 'uuid';
import { NextResponse } from "next/server";
import { validateBody } from "./validateBody";


export async function POST(request: Request): Promise<NextResponse> {
  const requestBody = await request.json();

  validateBody(requestBody);

  const voiceId = requestBody.voiceId;
  const fileName = `${v4()}.mp3`;
  const t2sRequest: TextToSpeechRequest = {text: requestBody.text, model_id: "eleven_multilingual_v2",}

  const response = await client.textToSpeech.convert(voiceId, t2sRequest)

  const blob = await put(fileName, response, {
    access: 'public',
  });

  return NextResponse.json(blob);
}


