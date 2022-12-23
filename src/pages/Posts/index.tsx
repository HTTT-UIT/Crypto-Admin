import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Input, Popconfirm, Tag, Tooltip, Table, Row, Col, message } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.less";
import { useEffect, useState } from "react";
import blogApi from "@/api/blogApi";
import moment from "moment";
import { blogStatus, statusColor } from "@/constants/status";
import { selectUser } from "@/store/selectors";
import { useAppSelector } from "@/store/hooks";

const { Search } = Input;

const Posts = () => {
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState(1);
  const [data, setData] = useState<Blog[]>([]);
  const [datasource, setDatasource] = useState<Blog[]>([]);
  const [idBlog, setIdBlog] = useState();
  const [stat, setStat] = useState([0, 0, 0]);
  const user = useAppSelector(selectUser);

  const columns: ColumnsType<Blog> = [
    {
      title: "Tiêu đề",
      dataIndex: "header",
      key: "header",
      width: "30%",
      align: "center",
    },
    {
      title: "Tag",
      dataIndex: "tags",
      key: "tags",
      width: "15%",
      align: "center",
      render: (tags: TagBlog[]) => {
        return tags.map((tag) => (
          <Tag color="geekblue" key={tag.id}>
            {tag.title}
          </Tag>
        ));
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: "15%",
      render: (date) => moment(date).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "lastUpdatedAt",
      key: "lastUpdatedAt",
      align: "center",
      width: "15%",
      render: (date) => moment(date).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "10%",
      render: (status) => (
        <Tag color={statusColor[status]} key={status}>
          {blogStatus[status]}
        </Tag>
      ),
    },
    {
      key: "id",
      dataIndex: "id",
      align: "center",
      render: (id: any) => {
        return (
          <div>
            <Tooltip title="View details">
              <Link to={`/posts/view/${id}`}>
                <Button icon={<EyeOutlined />} className={styles.action} />
              </Link>
            </Tooltip>
            <Tooltip title="Edit">
              <Button onClick={() => navigate(`/posts/edit/${id}`)} icon={<EditOutlined />} className={styles.action} />
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm onConfirm={confirmDelete} title="Bạn có chắc chắn muốn xóa?" okText="Có" cancelText="Hủy">
                <Button onClick={() => onDelete(id)} danger icon={<DeleteOutlined />} className={styles.action} />
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const fetchAPI = () => {
    blogApi.getList({ page: 1, pageSize: 10, authorId: user?.id, admin: user?.userName }).then((res) => {
      setTotalItems(res.data?.totalRow);
      setData(res.data?.items);
      setDatasource(res.data?.items);

      var tmp = [0, 0, 0];
      res?.data?.items.forEach((blog) => {
        if (typeof blog?.status == "number") {
          tmp[blog?.status]++;
        }
      });
      setStat(tmp);
    });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleChangePage = async (currPage: number) => {
    try {
      const res = await blogApi.getList({ page: currPage, pageSize: 10, authorId: user?.id, admin: user?.userName });
      console.log(res);
      if (res.data) {
        setTotalItems(res.data?.totalRow);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = (id: any) => {
    setIdBlog(id);
  };

  const confirmDelete = (e: React.MouseEvent<HTMLElement>) => {
    if (idBlog) {
      console.log(idBlog);
      blogApi
        .delete(idBlog)
        .then(() => fetchAPI())
        .catch((error) => {
          message.error("Đã xảy ra lỗi!");
          console.log(error);
        });
    }
  };

  const onSearch = (value: string) => {
    const tmp = data.filter((blog) => blog.header.toLowerCase().includes(value.toLowerCase()));
    setDatasource(tmp);
  };

  return (
    <div>
      <Row gutter={[20, 20]}>
        <Col span={8}>
          <Card bordered>
            <h4 className="text-2xl font-semibold">Số bài viết mới</h4>
            <p className="text-blue-600 text-xl font-bold">{stat[0]}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered>
            <h4 className="text-2xl font-semibold">Số bài viết đã duyệt</h4>
            <p className="text-blue-600 text-xl font-bold">{stat[1]}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered>
            <h4 className="text-2xl font-semibold">Số bài viết từ chối</h4>
            <p className="text-blue-600 text-xl font-bold">{stat[2]}</p>
          </Card>
        </Col>
      </Row>
      <h1 className="text-blue-600 text-2xl mt-8">Danh sách bài viết</h1>
      <Card>
        <Row gutter={[20, 20]}>
          <Col span={20}>
            <div className="flex flex-row gap-3">
              <Search size="large" style={{ width: 300 }} placeholder="Tìm kiếm" enterButton onSearch={onSearch} />
            </div>
          </Col>
          <Col span={4}>
            <Link to="/posts/publish">
              <Button size="large" block type="primary" icon={<EditOutlined />}>
                Viết bài
              </Button>
            </Link>
          </Col>
          <Col span={24}>
            <Table
              bordered
              rowKey={(blog) => blog.id}
              columns={columns}
              dataSource={datasource}
              pagination={{
                total: totalItems,
                defaultPageSize: 10,
                onChange: (page: number) => handleChangePage(page),
              }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Posts;
