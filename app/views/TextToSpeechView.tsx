"use client"

import { VoicesTable } from "@/components/VoicesTable/VoicesTable";
import { ElevenLabs } from "elevenlabs";
import { useEffect, useState } from "react";
import { GET as getVoices } from "../api/get-voices/route";
import { VoicesTableProps } from "@/components/VoicesTable/interfaces/VoicesTableProps";
import { Spin } from "antd";


export default function TextToSpeechView() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [voices, setVoices] = useState<VoicesTableProps>( {dataSource: []} )

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
          <Spin size="large" spinning={isLoading} delay={300}>
            <VoicesTable {...voices} />
        </Spin>
      </div>
    </div>
  );
}
