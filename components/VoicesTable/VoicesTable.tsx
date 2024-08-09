"use client";

// Import necessary modules and components
import { Button, Col, Divider, Input, Row, Spin, Table, TableColumnsType } from "antd";
import { useForm } from "react-hook-form";
import React, { ReactElement, useState } from "react";
import { ElevenLabs } from "elevenlabs";
import { Voice } from "elevenlabs/api";
import { text } from "stream/consumers";
import { DownloadOutlined } from '@ant-design/icons';
import { PutBlobResult } from "@vercel/blob";

interface VoiceTableProps {
  dataSource: ElevenLabs.Voice[]
}

const { TextArea } = Input;


// Main component function
export function VoicesTable({ dataSource }: VoiceTableProps): ReactElement {
  // State for tracking form submission status

  const [textInput, setTextInput] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [blob, setBlob] = useState<PutBlobResult | null>(null)


  const columns: TableColumnsType<ElevenLabs.Voice> = [
    {title: "Name",
     dataIndex: "name",
     key: "name",
     width: 100,
    },
    {title: "Category",
     dataIndex: "category",
     key: "category",
     width: 100,
    },
    {title: "Labels",
      children: [
        {title: "Gender",
        dataIndex: ["labels", "gender"],
        width: 60},
        {title: "Age",
        dataIndex: ["labels", "age"],
        width: 60},  
        {title: "Accent",
        dataIndex: ["labels", "accent"],
        width: 60},
        {title: "Description",
        dataIndex: ["labels", "description"],
        width: 60},
        {title: "Use case",
        dataIndex: ["labels", "use_case"],
        width: 60},
      ]
     },
    {title: "Preview",
     dataIndex: "preview_url",
     key: "preview_url",
     width: 50,
     render: (_, record) => {
      return (
            <audio controls>
              <source src={`${record.preview_url}`} type="audio/mpeg" />
            </audio>)
     }
    },
    {title: "Generate",
      width: 30,
      render: (_, record) => {
       return (
        textInput?.length > 0 && (
        <Spin size="small" spinning={isLoading}>  
          <Button 
          type="primary" 
          icon={<DownloadOutlined />}
          onClick={() => handleGenerateVoice(record)} />
        </Spin>  )       
      )
      }
     },
  ]

  const handleGenerateVoice = async (record: ElevenLabs.Voice) => {
    setIsLoading(true);

    try {
      // Make a POST request to the server's API endpoint to generate audio
      const response = await fetch("/api/generate-audio-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text:  textInput,
          voiceId: record.voice_id,
        }),
      });

      console.log("response: ", response)

      
      const newBlob = (await response.json()) as PutBlobResult;
      console.log("newBlob:", newBlob)

      setBlob(newBlob);

      setIsLoading(false);

    } catch (error) {

      setIsLoading(false);

    }

  }

  return (
    <>
    <Row>
      <TextArea
        rows={2}
        size="small"
        style={{width: 300}}
        onChange={(t) => {setTextInput(t.target.value)} }/>
    </Row>
     <Row>
      {blob ? (
      <audio controls>
      <source id="audioSource" type="audio/flac" src={blob.url} />
    </audio>
    ) : "waiting for text and voice to be selected"}
    </Row>
    <Divider orientation="left">Available Voices</Divider>
    <Table dataSource={dataSource} columns={columns}/>
    </>
  );
}
