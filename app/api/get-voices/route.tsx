import { ElevenLabs } from "elevenlabs";
import { client } from "../client/config";


export async function GET(request: Request) {
  const response: ElevenLabs.GetVoicesResponse = await client.voices.getAll();
  
  return response
}

