"use client";

// Import necessary modules and components
import { Button, Col, Divider, Input, Row, Table, TableColumnsType } from "antd";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { ReactElement, useState } from "react";
import { ElevenLabs } from "elevenlabs";
import { Voice } from "elevenlabs/api";
import { text } from "stream/consumers";
import { DownloadOutlined } from '@ant-design/icons';

interface VoiceTableProps {
  dataSource: ElevenLabs.Voice[]
}

const { TextArea } = Input;


// Main component function
export function VoicesTable({ dataSource }: VoiceTableProps): ReactElement {
  // State for tracking form submission status

  const [textInput, setTextInput] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [audioUrl, setAudioUrl] = useState<string>("https://storage.googleapis.com/eleven-public-prod/…3GoZ742B/3f4bde72-cc48-40dd-829f-57fbf906f4d7.mp3")


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
        textInput?.length > 0 && (<Button 
          type="primary" 
          icon={<DownloadOutlined />}
          onClick={() => handleGenerateVoice(record)} />)       
      )
      }
     },
  ]

  const handleGenerateVoice = (record: ElevenLabs.Voice) => {

    console.log({
      voiceId: record.voice_id,
      preview: record.preview_url,
      textInput: textInput,
    })
  }

  return (
    <>
    <TextArea
        rows={2}
        size="small"
        style={{width: 300}}
        onChange={(t) => {setTextInput(t.target.value); console.log(textInput)} }/>
    <audio controls>
      <source id="audioSource" type="audio/flac" src={audioUrl!} />
    </audio>
    <Divider orientation="left">Available Voices</Divider>
    <Table dataSource={dataSource} columns={columns}/>
    </>
  );
}
