import { HiUserGroup, HiOutlineNewspaper, HiExclamation } from "react-icons/hi";

const AdminMenuItems = {
  routes: [
    // {
    //   path: "/home",
    //   name: "Trang chủ",
    //   icon: (
    //     <span role="img" className="anticon">
    //       <HiHome size={20} />
    //     </span>
    //   ),
    // },
    {
      path: "/posts",
      name: "Bài viết",
      icon: (
        <span role="img" className="anticon">
          <HiOutlineNewspaper size={20} />
        </span>
      ),
    },
    {
      path: "/users",
      name: "Người dùng",
      icon: (
        <span role="img" className="anticon">
          <HiUserGroup size={20} />
        </span>
      ),
    },
    {
      path: "/reports",
      name: "Báo cáo",
      icon: (
        <span role="img" className="anticon">
          <HiExclamation size={20} />
        </span>
      ),
    },
  ],
};

export default AdminMenuItems;
