import { Card, Col, Row, Tag, Comment, Avatar, Tooltip, Space, Empty } from "antd";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogApi from "@/api/blogApi";
import moment from "moment";
import commentApi from "@/api/commentApi";
import timeHelper from "@/utils/timeHelper";

const PostView: FC = () => {
  let { id } = useParams();
  const [blog, setBlog] = useState<Blog>();
  const [comments, setComments] = useState<CommentData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await blogApi.getOne(id);
      setBlog(res);

      const cmt = await commentApi.getList(id);
      setComments(cmt?.items);
    };
    fetchData();
  }, [id]);

  return (
    <Row gutter={[20, 20]}>
      <Col span={16}>
        <Card>
          <h3 className="text-2xl font-bold">{blog?.header}</h3>
          <Space size="middle" direction="vertical">
            <div className="flex items-center gap-2">
              {/* <Avatar src={blog?.authorImageUrl} /> */}
              <p className="m-0 p-0">{`${blog?.authorName} - ${moment(blog?.createdAt).format("HH:mm DD/MM/YYYY")}`}</p>
            </div>
            {blog?.tags.map((item) => (
              <Tag color="blue" key={item?.id}>
                {item?.title}
              </Tag>
            ))}
          </Space>
          <p style={{ marginTop: 20 }} dangerouslySetInnerHTML={{ __html: blog?.content }}></p>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <h3>Bình luận</h3>
          {comments?.length == 0 ? (
            <Empty description="Không có bình luận" />
          ) : (
            comments?.map((comment) => (
              <Comment
                key={comment?.id}
                author={comment?.username}
                avatar={<Avatar src={comment?.profileImageUrl} alt="avatar" />}
                content={<p>{comment?.content} </p>}
                datetime={
                  <Tooltip title={moment(comment?.commentTime).format("HH:mm DD/MM/YYYY")}>
                    <span>{timeHelper.getDiffFromNow(comment?.commentTime)}</span>
                  </Tooltip>
                }
              />
            ))
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default PostView;
