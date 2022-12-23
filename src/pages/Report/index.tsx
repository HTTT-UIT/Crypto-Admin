import blogApi from "@/api/blogApi";
import reportApi from "@/api/reportApi";
import { reportColor } from "@/constants/status";
import { DeleteOutlined, EyeOutlined, StopOutlined } from "@ant-design/icons";
import { Card, Row, Col, Table, Input, message, Button, Popconfirm, Tooltip, Tag, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Report = () => {
  const [data, setData] = useState<ReportData[]>([]);
  const navigate = useNavigate();

  const fetch = (status) => {
    reportApi
      .getList({ statuses: status })
      .then((res) => {
        setData(res?.items);
      })
      .catch((err) => {
        console.log(err);
        message.error("Đã xảy ra lỗi!");
      });
  };

  useEffect(() => {
    fetch(["CONFIRMED", "NEW"]);
  }, []);

  const columns: ColumnsType<ReportData> = [
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",
      align: "center",
      width: "40%",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      align: "center",
    },
    {
      title: "Ngày báo cáo",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Tiêu đề bài viết",
      dataIndex: "blogReport",
      key: "blogReport",
      align: "center",
      render: (blogReport) => blogReport?.header,
    },
    {
      title: "Người báo cáo",
      dataIndex: "userReport",
      key: "userReport",
      align: "center",
      render: (userReport) => userReport?.name,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => <Tag color={reportColor[status]}>{status}</Tag>,
      filters: [
        {
          text: "NEW",
          value: "NEW",
        },
        {
          text: "CONFIRMED",
          value: "CONFIRMED",
        },
      ],
      onFilter: (value: string, record) => record.status.indexOf(value) === 0,
    },
    {
      key: "id",
      dataIndex: "id",
      align: "center",
      render: (id: any) => {
        return (
          <Space>
            <Tooltip title="Xem bài viết">
              <Button onClick={() => onViewPost(id)} type="primary" icon={<EyeOutlined />} />
            </Tooltip>
            <Tooltip title="Xóa bài viết">
              <Popconfirm
                onConfirm={() => onBan(id)}
                title="Bạn có chắc muốn xóa bài viết này?"
                okText="Có"
                cancelText="Không">
                <Button type="primary" danger icon={<StopOutlined />} />
              </Popconfirm>
            </Tooltip>
            <Tooltip title="Xóa báo cáo">
              <Popconfirm
                onConfirm={() => onDelete(id)}
                title="Bạn có chắc muốn xóa báo cáo?"
                okText="Có"
                cancelText="Không">
                <Button danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const onViewPost = (id: string) => {
    reportApi
      .getOne(id)
      .then((res) => {
        navigate(`/posts/view/${res?.blogReport?.id}`);
      })
      .catch((err) => {
        console.log(err);
        message.error("Đã xảy ra lỗi!");
      });
  };

  const onBan = (id: string) => {
    reportApi
      .getOne(id)
      .then((res) => {
        blogApi.updateStatus(res?.blogReport?.id, 4).then((res) => message.success("Đã khóa bài viết!"));
        reportApi.updateStatus(id, "CONFIRMED");
      })
      .catch((err) => {
        console.log(err);
        message.error("Đã xảy ra lỗi!");
      });
  };

  const onDelete = (id: string) => {
    reportApi
      .delete(id)
      .then(() => fetch(["CONFIRMED", "NEW"]))
      .catch((error) => {
        message.error("Đã xảy ra lỗi!");
        console.log(error);
      });
  };
  return (
    <div>
      <h1 className="text-blue-600 text-2xl">Danh sách các báo cáo</h1>
      <Card>
        <Table rowKey={(item) => item?.id} bordered columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default Report;
