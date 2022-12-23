import { HiOutlineNewspaper } from "react-icons/hi";

const MenuItems = {
  routes: [
    {
      path: "/posts",
      name: "Bài viết",
      icon: (
        <span role="img" className="anticon">
          <HiOutlineNewspaper size={20} />
        </span>
      ),
    },
  ],
};

export default MenuItems;
