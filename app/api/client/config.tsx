import { ElevenLabsClient } from "elevenlabs";

export const client = new ElevenLabsClient(
    { apiKey: `${process.env.ELEVEN_LABS_API_KEY}` }
    //{ apiKey: "sk_3f85eac2bede5766fbddf90ca0e2a7364837a16fac53bcd2" }
);

