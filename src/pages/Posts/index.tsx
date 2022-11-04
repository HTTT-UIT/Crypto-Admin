import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Input, Popconfirm, Tag, Tooltip, Table, Row, Col } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.less";

const { Search } = Input;

type PostTable = {
  _id: string;
  title: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  status: string;
};

const Posts = () => {
  const navigate = useNavigate();

  const columns: ColumnsType<PostTable> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
      align: "center",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      width: "15%",
      align: "center",
      render: (tag) => {
        return (
          <Tag color="geekblue" key={tag}>
            {tag}
          </Tag>
        );
      },
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: "15%",
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "10%",
      render: (status) => {
        const color = status == "Pending" ? "orange" : status == "Approved" ? "green" : "cyan";
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      key: "_id",
      dataIndex: "_id",
      align: "center",
      render: (_id: any) => {
        return (
          <div>
            <Tooltip title="View details">
              <Link to={`/posts/publish/${_id}`}>
                <Button icon={<EyeOutlined />} className={styles.action} />
              </Link>
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                onClick={() => navigate(_id + "/update")}
                icon={<EditOutlined />}
                className={styles.action}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
                <Button danger icon={<DeleteOutlined />} className={styles.action} />
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const dataSource = [
    {
      _id: "string",
      title: "This is a new blog",
      tag: "Blockchain",
      createdAt: "12:12 12/12/2022",
      updatedAt: "12:12 12/12/2022",
      status: "Pending",
    },
    {
      _id: "string",
      title: "This is a new blog",
      tag: "Blockchain",
      createdAt: "12:12 12/12/2022",
      updatedAt: "12:12 12/12/2022",
      status: "Approved",
    },
    {
      _id: "string",
      title: "This is a new blog",
      tag: "Blockchain",
      createdAt: "12:12 12/12/2022",
      updatedAt: "12:12 12/12/2022",
      status: "Publish",
    },
  ];
  return (
    <div>
      <h1 className="text-blue-600 text-2xl">Post list</h1>
      <Card>
        <Row gutter={[20, 20]}>
          <Col span={20}>
            <div className="flex flex-row gap-3">
              <Search style={{ width: 300 }} placeholder="Search" enterButton />
            </div>
          </Col>
          <Col span={4}>
            <Link to="/posts/publish">
              <Button block type="primary" icon={<PlusCircleOutlined />}>
                Post new blog
              </Button>
            </Link>
          </Col>
          <Col span={24}>
            <Table bordered columns={columns} dataSource={dataSource} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Posts;
