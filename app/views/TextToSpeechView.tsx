"use client"

import { GenerateSoundForm } from "@/components/GenerateSoundForm";
import Loader from "@/components/Loader";
import { VoicesTable } from "@/components/VoicesTable/VoicesTable";
import { ElevenLabs } from "elevenlabs";
import { useEffect, useState } from "react";
import { GET as getVoices } from "../api/get-voices/route";
import { VoicesTableProps } from "@/components/VoicesTable/VoicesTableProps";
import { Spin } from "antd";

/**
 * Represents the request payload for generating sound using a pre-trained model.
 */
/**
 * The main view component for generating sound using a pre-trained model.
 */


export default function TextToSpeechView() {
  // State to manage loading status and audio URL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [voices, setVoices] = useState<VoicesTableProps>( {dataSource: []} )
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const callback = async () => {
      const voiceData: ElevenLabs.GetVoicesResponse = await getVoices(new Request(""));
      setVoices({...voices,
        dataSource: voiceData.voices
      })
      setIsLoading(false);
    }

    callback()

  }, [])

  return (
    
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/3 p-4">
        
          <div className="ml-8 mr-8 mt-4 mb-4 text-xl">
            <h1>Text to Speech</h1>
          </div>
          {/* Render the form component for generating sound */}
          <Spin size="large" spinning={isLoading} delay={300}>
            <VoicesTable {...voices} />
            <GenerateSoundForm />
        </Spin>
      </div>
      <div className="w-full md:w-2/3 p-4 bg-gray-200 h-screen">
        <div className="h-full flex justify-center items-center">
          {isLoading ? (
            // Show loader when fetching audio data
            <Loader />
          ) : (
            // Display audio player when audio is available
            <>
              {audioUrl && (
                <audio controls>
                  <source id="audioSource" type="audio/flac" src={audioUrl!} />
                </audio>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
