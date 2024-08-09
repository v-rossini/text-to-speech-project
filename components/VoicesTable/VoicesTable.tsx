"use client";

import { Divider, Input, Row, Table, TableColumnsType } from "antd";
import React, { ReactElement, useState } from "react";
import { ElevenLabs } from "elevenlabs";
import { PutBlobResult } from "@vercel/blob";
import { generateColumns } from "./generateColumns";

interface VoiceTableProps {
  dataSource: ElevenLabs.Voice[]
}

const { TextArea } = Input;

export function VoicesTable({ dataSource }: VoiceTableProps): ReactElement {
  const [textInput, setTextInput] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [blob, setBlob] = useState<PutBlobResult | null>(null)

  const handleGenerateVoice = async (record: ElevenLabs.Voice) => {
    setIsLoading(true);

    try {
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
      
      const newBlob = (await response.json()) as PutBlobResult;

      setBlob(newBlob);
      setIsLoading(false);
    } catch (error) {

      setIsLoading(false);

    }

  }

  const columns: TableColumnsType<ElevenLabs.Voice> = generateColumns(textInput, isLoading, handleGenerateVoice)

  return (
    <>
    <Row>
      <TextArea
        rows={2}
        size="small"
        style={{width: 600}}
        onChange={(t) => {setTextInput(t.target.value)} }/>
    </Row>
       {blob && (<p>blob url: {blob? blob.url : null}</p>)}
     <Row>
      {blob ? (
      <>
        <div>
          <audio controls>
            <source id="audioSource" type="audio/mp3" src={blob?.url} />
          </audio>
        </div>
      </>
    ) : "waiting for text and voice to be selected"}
    </Row>
    <Divider orientation="left">Available Voices</Divider>
    <Table dataSource={dataSource} columns={columns}/>
    </>
  );
}

/*
function generateColumns(textInput: string, isLoading: boolean, handleGenerateVoice: (record: ElevenLabs.Voice) => Promise<void>): TableColumnsType<ElevenLabs.Voice> {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 100,
    },
    {
      title: "Labels",
      children: [
        {
          title: "Gender",
          dataIndex: ["labels", "gender"],
          width: 60
        },
        {
          title: "Age",
          dataIndex: ["labels", "age"],
          width: 60
        },
        {
          title: "Accent",
          dataIndex: ["labels", "accent"],
          width: 60
        },
        {
          title: "Description",
          dataIndex: ["labels", "description"],
          width: 60
        },
        {
          title: "Use case",
          dataIndex: ["labels", "use_case"],
          width: 60
        },
      ]
    },
    {
      title: "Preview",
      dataIndex: "preview_url",
      key: "preview_url",
      width: 50,
      render: (_, record) => {
        return (
          <audio controls>
            <source src={`${record.preview_url}`} type="audio/mp3" />
          </audio>);
      }
    },
    {
      title: "Generate",
      width: 30,
      render: (_, record) => {
        return (
          textInput?.length > 0 && (
            <Spin size="small" spinning={isLoading}>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={() => handleGenerateVoice(record)} />
            </Spin>)
        );
      }
    },
  ];
}
*/
