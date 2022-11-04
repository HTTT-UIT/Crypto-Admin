import AboutPage from "@/pages/AboutPage";
import Dashboard from "@/pages/Dashboard";
import Posts from "@/pages/Posts";
import PublishPost from "@/pages/PublishPost";
import Sample from "@/pages/Sample";

interface IRoute {
  path: string;
  page: JSX.Element;
}

const AdminRoutes: IRoute[] = [
  {
    path: "/",
    page: <Dashboard />,
  },
  {
    path: "/about",
    page: <AboutPage />,
  },
  {
    path: "/sample",
    page: <Sample />,
  },
  {
    path: "/posts",
    page: <Posts />,
  },
  {
    path: "/posts/publish",
    page: <PublishPost />,
  },
];

export default AdminRoutes;
