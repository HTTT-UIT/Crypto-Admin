import logoImage from "@/assets/images/Logo.png";
import RightContent from "@/components/Layout/RightContent";
import { MenuItems, AdminMenuItems } from "@/config";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";
import ProLayout from "@ant-design/pro-layout";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const [pathname, setPathname] = useState(window.location.pathname);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  return (
    <ProLayout
      route={user?.userName == "admin" ? AdminMenuItems : MenuItems}
      location={{
        pathname,
      }}
      title="Crypto"
      logo={logoImage}
      fixedHeader
      fixSiderbar
      primaryColor="#6D5CE8"
      contentWidth="Fluid"
      layout="side"
      headerTitleRender={(logo, title) => (
        <Link to="/" onClick={() => setPathname("/")}>
          {logo}
          {title}
        </Link>
      )}
      onMenuHeaderClick={() => {
        navigate("/");
        setPathname("/");
      }}
      menuItemRender={(item, dom) => (
        <NavLink
          to={`${item.path}`}
          onClick={() => {
            setPathname(item.path || "/");
          }}>
          {dom}
        </NavLink>
      )}
      rightContentRender={() => <RightContent />}>
      <Outlet />
    </ProLayout>
  );
};

export default MainLayout;
