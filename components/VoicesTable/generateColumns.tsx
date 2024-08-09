import { DownloadOutlined } from "@ant-design/icons";
import { TableColumnsType, Spin, Button } from "antd";
import { ElevenLabs } from "elevenlabs";

export function generateColumns(textInput: string, 
    isLoading: boolean, 
    handleGenerateVoice: (record: ElevenLabs.Voice) => Promise<void>): TableColumnsType<ElevenLabs.Voice> {
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
  