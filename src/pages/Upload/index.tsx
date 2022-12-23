import axiosClient from "@/api/axiosClient";
import blogApi from "@/api/blogApi";
import { Button, Col, Row, message } from "antd";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function Upload() {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("form", data.file[0]);

    axiosClient
      .post("/Image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        blogApi.updateImage(id, res.data).then((res) => {
          console.log(res.data);
          message.success("Thêm ảnh thành công!");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <input title="Chọn ảnh" placeholder="Chọn ảnh" type="file" {...register("file")} />
          </Col>
          <Button type="primary" htmlType="submit">
            Tải ảnh lên
          </Button>
        </Row>
        {/* <input type="submit" /> */}
      </form>
    </div>
  );
}

export default Upload;
