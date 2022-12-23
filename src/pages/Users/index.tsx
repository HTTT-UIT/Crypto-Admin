import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Input, Popconfirm, Tooltip, Table, Row, Col, Image, message } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";
import { useEffect, useState } from "react";
import { userApi } from "@/api";
import moment from "moment";

const { Search } = Input;

const Users = () => {
  const [users, setUsers] = useState<User[]>();
  const [source, setSource] = useState<User[]>();

  const columns: ColumnsType<User> = [
    {
      title: "Ảnh đại diện",
      dataIndex: "profileImageUrl",
      key: "profileImageUrl",
      align: "center",
      render: (url) => (
        <Image width={80} src={url ? url : `https://ui-avatars.com/api/?name=avatar&length=1&background=random`} />
      ),
    },
    {
      title: "Tên người dùng",
      dataIndex: "userName",
      key: "userName",
      align: "center",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
      align: "center",
      render: (dob) => moment(dob).format("DD/MM/YYYY"),
    },
    {
      key: "id",
      dataIndex: "id",
      align: "center",
      render: (id: any) => {
        return (
          <div>
            <Tooltip title="Delete">
              <Popconfirm
                onConfirm={() => onDelete(id)}
                title="Bạn có chắc muốn xóa người dùng này?"
                okText="Yes"
                cancelText="No">
                <Button danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const onDelete = (id: string) => {
    userApi
      .delete(id)
      .then(() => {
        message.success("Xóa thành công!");
        fetchUsers();
      })
      .catch((err) => {
        console.log(err);
        message.error("Đã xảy ra lỗi!");
      });
  };

  const fetchUsers = () => {
    userApi.getAllUsers().then((res) => {
      setUsers(res?.items);
      setSource(res?.items);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSearch = (value: string) => {
    const tmp = users.filter((user) => user.userName.toLowerCase().includes(value.toLowerCase()));
    setSource(tmp);
  };

  return (
    <div>
      <h1 className="text-blue-600 text-2xl">Danh sách người dùng</h1>
      <Card>
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <Search
              onSearch={onSearch}
              size="large"
              style={{ width: "100%" }}
              placeholder="Tìm kiếm theo tên"
              enterButton
            />
          </Col>
          <Col span={4}></Col>
          <Col span={24}>
            <Table rowKey={(item) => item?.id} bordered columns={columns} dataSource={source} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Users;
