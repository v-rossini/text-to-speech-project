import { ElevenLabsClient } from "elevenlabs";

export const client = new ElevenLabsClient(
    { apiKey: `${process.env.ELEVEN_LABS_API_KEY}` }
);

