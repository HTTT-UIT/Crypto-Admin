import { Card, Col, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { FC } from "react";
import FromTag from "./FormTag";

type TagField = {
  _id: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  status: string;
};

const Tags: FC = () => {
  const columns: ColumnsType<TagField> = [
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      align: "center",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: "30%",
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "30%",
      align: "center",
    },
  ];
  return (
    <div>
      <h1 className="text-blue-600 text-2xl">Tag list</h1>
      <Row gutter={[20, 20]}>
        <Col span={14}>
          <Table columns={columns}></Table>
        </Col>
        <Col span={10}>
          <Card>
            <FromTag />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Tags;
