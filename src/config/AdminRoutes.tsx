import AboutPage from "@/pages/AboutPage";
import Dashboard from "@/pages/Dashboard";
import Posts from "@/pages/Posts";
import PostView from "@/pages/Posts/PostView";
import PublishPost from "@/pages/PublishPost";
import EditPost from "@/pages/PublishPost/EditPost";
import Tags from "@/pages/Tags";
import Users from "@/pages/Users";

interface IRoute {
  path: string;
  page: JSX.Element;
}

const AdminRoutes: IRoute[] = [
  //   {
  //     path: "/tags",
  //     page: <Tags />,
  //   },
  {
    path: "/posts",
    page: <Posts />,
  },
  {
    path: "/posts/publish",
    page: <PublishPost />,
  },
  {
    path: "/posts/view/:id",
    page: <PostView />,
  },
  {
    path: "/posts/edit/:id",
    page: <EditPost />,
  },
  {
    path: "/users",
    page: <Users />,
  },
];

export default AdminRoutes;
