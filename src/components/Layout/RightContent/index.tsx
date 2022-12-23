import { userAction } from "@/store/reducers/userSlice";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Popover } from "antd";
import { useNavigate } from "react-router-dom";

const RightContent = () => {
  const navigate = useNavigate();
  const content = () => {
    return <Button onClick={onClick}>Đăng xuất</Button>;
  };

  const onClick = () => {
    userAction.logout();
    navigate("/login");
  };
  return (
    <div>
      <Popover content={content}>
        <Avatar shape="square" size="small" icon={<UserOutlined />} />
      </Popover>
    </div>
  );
};

export default RightContent;
